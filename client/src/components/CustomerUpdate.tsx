import React, { useState } from "react";
import axios from "axios";

import CustomerData from "../interfaces/CustomerData";

const CustomerUpdate: React.FC<CustomerData> = ({
  _id,
  name,
  username,
  email,
}) => {
  const [updateName, setUpdateName] = useState("");
  const [updateUserName, setUpdateUserName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setUpdateName(value);
    } else if (name === "userName") {
      setUpdateUserName(value);
    } else if (name === "email") {
      setUpdateEmail(value);
    }
  };

  const handleSubmit = async (id: string) => {
    const { data } = await axios.put(
      `http://localhost:4000/api/customers/${id}`, { updateName, updateUserName, updateEmail });
    console.log("put request sent");
    console.log("data in put", data);
  };

  return (
    <div>
      <div>
        <div>
          <form
            onSubmit={() => {
              handleSubmit(_id);
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="name"
              value={updateName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="userName"
              placeholder="user name"
              value={updateUserName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="email"
              placeholder="email address"
              value={updateEmail}
              onChange={handleInputChange}
            />
            <button type="submit">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerUpdate;
