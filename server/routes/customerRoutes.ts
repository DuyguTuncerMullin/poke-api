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
    console.log("req.body", req.body);

    const newCustomer: ICustomer = new CustomerModel({ username, name, email });
    console.log("newCustomer", newCustomer);

    await newCustomer.save();

    const customerArray = [newCustomer];
    console.log("customerArray", customerArray);
    res.send(customerArray);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/customers/:id", async (req: Request, res: Response) => {
  const customerId = req.params.id;
  console.log("customerId", customerId);

  try {
    const deletedCustomer = await CustomerModel.findByIdAndDelete(customerId);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.send(deletedCustomer);
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/customers/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { updateName, updateUserName, updateEmail } = req.body;
  console.log("id in put", id);
  try {
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
      id,
      {
        name: updateName,
        username: updateUserName,
        email: updateEmail,
      },
      { new: true }
    );
    console.log("updatedCustomer", updatedCustomer);

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.send(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
