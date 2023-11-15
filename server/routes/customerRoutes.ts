import express, { Request, Response } from "express";
import CustomerModel, { ICustomer } from "../models/customerModel";
const router = express.Router();

router.get("/customers", async (req: Request, res: Response) => {
    try {
      const customers = await CustomerModel.find({});
      res.json(customers);
    } catch (error) {
      console.error("Error reading customers:", error);
      res.status(500).send("Internal Server Error");
    }
  });

router.post("/customers", async (req: Request, res: Response) => {
  try {
    const { username, name, email } = req.body;
    console.log("req.body", req.body)

    const newCustomer: ICustomer = new CustomerModel({ username, name, email });
    console.log("newCustomer", newCustomer)

    await newCustomer.save();

    res.status(201).json({
      message: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
