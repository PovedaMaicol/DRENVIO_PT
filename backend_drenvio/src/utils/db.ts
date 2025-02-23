import mongoose from 'mongoose';
import 'dotenv/config';


const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI as string; 


const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected port:', PORT);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;