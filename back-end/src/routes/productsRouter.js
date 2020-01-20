import express from 'express';
import productsService from '../services/productsService';
import uploadFileService from '../services/uploadFileService';
import productValidator from '../validator/productValidator';

// define route of menu
const productsRouter = express.Router();

// Show list product by menu
productsRouter.post('/', productsService.listAllProduct);

// Fetch all menu
productsRouter.post('/detail', productsService.getProductDetail);

// delete product
productsRouter.post('/delete', productsService.deleteProduct);

// create product 
productsRouter.post('/create', uploadFileService.uploadFile, uploadFileService.checkFileUpload, productValidator.validateCreate, productsService.create);

// Edit detail of product
productsRouter.post('/edit', uploadFileService.uploadFile, productValidator.validateEdit, productsService.checkProductExist, productsService.edit);

export default productsRouter;