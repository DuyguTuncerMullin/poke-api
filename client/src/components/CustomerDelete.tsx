import React, { useState } from "react";
import axios from "axios";

interface CustomerDeleteProps {
  onDelete: () => void;
  _id: string;
}

const CustomerDelete: React.FC<CustomerDeleteProps> = ({ onDelete, _id }) => {
  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/customers/${_id}`);
      onDelete();
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
