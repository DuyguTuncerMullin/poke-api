import React, { useState } from "react";
import axios from "axios";

import CustomerData from "../interfaces/CustomerData";

interface CustomerDeleteProps {
//   onDelete: () => void;
  _id: string;
  newUser: CustomerData[];
  setNewUser: React.Dispatch<React.SetStateAction<CustomerData[]>>;
}

const CustomerDelete: React.FC<CustomerDeleteProps> = ({
//   onDelete,
  _id,
  newUser,
  setNewUser,
}) => {
  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/customers/${_id}`);
      setNewUser((prevUsers) => prevUsers.filter((c) => c._id !== _id));
    //   onDelete();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <button onClick={deleteHandler}>Delete User</button>
    </div>
  );
};

export default CustomerDelete;
