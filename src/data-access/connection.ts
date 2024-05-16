import mongoose from "mongoose";

const LOCAL_URI = 'mongodb://localhost:27017/niyo-testdb';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || LOCAL_URI);
    console.log("MongoDB connected");
  } catch (error) {
    throw error;
  }
};

export default connectDB;
