import express from 'express';
import menusService from '../services/menusService';
import menuValidator from '../validator/menuValidator';
// define route of menu
const menusRouter = express.Router();

// Fetch all menu
menusRouter.post('/', menusService.getAllMenu);

// Pagiantion menu
menusRouter.get('/list/:page', menusService.pagination);

// Fetch all product by menuId
menusRouter.post('/detail', menusService.checkMenuExist, menusService.getAllProduct);

// clone a menu
menusRouter.post('/clone', menusService.checkMenuExist, menuValidator.validateCreate, menusService.createMenuClone);

// create a new menu
menusRouter.post('/create', menuValidator.validateCreate, menusService.createMenu);

// Count all order, product from order_items
menusRouter.post('/summary', menusService.summary);

// Show list menu
menusRouter.get('/showallmenu', menusService.listAllMenu);

// Edit menu
menusRouter.post('/edit', menusService.checkMenuExist, menuValidator.validateEdit, menusService.editMenu);

// Export menu
menusRouter.post('/export', menusService.exportMenu);

// Get menu by menuId
menusRouter.post('/find', menusService.findMenuById);

export default menusRouter;