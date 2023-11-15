import axios from "axios";
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

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
    // Connect to MongoDB
    await connectToMongoDB();

    app.get("/customers", async (req: Request, res: Response) => {
      try {
        const customers = await CustomerModel.find({});
        console.log("customers", customers);
        res.json(customers);
      } catch (error) {
        console.error("Error reading customers:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

startServer();
