import express from 'express';

import {
  addProductToCart,
  deleteAllCart,
  getAllProductsFromCart,
  removeItemFromCart,
  removeProductFromCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(addProductToCart);
router.route('/removeone/:id').post(removeProductFromCart);
router.route('/delete').delete(deleteAllCart);
router.route('/').get(getAllProductsFromCart);
router.route('/:id').delete(removeItemFromCart);

export default router;
