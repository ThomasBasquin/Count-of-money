import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/db');
    console.log('MongoDB Connecté...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
