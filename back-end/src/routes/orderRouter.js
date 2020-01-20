import express from 'express';
import ordersService from '../services/ordersService';
import orderValidator from '../validator/orderValidator';
// define route of menu
const orderRouter = express.Router();

// create a order
orderRouter.post('/', orderValidator.validate, ordersService.createOrder);

// get a order
orderRouter.post('/detail', ordersService.getOrder);

// update a order
orderRouter.post('/update', orderValidator.validate, ordersService.updateOrder);

export default orderRouter;