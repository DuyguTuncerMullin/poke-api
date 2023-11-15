import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
  username: string;
  name: string;
  email: string;
}

const customerSchema = new Schema<ICustomer>({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const CustomerModel = mongoose.model<ICustomer>("Customer", customerSchema);

export default CustomerModel;
