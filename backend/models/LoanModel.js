import mongoose from 'mongoose';
// By importing these, we ensure Mongoose knows about them when defining the schema
import './UserModel.js';
import './BookModel.js';

const loanSchema = mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Book', // This must match the model name 'Book'
  },
  member: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // This must match the model name 'User'
  },
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { type: String, enum: ['Active', 'Returned', 'Overdue'], default: 'Active' },
  fine: { type: Number, default: 0 },
}, { timestamps: true });

const Loan = mongoose.model('Loan', loanSchema);
export default Loan;