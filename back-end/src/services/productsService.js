import MessageResponse from "../common/MessageResponse";
import message from "../constants/message";
import common from "../common/common";
import {
    Product
} from "../models/Product";
import {
    Menu
} from "../models/Menu";
import handleError from "../handlers/handleError";
import menuSql from "../sql/menuSql";
import productSql from "../sql/productSql";
import productDto from "../dto/productDto";
import productDetailDto from "../dto/productDetailDto";
import menuDto from "../dto/menuDto.js";
import orderDetailDto from "../dto/orderDetailDto";
import fs from "fs";
import path from "path";
import status from "../constants/status";
import uploadFileService from "./uploadFileService";

// define service of product
const productsService = {};

/**
 * get all product
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {listAllProduct} list all product
 */
productsService.listAllProduct = async(req, res, next) => {
    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = Product.name;
    messageResponse.msg = message.MSG_SUCCESS_1;

    // handle process data
    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_OK, () => {
        return Menu.sequelize.query(menuSql.listAllProduct, {
            type: Menu.sequelize.QueryTypes.SELECT
        });
    });
};

/**
 * get all product
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {detailProduct} detail of product after create
 */
productsService.create = async(req, res, next) => {
    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = Product.name;
    messageResponse.msg = message.MSG_SUCCESS_2;

    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_CREATE, async() => {
        const {
            file
        } = req;
        const {
            name,
            note,
            price
        } = req.body;
        return await Product.sequelize.transaction(async t => {
            let image = file.path;
            // convert path image
            image =
                "http://" +
                req.get("host") +
                common.replace(image.split("public")[1], /\\/g, "/");
            // get time
            let createTime = new Date();
            const insert = await Product.sequelize.query(productSql.createProduct, {
                replacements: {
                    name,
                    image,
                    note,
                    price,
                    createTime
                }
            });
            if (insert.length > 0) {
                return await productsService.getDetailProductById(insert[0]);
            }
            // delete image when create faild
            else {
                const imageName = file.path.substring(file.path.lastIndexOf("\\") + 1);
                const publicPath = path.resolve("public") + "/images/";
                fs.unlinkSync(publicPath + imageName);
            }
        });
    });
};

/**
 * get detail product by ID
 * @param {} productId
 * @param {} orderId
 */
productsService.getDetailProduct = async(productId, orderId) => {
    const result = await Product.sequelize.query(productSql.getProductDetail, {
        replacements: {
            orderId,
            productId
        },
        type: Product.sequelize.QueryTypes.SELECT
    });
    let listOrder = [];
    if (result) {
        let product = new productDto(
            result[0].id,
            result[0].name,
            result[0].image,
            result[0].note,
            result[0].price,
            result[0].created_at
        );
        let orderDetail = new orderDetailDto(orderId, result[0].quantity, product);
        listOrder.push(orderDetail);
    }
    return listOrder;
};

/**
 * get all product
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {productDetail} list product detail
 */
productsService.getProductDetail = async(req, res, next) => {
    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = Product.name;
    messageResponse.msg = message.MSG_SUCCESS_1;

    // handle process data
    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_OK, async() => {
        const {
            productId
        } = req.body;
        // get product detail
        const result = await Product.sequelize.query(productSql.productDetail, {
            replacements: {
                productId
            },
            type: Product.sequelize.QueryTypes.SELECT
        });
        if (result.length !== 0) {
            // get list menu by productId
            const listMenu = await productsService.getListMenuByproductId(productId);
            var listMenuWithUser = [];
            for (let i = 0; i < listMenu.length; i++) {
                const user = await productsService.getListUser(
                    listMenu[i].menu_id,
                    productId
                );
                listMenuWithUser.push(
                    new menuDto(
                        listMenu[i].menu_id,
                        listMenu[i].created_at,
                        listMenu[i].valid_from,
                        listMenu[i].valid_to,
                        user
                    )
                );
            }
            // get product detail, list menu, list user
            let product = new productDetailDto(
                result[0].id,
                result[0].name,
                result[0].image,
                result[0].note,
                result[0].price,
                result[0].created_at,
                listMenuWithUser
            );
            return [product];
        }
        return null;
    });
};

/**
 * get infomation of menu
 * @param {} productId
 * @return {List} list menu
 */
productsService.getListMenuByproductId = async productId => {
    const result = await Product.sequelize.query(productSql.getListMenu, {
        replacements: {
            productId
        },
        type: Product.sequelize.QueryTypes.SELECT
    });
    return result;
};

/**
 * get infomation of user
 * @param {} menuId
 * @param {} productId
 * @return {List} list user
 */
productsService.getListUser = async(menuId, productId) => {
    let listUser = await Product.sequelize.query(productSql.getListUser, {
        replacements: {
            menuId: menuId,
            productId
        },
        type: Product.sequelize.QueryTypes.SELECT
    });
    return listUser;
};

/**
 * delete product
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {product}
 */
productsService.deleteProduct = async(req, res, next) => {
    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = Product.name;
    messageResponse.msg = message.MSG_SUCCESS_4;
    const {
        productId
    } = req.body;
    // handle process data
    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_OK, async() => {
        const product = await Product.sequelize.query(
            productSql.productDetail, {
                replacements: {
                    productId
                },
                type: Product.sequelize.QueryTypes.SELECT
            }
        );
        if (product.length !== 0) {
            let dateNow = new Date();
            // get list menu_id no expired have product
            const listMenuId = await Menu.sequelize.query(
                menuSql.getListMenuByProduct, {
                    replacements: {
                        productId,
                        dateNow
                    },
                    type: Menu.sequelize.QueryTypes.SELECT
                }
            );
            let listMenu = [];
            listMenuId.forEach(element => {
                listMenu.push(element.id);
            });
            // update delete_flag
            const result = await Product.sequelize.transaction(async t => {
                // set delete_flag table menu details
                if (listMenu.length !== 0) {
                    const deleteMenuDetail = await Menu.sequelize.query(
                        menuSql.deleteMenuDetail, {
                            replacements: {
                                listMenu,
                                productId
                            },
                            type: Menu.sequelize.QueryTypes.UPDATE,
                            transaction: t
                        }
                    );
                }
                // set delete_flag table product
                const delProduct = await Product.sequelize.query(
                    productSql.deleteProduct, {
                        replacements: {
                            productId
                        },
                        type: Product.sequelize.QueryTypes.UPDATE,
                        transaction: t
                    }
                );
                return product;
            });
            if (result) {
                return product;
            }
        }
        // handle error data not found
        handleError.exceptionNotFound(next);
    });
};

/**
 * get infomation of menu
 * @param {} productId
 * @return {product} detail of product
 */
productsService.getDetailProductById = async productId => {
    let result = await Product.findAll({
        attributes: ["id", "name", "image", "note", "price", "created_at"],
        where: {
            id: productId,
            delete_flag: 0
        }
    });
    // let product = [];
    // product.push(result);
    // return product;
    return result;
};

/**
 * get infomation of menu
 * @param {} name
 * @return {} product detail
 */
productsService.getDetailProductByName = async name => {
    let result = await Product.findAll({
        attributes: ["id", "name", "image", "note", "price", "created_at"],
        where: {
            name,
            delete_flag: 0
        }
    });
    return result;
};

/**
 * edit detail of product
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {productDetail} detail of product after edit
 */
productsService.edit = async(req, res, next) => {
    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = Product.name;
    messageResponse.msg = message.MSG_SUCCESS_3;

    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_OK, async() => {
        const {
            file
        } = req;
        const {
            productId,
            name,
            note,
            price
        } = req.body;
        // check productId exits in database
        const checkId = await Product.sequelize.query(productSql.getProductById, {
            replacements: {
                productId
            },
            type: Product.sequelize.QueryTypes.SELECT
        });
        // check image exits in database
        if (checkId.length !== 0) {
            return await Product.sequelize.transaction(async t => {
                // let image = file.originalname ? file : undefined;
                let image = "";
                let imageData = checkId[0].image.substring(
                    checkId[0].image.lastIndexOf("/") + 1
                );
                // compare new image with image in database
                if (typeof file === "undefined") {
                    image = checkId[0].image;
                } else {
                    // delete old image in database
                    const imageName = checkId[0].image.substring(
                        checkId[0].image.lastIndexOf("/") + 1
                    );
                    const publicPath = path.resolve("public").replace(/\\/g, "/") + "/images/";
                    fs.unlinkSync(publicPath + imageName);
                    // convert path image
                    image =
                        "http://" +
                        req.get("host") +
                        "/images/" + file.filename;
                }
                let createTime = new Date();
                const edit = await Product.sequelize.query(productSql.editProduct, {
                    replacements: {
                        productId,
                        name,
                        image,
                        note,
                        price,
                        createTime
                    }
                });
                //fetch information product after edit
                if (edit.length > 0) {
                    const result = await Product.sequelize.query(
                        productSql.productDetail, {
                            replacements: {
                                productId
                            },
                            type: Product.sequelize.QueryTypes.SELECT
                        }
                    );
                    return result;
                }
            });
        } else {
            handleError.exceptionNotFound(next);
        }
    });
};

/**
 * check product exist by id
 * @param {} req
 * @param {} res
 * @param {} next
 */
productsService.checkProductExist = async(req, res, next) => {
    const product = await productsService.getDetailProductById(req.body.productId);
    if (product.length > 0) {
        next();
    } else {
        let messageResponse = new MessageResponse('productId', common.parseMessage(message.MSG_ERROR_19, ['product']));
        handleError.exceptionNotExist(messageResponse, next);
    }
}

/**
 * check product exist by name
 * @param {} name
 */
productsService.checkProductNameExist = async(name) => {
    const product = await productsService.getDetailProductByName(name);

    return Promise.resolve(product);
}

/**
 * check product name exist with different id
 * @param {} productId
 * @param {} name
 */
productsService.checkProductNameExistWithDifferentId = async(name, productId) => {
    const product = await Product.sequelize.query(productSql.countProductByNameWithDifferentId, {
        replacements: {
            productId,
            name
        },
        type: Product.sequelize.QueryTypes.SELECT
    });

    return Promise.resolve(product);
}


export default productsService;