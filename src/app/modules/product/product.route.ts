import express from 'express';
import { productControllers } from './product.controller';
const router = express.Router();

router.post('/', productControllers.createProduct);
router.get('/', productControllers.getAllProducts);
router.get('/:productId', productControllers.getASingleProduct);
router.put('/:productId', productControllers.updateASingleProduct);
router.delete('/:productId', productControllers.deleteASingleProduct);

export const productRoutes = router;
