import express from 'express';
import {
  authUser,
  createNewUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
// router.route('/').post(registerUser).get(protect, admin, getUsers);
router.route('/').post(createNewUser).get(getUsers);
router.route('/login').post(authUser);
router
  .route('/profile/:id')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUserProfile);

export default router;

// router.post('/login', authUser);
// router
//   .route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);

// router
//   .route('/:id')
//   .delete(protect, admin, deleteUser)
//   .get(protect, admin, getUserById)
//   .put(protect, admin, updateUser);
