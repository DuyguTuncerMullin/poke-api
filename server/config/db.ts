import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const apiConfig = {
  userName: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
};

const uri = `mongodb+srv://${apiConfig.userName}:${apiConfig.password}@cluster4.xft79te.mongodb.net/sample_analytics`;

const connectToMongoDB = async () => {
  try {
    const connection = await mongoose.connect(uri);

    console.log(`Connected to MongoDB: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectToMongoDB;
