import axios from "axios";
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import customerRoutes from "./routes/customerRoutes";

import connectToMongoDB from "./config/db";
import CustomerModel from "./models/customerModel";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();

const startServer = async () => {
  try {
    await connectToMongoDB();
    app.use("/api", customerRoutes);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

startServer();
