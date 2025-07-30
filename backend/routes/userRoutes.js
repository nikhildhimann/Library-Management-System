import express from 'express';
const router = express.Router();
import {
  getUsers,
  deleteUser,
  createUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// A GET request to /api/users will get all users.
// A POST request to /api/users will create a new user.
router.route('/')
  .get(protect, admin, getUsers)
  .post(protect, admin, createUser);

// A DELETE request to /api/users/:id will delete a specific user.
router.route('/:id')
  .delete(protect, admin, deleteUser);

export default router;