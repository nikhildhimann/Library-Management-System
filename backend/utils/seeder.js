import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Book from '../models/BookModel.js';
import User from '../models/UserModel.js';
import books from '../data/books.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear all existing data first
    await Book.deleteMany();
    await User.deleteMany();

    // Create the default SuperAdmin user
    await User.create({
        name: 'Super Admin',
        email: 'superadmin@gmail.com',
        password: 'admin',
        role: 'SuperAdmin',
    });

    // --- CREATE THE NEW ADMIN USER YOU REQUESTED ---
    await User.create({
        name: 'Admin XYZ',
        email: 'admin@gmail.com',
        password: 'admin',
        role: 'Admin',
    });

    console.log('Super Admin User Created!');
    console.log('Admin User (xyz@gmail.com) Created!');

    // Insert all the sample books
    await Book.insertMany(books);
    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error during data import: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Book.deleteMany();
    await User.deleteMany();
    console.log('Data Destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error during data destruction: ${error}`);
    process.exit(1);
  }
};

// Logic to run either import or destroy
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}