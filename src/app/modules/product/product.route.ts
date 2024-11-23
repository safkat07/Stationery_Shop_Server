import express from 'express';
import { productControllers } from './product.controller';
const router = express.Router();

router.post('/create-product', productControllers.createProduct);
router.get('/', productControllers.getAllProducts);
router.get('/:productID', productControllers.getASingleProduct);
router.put('/:productID', productControllers.updateASingleProduct);
router.delete('/:productID', productControllers.deleteASingleProduct);

export const productRoutes = router;
