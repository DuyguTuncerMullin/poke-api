import mongoose, { Mongoose } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const apiConfig = {
  userName: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
};

const uri = `mongodb+srv://${apiConfig.userName}:${apiConfig.password}@cluster4.xft79te.mongodb.net`;

const connectToMongoDB = async (): Promise<Mongoose> => {
  try {
    const mongooseInstance = await mongoose.connect(uri, {
    });

    console.log('Connected to MongoDB with Mongoose');

    return mongooseInstance;
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas with Mongoose:', err);
    throw err;
  }
};

export default connectToMongoDB;
