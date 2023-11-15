import express, { Request, Response } from "express";
import CustomerModel, { ICustomer } from "../models/customerModel";
const router = express.Router();

router.get("/customers", async (req: Request, res: Response) => {
    try {
      const customers = await CustomerModel.find({});
      console.log("customers", customers);
      res.json(customers);
    } catch (error) {
      console.error("Error reading customers:", error);
      res.status(500).send("Internal Server Error");
    }
  });

export default router;
