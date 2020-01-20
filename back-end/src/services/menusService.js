import MessageResponse from "../common/MessageResponse";
import message from "../constants/message";
import common from "../common/common";
import constants from "../constants/common";
import {
    Menu
} from "../models/Menu";
import menuSql from "../sql/menuSql";
import handleError from "../handlers/handleError"
import {
    MenuDetail
} from "../models/MenuDetail";
import orderDto from "../dto/orderDto";
import {
    Product
} from "../models/Product";
import productDto from "../dto/productDto";
import orderDetailDto from "../dto/orderDetailDto";
import listProductDto from "../dto/listProductDto";
import summaryDto from "../dto/summaryDto";
import menuDetailDto from "../dto/menuDetailDto";
import summaryDetailDto from "../dto/summaryDetailDto";
import productSummaryDto from "../dto/productSummaryDto";
import status from "../constants/status";
import handleSuccess from "../handlers/handleSuccess";
import menuInfoDto from "../dto/menuInfoDto";
// define service of menu
const menusService = {};

/**
 * Fetch all menu
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {List} a list of menu
 */
menusService.getAllMenu = async (req, res, next) => {

    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = Menu.name;
    messageResponse.msg = message.MSG_SUCCESS_1;

    // handle process data
    let dateNow = new Date();
    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_OK, async () => {
        // get all menu with amount product
        return Menu.sequelize.query(menuSql.getAllMenu, {
            replacements: {
                dateNow
            },
            type: Menu.sequelize.QueryTypes.SELECT
        });
    });

};

/**
 * Pagination menu
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {List} a list of menu
 */
menusService.pagination = async (req, res, next) => {

    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = Menu.name;
    messageResponse.msg = message.MSG_SUCCESS_1;

    // handle process data
    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_OK, () => {
        let {
            page
        } = req.params;

        // declare itemsPerPage = 2
        const limit = 2;
        // declare offset
        let offset = (page - 1) * limit;
        // get date time now 
        let dateNow = new Date();
        // return with result list menu have valid_to > dateNow
        return Menu.sequelize.query(menuSql.getListMenuWithAmountProduct, {
            replacements: {
                limit,
                offset,
                dateNow
            },
            type: Menu.sequelize.QueryTypes.SELECT
        });
    });
};

/**
 * Fetch all products
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {List} a list of product
 */
menusService.getAllProduct = async (req, res, next) => {

    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = Product.name;
    messageResponse.msg = message.MSG_SUCCESS_1;

    // handle process data
    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_OK, async () => {
        const {
            menuId,
            userId
        } = req.body;

        const menus = await Menu.sequelize.query(menuSql.getMenuById, {
            replacements: {
                menuId
            },
            type: Menu.sequelize.QueryTypes.SELECT
        });
        let menu = new menuInfoDto(menus[0].id, menus[0].created_at, menus[0].valid_from, menus[0].valid_to, menus[0].product);
        const listProduct = await Menu.sequelize.query(menuSql.getAllProduct, {
            replacements: {
                menuId
            },
            type: Menu.sequelize.QueryTypes.SELECT
        });

        const productOrder = await Menu.sequelize.query(menuSql.getProductUserOrder, {
            replacements: {
                menuId,
                userId
            },
            type: Menu.sequelize.QueryTypes.SELECT
        })
        if (productOrder.length !== 0) {
            let product = new productDto(productOrder[0].id, productOrder[0].name, productOrder[0].image, productOrder[0].note, productOrder[0].price, productOrder[0].created_at, productOrder[0].count, productOrder[0].countAll);
            let order = new orderDetailDto(productOrder[0].order_id, productOrder[0].quantity, product);
            return [new listProductDto(menu, listProduct, order)];
        }
        return [new listProductDto(menu, listProduct, null)];

    });
};

/**
 * process menu
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {} 
 */
menusService.createMenuClone = async (req, res, next) => {

    const {
        menuId,
        validTo,
        validFrom
    } = req.body;

    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = Menu.name;
    messageResponse.msg = message.MSG_SUCCESS_8;

    // check valid date of menu
    const dateFrom = common.convertTimestampToDate(validFrom, constants.patternDay);
    const valid = await menusService.checkDuplicateValid(dateFrom);
    // check valid from of menu
    if (valid[0].valid > 0) {
        const messages = new MessageResponse();
        messages.param = 'validFrom';
        messages.msg = message.MSG_FAILED_9;
        handleError.exceptionDuplicate(messages, next);
    } else {
        // insert data into menu
        common.processData(messageResponse, req, res, next, status.STT_SUCCESS_CREATE, async () => {
            let menuCloneId;
            // define transaction
            const processSQL = await Menu.sequelize.transaction(async t => {

                // get info menu with id
                const result = await menusService.getMenuById(menuId);
                // get now date
                let createdAt = new Date();
                // convert timestamp to date
                let dateTo = new Date(validTo * 1000);
                let dateFrom = new Date(validFrom * 1000);
                // check id reuslt throw error if insert error
                if (result[0].id) {
                    const insert = await Menu.sequelize.query(menuSql.createMenu, {
                        replacements: {
                            createdAt,
                            validTo: dateTo,
                            validFrom: dateFrom
                        },
                        type: Menu.sequelize.QueryTypes.INSERT,
                        transaction: t
                    });
                    // check result insert throw error if insert error
                    if (insert) {
                        const lst = await MenuDetail.findAll({
                            attributes: ['product_id'],
                            where: {
                                menu_id: menuId,
                                delete_flag: 0
                            }
                        })
                        const objId = {};
                        menuCloneId = insert[0];
                        objId.menuId = insert[0];
                        objId.listProduct = common.convertResultData('product_id', lst);
                        return menusService.createMenuDetail(objId, t);
                    } else {
                        const messageResponse = new MessageResponse();
                        messageResponse.param = MenuDetail.name
                        messageResponse.msg = message.MSG_FAILED_0;
                        handleError.exceptionSystem(messageResponse, next);
                    }
                } else {
                    handleError.exceptionNotFound(next);
                }
            });
            if (processSQL) {
                //get products of menu
                const products = await menusService.getProductInMenu(menuCloneId);
                const menuDetail = await menusService.getMenuById(menuCloneId);
                return [new menuDetailDto(menuCloneId, menuDetail[0].valid_from, menuDetail[0].valid_to, products)];
            } else {
                handleError.exceptionNotFound(next);
            }
        });
    }


};

/**
 * process new menu with new product
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {} 
 */
menusService.createMenu = async (req, res, next) => {
    const {
        listProduct,
        validFrom,
        validTo
    } = req.body;
    let menuId;
    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = Menu.name;
    messageResponse.msg = message.MSG_SUCCESS_2;

    // check valid date of menu
    const dateFrom = common.convertTimestampToDate(validFrom, constants.patternDay);
    const valid = await menusService.checkDuplicateValid(dateFrom);
    // check valid from of menu
    if (valid[0].valid > 0) {
        const messages = new MessageResponse();
        messages.param = 'validFrom';
        messages.msg = message.MSG_FAILED_9;
        handleError.exceptionDuplicate(messages, next);
    } else {
        // insert data into menu
        common.processData(messageResponse, req, res, next, status.STT_SUCCESS_CREATE, async () => {
            // get current date
            let createdAt = new Date();
            // convert timestamp to date
            let dateTo = new Date(validTo * 1000);
            let dateFrom = new Date(validFrom * 1000);

            const processSQL = await Menu.sequelize.transaction(async t => {
                const insert = await Menu.sequelize.query(menuSql.createMenu, {
                    replacements: {
                        createdAt,
                        validTo: dateTo,
                        validFrom: dateFrom
                    },
                    type: Menu.sequelize.QueryTypes.INSERT,
                    transaction: t
                })
                // check result insert throw error if insert error
                if (insert) {
                    const objId = {};
                    objId.menuId = insert[0];
                    menuId = objId.menuId;
                    objId.listProduct = listProduct
                    return menusService.createMenuDetail(objId, t);
                } else {
                    const messageResponse = new MessageResponse();
                    messageResponse.param = MenuDetail.name
                    messageResponse.msg = message.MSG_FAILED_0;
                    handleError.exceptionSystem(messageResponse, next);
                }
            });
            if (processSQL) {
                // get products of menu
                const products = await menusService.getProductInMenu(menuId);
                const menuDetail = await menusService.getMenuById(menuId);
                return [new menuDetailDto(menuId, menuDetail[0].valid_from, menuDetail[0].valid_to, products)];
            } else {
                handleError.exceptionNotFound(next);
            }
        });
    }

}

/**
 * process edit menu
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {} 
 */
menusService.editMenu = async (req, res, next) => {
    const {
        menuId,
        listProduct,
        validFrom,
        validTo
    } = req.body;

    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = Menu.name;
    messageResponse.msg = message.MSG_SUCCESS_3;

    // edit data into menu
    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_OK, async () => {

        // convert timestamp to date: validTo
        let dateTo = new Date(validTo * 1000);

        // convert timestamp to date: validFrom
        let dateFrom = new Date(validFrom * 1000);

        // get Menu by id
        const menu = await menusService.getMenuById(menuId);
        // check menu is exist.
        if (menu.length !== 0) {
            let currentDateTo = menu[0].valid_to;
            // check menu is no expired. valid_to of menu in db > date now
            if (currentDateTo < Date.now()) {
                const messageResponse = new MessageResponse();
                messageResponse.param = Menu.name;
                messageResponse.msg = common.parseMessage(message.MSG_FAILED_6, [menuId]);
                handleError.exceptionErrorService(messageResponse, next);
            } else {
                const processSQL = await Menu.sequelize.transaction(async t => {
                    // update menu with menuId
                    const update = await Menu.sequelize.query(menuSql.editMenu, {
                        replacements: {
                            menuId,
                            validTo: dateTo,
                            validFrom: dateFrom
                        },
                        type: Menu.sequelize.QueryTypes.INSERT,
                        transaction: t
                    })
                    // check result update throw error if update error
                    if (update) {
                        // update menu detail with menu id. set delete_flag = 1 for all menu_detail by menu_id
                        const updateDetail = await Menu.sequelize.query(menuSql.updateMenuDetail, {
                            replacements: {
                                menuId
                            },
                            type: Menu.sequelize.QueryTypes.UPDATE,
                            transaction: t
                        });
                        const objId = {};
                        objId.menuId = menuId;

                        objId.listProduct = listProduct
                        // add new menu_detail
                        return menusService.createMenuDetail(objId, t);
                    } else {
                        handleError.exceptionNotFound(next);
                    }
                });
                if (processSQL) {
                    // get products of menu
                    const products = await menusService.getProductInMenu(menuId);
                    const menuDetail = await menusService.getMenuById(menuId);
                    return [new menuDetailDto(menuId, menuDetail[0].valid_from, menuDetail[0].valid_to, products)];
                } else {
                    handleError.exceptionNotFound(next);
                }
            }
        } else {
            handleError.exceptionNotFound(next);
        }

    });
}

/**
 * check duplicate validFrom of menu
 * @param {} validDate
 * @return {} menu by Id
 */
menusService.checkDuplicateValid = async (validDate) => {

    const menu = await Menu.sequelize.query(menuSql.checkDuplicateValidFrom, {
        replacements: {
            validDate
        },
        type: Menu.sequelize.QueryTypes.SELECT
    });
    return menu;

}

/**
 * check menuId exist
 * @param {} menuId
 * @return {} menu by Id
 */
menusService.getMenuById = async (menuId) => {

    const menu = await Menu.sequelize.query(menuSql.getMenu, {
        replacements: {
            menuId
        },
        type: Menu.sequelize.QueryTypes.SELECT
    });

    return menu;

}

/**
 * find menu by id
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {} 
 */
menusService.findMenuById = async (req, res, next) => {
    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = Menu.name;
    messageResponse.msg = message.MSG_SUCCESS_1;

    const menu = await Menu.sequelize.query(menuSql.getMenuById, {
        replacements: {
            menuId: req.body.menuId
        },
        type: Menu.sequelize.QueryTypes.SELECT
    });

    // handle process data
    await handleSuccess.processSuccess(menu, messageResponse, req, res, status.STT_SUCCESS_OK);
}

menusService.checkMenuExist = async (req, res, next) => {
    const menu = await menusService.getMenuById(req.body.menuId);
    if (menu.length > 0) {
        // check validate
        next();
    } else {
        let messageResponse = new MessageResponse('menuId', common.parseMessage(message.MSG_ERROR_19, ['menu']));
        handleError.exceptionNotExist(messageResponse, next);
    }
}

/*
 * create menu detail
 * @param {} objId: list id product and menuId
 * @param {} t: transaction
 * @return {} list id product and menuId
 */
menusService.createMenuDetail = (objId, t) => {
    objId.listProduct.forEach(element => {
        MenuDetail.sequelize.query(menuSql.createMenuDetail, {
            replacements: {
                productId: element,
                menuId: objId.menuId
            },
            type: MenuDetail.sequelize.QueryTypes.INSERT,
            transaction: t
        });
    });
    return objId;
};

/*
 * Fetch summary order, products
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {orderDto} list user, product, amount of order
 */
menusService.summary = async (req, res, next) => {

    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = '';
    messageResponse.msg = message.MSG_SUCCESS_7;

    // handle process data
    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_OK, async () => {
        const {
            menuId
        } = req.body;

        // get list order
        const listOrder = await Menu.sequelize.query(menuSql.summary, {
            replacements: {
                menuId
            },
            type: Menu.sequelize.QueryTypes.SELECT
        });
        let summary = [];
        // get list order (contain product, quantity and list user order)
        let orderLst = await menusService.listUserOrder(menuId, listOrder);

        // create summary
        for (let i = 0; i < orderLst.length; i++) {
            const product = orderLst[i].product;
            let dto = new productDto(product.id, product.name, product.image, product.note, product.price, product.created_at);
            summary.push(new summaryDto(dto, product.quantity, orderLst[i].listUser));
        }
        return summary;
    });
};

/**
 * List detail user order in a menuId
 * @param {} menuId
 * @param {} listOrder
 * @return {orderDto} list detail user order in a menuId
 */
menusService.listUserOrder = async (menuId, listOrder) => {

    const orderLst = [];
    for (let i = 0; i < listOrder.length; i++) {
        let order;
        // get infomation of user order
        let listNameOrder = await menusService.listInfoUserByProduct(menuId, listOrder[i].id);

        // define 1 order
        order = new orderDto(listOrder[i], listNameOrder);
        orderLst.push(order);
    }
    return orderLst;
};

/**
 * get infomation of user order
 * @param {} menuId
 * @param {} productId
 * @return {List} list info of user
 */
menusService.listInfoUserByProduct = async (menuId, productId) => {

    const result = await Menu.sequelize.query(menuSql.listInfoUserByProduct, {
        replacements: {
            menuId,
            productId
        },
        type: Menu.sequelize.QueryTypes.SELECT
    });
    return result;
};

/**
 * get all menu
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {listAllMenu} list all menu
 */
menusService.listAllMenu = async (req, res, next) => {

    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = Menu.name;
    messageResponse.msg = message.MSG_SUCCESS_1;

    // handle process data
    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_OK, async () => {
        // get all menu
        return Menu.sequelize.query(menuSql.listAllMenu, {
            type: Menu.sequelize.QueryTypes.SELECT
        });
    });

};

/**
 * Get products of menu
 * @param {} menuId
 * @return {products} list product
 */
menusService.getProductInMenu = async (menuId) => {
    const result = await Menu.sequelize.query(menuSql.getProductInMenu, {
        replacements: {
            menuId
        },
        type: Menu.sequelize.QueryTypes.SELECT
    });
    let products = [];
    result.forEach(element => {
        let product = new productDto(element.id, element.name, element.image, element.note, element.price, element.created_at);
        products.push(product);
    });
    return products;
}

/**
 * Close menu and export summary of menu
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {summary} summary of menu
 */
menusService.exportMenu = async (req, res, next) => {
    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = '';
    messageResponse.msg = message.MSG_SUCCESS_7;

    // handle process data
    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_OK, async () => {
        const {
            menuId
        } = req.body;

        // get Menu by id
        const menu = await Menu.sequelize.query(menuSql.getMenu, {
            replacements: {
                menuId
            },
            type: Menu.sequelize.QueryTypes.SELECT
        });
        if (menu.length !== 0) {
            if (menu[0].status === 1) {
                return await Menu.sequelize.transaction(async t => {
                    // update status menu to 0 (close menu)
                    const closeMenuResult = await Menu.sequelize.query(menuSql.closeMenu, {
                        replacements: {
                            menuId
                        },
                        type: Menu.sequelize.QueryTypes.UPDATE,
                        transaction: t
                    });
                    if (closeMenuResult) {
                        // get summary for menu
                        const summaryResult = await Menu.sequelize.query(menuSql.getSummaryMenu, {
                            replacements: {
                                menuId
                            },
                            type: Menu.sequelize.QueryTypes.SELECT
                        });
                        if (summaryResult) {
                            let createAt = new Date();
                            let products = [];
                            for (let i = 0; i < summaryResult.length; i++) {
                                let name = summaryResult[i].name;
                                let quantity = summaryResult[i].quantity ? summaryResult[i].quantity : 0;
                                let total = summaryResult[i].price * quantity;
                                // insert summary of menu to table summaries
                                const insertSummaryResult = await Menu.sequelize.query(menuSql.insertSummary, {
                                    replacements: {
                                        menuId,
                                        name,
                                        quantity,
                                        total,
                                        createAt
                                    },
                                    type: Menu.sequelize.QueryTypes.INSERT,
                                    transaction: t
                                });
                                if (insertSummaryResult) {
                                    products.push(new productSummaryDto(name, quantity, total, createAt));
                                } else {
                                    handleError.exceptionNotFound(next);
                                }
                            }
                            return [new summaryDetailDto(menuId, products)];
                        } else {
                            handleError.exceptionNotFound(next);
                        }
                    } else {
                        handleError.exceptionNotFound(next);
                    }
                });
            } else {
                const summaryResult = await menusService.getSummaryDetail(menuId);
                let products = [];
                summaryResult.forEach(element => {
                    products.push(new productSummaryDto(
                        element.product_name,
                        element.quantity,
                        element.total,
                        element.created_at,
                    ));
                });
                return [new summaryDetailDto(menuId, products)];
            }
        } else {
            handleError.exceptionNotFound(next);
        }
    });
}

/**
 * Get summary detail in table summaries by menu_id
 */
menusService.getSummaryDetail = async menuId => {
    const result = await Menu.sequelize.query(menuSql.getSummaryDetail, {
        replacements: {
            menuId
        },
        type: Menu.sequelize.QueryTypes.SELECT
    });
    return result;
}

/**
 * get list menu by product id
 * @param {Integer} productId
 * @return {List}
 */
menusService.getListMenuByProductId = async (productId) => {


    const result = await Menu.sequelize.query(menuSql.getListMenuByProductId, {
        replacements: {
            productId
        },
        type: Menu.sequelize.QueryTypes.SELECT
    });
    return result;
};

export default menusService;