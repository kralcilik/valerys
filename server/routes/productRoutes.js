import express from 'express';

import {
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  createProduct,
  getProductByCategory,
  getProductByBrand,
  searchProducts,
  getProductBySpecial,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/category').get(getProductByCategory);
router.route('/special').get(getProductBySpecial);
router.route('/search').get(searchProducts);
router.route('/brand').get(getProductByBrand);

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

router.route('/search').get(searchProducts);

export default router;
