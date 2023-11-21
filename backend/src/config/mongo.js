import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://admin:admin@localhost:27017/db', {
      authSource: 'admin',
    });

    console.log('MongoDB Connecté...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
