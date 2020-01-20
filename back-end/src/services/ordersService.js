import common from "../common/common";
import {
    Order
} from "../models/Order";
import orderSql from "../sql/orderSql";
import MessageResponse from "../common/MessageResponse";
import message from "../constants/message";
import {
    OrderItem
} from "../models/OrderItem";
import handleError from "../handlers/handleError";
import {
    Menu
} from "../models/Menu";
import menuSql from "../sql/menuSql";
import productsService from "./productsService";
import productDto from "../dto/productDto";
import orderDetailDto from "../dto/orderDetailDto";
import status from "../constants/status";
import menusService from "./menusService";
// define service of order
const ordersService = {};

/**
 * process order
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {} 
 */
ordersService.createOrder = async(req, res, next) => {

    const {
        userId,
        menuId,
        productId
    } = req.body;

    // count order by user        
    const objId = {};
    objId.userId = userId;
    objId.menuId = menuId;
    const result = await ordersService.countOrderByUser(objId);

    // if count == 0: allow user order, count <> 0: user had ordered, not allow order
    if (result[0].count === 0) {
        // setting content of message
        const messageResponse = new MessageResponse();
        messageResponse.param = Order.name;
        messageResponse.msg = message.MSG_SUCCESS_2;
        // insert data into orders
        let orderId;
        common.processData(messageResponse, req, res, next, status.STT_SUCCESS_CREATE, async() => {

            // define transaction
            const result = await Order.sequelize.transaction(async t => {
                // create a record in order
                const createTime = new Date();
                const order = await Order.sequelize.query(orderSql.insertIntoOrder, {
                    replacements: {
                        userId,
                        menuId,
                        createTime
                    },
                    type: Order.sequelize.QueryTypes.INSERT,
                    transaction: t
                })

                // get orderId after creating in order
                orderId = order[0];
                const quantity = 1;
                // create a record in order_items
                return await OrderItem.sequelize.query(orderSql.insertIntoOrderItem, {
                    replacements: {
                        orderId,
                        productId,
                        quantity
                    },
                    type: OrderItem.sequelize.QueryTypes.INSERT,
                    transaction: t
                });

            });
            // check result 
            if (result) {
                return await productsService.getDetailProduct(productId, orderId);
            }

        });

    } else {
        // setting content of message
        const messageResponse = new MessageResponse();
        messageResponse.param = '';
        messageResponse.msg = message.MSG_FAILED_4;
        // handle error duplicate
        handleError.exceptionDuplicate(messageResponse, next);
    }
};

/**
 * update order item
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {} info order update
 */
ordersService.updateOrder = async(req, res, next) => {

    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = Order.name;
    messageResponse.msg = message.MSG_SUCCESS_3;

    // handle process data
    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_OK, async() => {
        const {
            orderId,
            productId
        } = req.body;

        const result = await Order.sequelize.transaction(async t => {
            return await Order.sequelize.query(orderSql.updateOrderItem, {
                replacements: {
                    orderId,
                    productId
                },
                type: Order.sequelize.QueryTypes.UPDATE,
                transaction: t
            });

        });
        // check result 
        if (result) {
            return await productsService.getDetailProduct(productId, orderId);
        }
    });
};

/**
 * Fetch order of user
 * @param {} req
 * @param {} res
 * @param {} next
 * @return {} a order
 */
ordersService.getOrder = async(req, res, next) => {
    // setting content of message
    const messageResponse = new MessageResponse();
    messageResponse.param = Order.name;
    messageResponse.msg = message.MSG_SUCCESS_1;

    // handle process data
    common.processData(messageResponse, req, res, next, status.STT_SUCCESS_OK, async() => {
        const {
            menuId,
            userId
        } = req.body;

        const result = await Order.sequelize.query(orderSql.getOrderByUser, {
            replacements: {
                menuId,
                userId
            },
            type: Order.sequelize.QueryTypes.SELECT
        });
        if (result.length !== 0) {
            let product = new productDto(result[0].productId, result[0].name, result[0].image, result[0].note, result[0].price, result[0].created_at);
            let order = new orderDetailDto(result[0].orderId, result[0].quantity, product);
            return [order];
        }
        return null;
    });
};

/**
 * Count amount of order by user
 * @param {Object} objId 
 * @return {Object} amount of order
 */
ordersService.countOrderByUser = async(objId) => {

    return Order.sequelize.query(orderSql.countOrderByUser, {
        replacements: {
            userId: objId.userId,
            menuId: objId.menuId
        },
        type: Order.sequelize.QueryTypes.SELECT
    });
};


/**
 * Check valid order with menu time
 * @param {String} menuId 
 * @return {} number 
 */
ordersService.validTimeMenu = async(menuId) => {
    //get time now system
    const createTime = new Date();
    // check order valid with menu time
    const validTime = await Menu.sequelize.query(menuSql.validOrderMenu, {
        replacements: {
            menuId,
            createTime
        },
        type: Order.sequelize.QueryTypes.SELECT
    })
    return validTime[0].valid;
}

/**
 * Get status of menu
 * @param {String} menuId
 * @return {} number
 */
ordersService.checkStatusMenu = async(menuId) => {
    const status = await Menu.sequelize.query(menuSql.getMenu, {
        replacements: {
            menuId
        },
        type: Menu.sequelize.QueryTypes.SELECT
    })
    return status[0].status;
}
export default ordersService;