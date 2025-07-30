import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  publicationDate: { type: Date },
  genre: { type: String },
  image: { type: String, default: '/images/sample.jpg' },
  copies: { type: Number, required: true, min: 0, default: 1 },
  availableCopies: { type: Number, required: true, min: 0, default: 1 },
}, { timestamps: true });

// Ensure available copies do not exceed total copies
bookSchema.pre('save', function(next) {
  if (this.availableCopies > this.copies) {
    this.availableCopies = this.copies;
  }
  next();
});

const Book = mongoose.model('Book', bookSchema);
export default Book;