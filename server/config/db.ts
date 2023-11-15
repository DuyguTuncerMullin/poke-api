import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

interface ApiConfig {
  userName: string;
  password: string;
}
const apiConfig: ApiConfig = {
  userName: process.env.USER_NAME || "",
  password: process.env.USER_PASSWORD || "",
};

if (!apiConfig.userName || !apiConfig.password) {
  throw new Error(
    "USER_NAME and USER_PASSWORD must be provided in the environment variables."
  );
}

const uri = `mongodb+srv://${apiConfig.userName}:${apiConfig.password}@cluster4.xft79te.mongodb.net/sample_analytics`;

const connectToMongoDB = async (): Promise<Connection> => {
  try {
    const connection = await mongoose.connect(uri);

    console.log(`Connected to MongoDB: ${connection.connection.host}`);
    // Return the connection object instead of the entire mongoose connection after adding type Promise<Connection>
    // return connection;

    return connection.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error(
      "Unable to connect to MongoDB. Check your connection settings."
    );
  }
};

export default connectToMongoDB;
