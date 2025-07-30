import express from 'express';
const router = express.Router();
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// The GET route for all books is now public.
// The POST route for creating a book remains protected for admins.
router.route('/')
  .get(getBooks) // <-- REMOVED 'protect' FROM THIS LINE
  .post(protect, admin, createBook);

// All routes for a specific book remain protected.
router.route('/:id')
  .get(protect, getBookById)
  .put(protect, admin, updateBook)
  .delete(protect, admin, deleteBook);

export default router;