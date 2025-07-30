import asyncHandler from 'express-async-handler';
import Loan from '../models/LoanModel.js';
import Book from '../models/BookModel.js';

// @desc    Create a new loan (issue a book)
// @route   POST /api/loans
// @access  Private/Admin
const issueBook = asyncHandler(async (req, res) => {
  const { bookId, memberId, dueDate } = req.body;

  const book = await Book.findById(bookId);
  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }
  if (book.availableCopies < 1) {
    res.status(400);
    throw new Error('No available copies of this book');
  }

  const loan = new Loan({
    book: bookId,
    member: memberId,
    dueDate,
  });

  const createdLoan = await loan.save();
  book.availableCopies -= 1;
  await book.save();

  res.status(201).json(createdLoan);
});

// @desc    Return a book
// @route   PUT /api/loans/:id/return
// @access  Private/Admin
const returnBook = asyncHandler(async (req, res) => {
  const loan = await Loan.findById(req.params.id);

  if (loan) {
    loan.returnDate = new Date();
    loan.status = 'Returned';

    const book = await Book.findById(loan.book);
    if (book) {
        book.availableCopies += 1;
        await book.save();
    }

    // Fine calculation logic
    if (loan.returnDate > loan.dueDate) {
      const daysOverdue = Math.ceil((loan.returnDate - loan.dueDate) / (1000 * 60 * 60 * 24));
      loan.fine = daysOverdue * 10; // $10 per day fine
    }

    const updatedLoan = await loan.save();
    res.json(updatedLoan);
  } else {
    res.status(404);
    throw new Error('Loan not found');
  }
});

// @desc    Get all loans
// @route   GET /api/loans
// @access  Private/Admin
const getLoans = asyncHandler(async (req, res) => {
  const loans = await Loan.find({})
    .populate({ path: 'book', select: 'title' })
    .populate({ path: 'member', select: 'name' });
  res.json(loans);
});

// @desc    Get logged in user's loans
// @route   GET /api/loans/myloans
// @access  Private
const getMyLoans = asyncHandler(async (req, res) => {
  const loans = await Loan.find({ member: req.user._id }).populate('book', 'title author');
  res.json(loans);
});

// @desc    Delete a loan
// @route   DELETE /api/loans/:id
// @access  Private/Admin
const deleteLoan = asyncHandler(async (req, res) => {
  const loan = await Loan.findById(req.params.id);

  if (loan) {
    // Optional: If a loan is deleted while active, return the book to circulation
    if (loan.status === 'Active') {
      const book = await Book.findById(loan.book);
      if (book) {
        book.availableCopies += 1;
        await book.save();
      }
    }
    await loan.deleteOne();
    res.json({ message: 'Loan record removed' });
  } else {
    res.status(404);
    throw new Error('Loan not found');
  }
});

export { issueBook, returnBook, getLoans, getMyLoans, deleteLoan };