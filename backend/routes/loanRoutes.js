import express from 'express';
const router = express.Router();
import {
  issueBook,
  returnBook,
  getLoans,
  getMyLoans,
  deleteLoan,
} from '../controllers/loanController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Routes for Admins
router.route('/')
  .get(protect, admin, getLoans)
  .post(protect, admin, issueBook);

// Route for a logged-in member to get their own loans
router.route('/myloans').get(protect, getMyLoans);

// Route for an Admin to mark a book as returned
router.route('/:id/return').put(protect, admin, returnBook);

// Add the new DELETE route
router.route('/:id').delete(protect, admin, deleteLoan);

export default router;