// server/config/db.ts
import dotenv from "dotenv";
import { MongoClient, Db } from "mongodb";

dotenv.config();

const apiConfig = {
  userName: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
};

const uri = `mongodb+srv://${apiConfig.userName}:${apiConfig.password}@cluster4.xft79te.mongodb.net/?retryWrites=true&w=majority`;

const connectToMongoDB = async (): Promise<Db> => {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db();
    console.log('Connected to MongoDB');

    return db;
  } catch (err) {
    console.error("Error connecting to MongoDB Atlas:", err);
    throw err;
  }
};

export default connectToMongoDB;
