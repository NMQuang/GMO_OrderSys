import express from 'express';
import menusRouter from './menusRouter';
import orderRouter from './orderRouter';
import usersRouter from './usersRouter';
import productsRouter from './productsRouter';

/**
 * router common:
 * define all router of all request
 */
const router = express.Router();

// router of menu
router.use('/menu', menusRouter);

// router of order
router.use('/order', orderRouter);

// router of user
router.use('/users', usersRouter);

// router of product
router.use('/product', productsRouter);

export default router;