import axios from "axios";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Db } from "mongodb";

import connectToMongoDB from "./config/db";

const app = express();
const port = process.env.PORT || 4000;
const router = express.Router();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();

const startServer = async () => {
  try {
    const mongooseInstance = await connectToMongoDB();

    app.get("/", (req, res) => {
      res.send("Hellow Mongoose");
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
};

startServer();
