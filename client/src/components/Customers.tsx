import React, { useState, useEffect } from "react";
import axios from "axios";

import CustomerData from "../interfaces/CustomerData";

const Customers: React.FC = () => {
  const [data, setData] = useState<CustomerData[]>([]);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getDataFromServer = async () => {
      const { data } = await axios.get(`http://localhost:4000/api/customers`);
      console.log("data", data);
      setData(data);
    };
    getDataFromServer();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "userName") {
      setUserName(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/api/customers", {
        name,
        username,
        email,
      });
      console.log("response", data);
      console.log("Data submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="userName"
            placeholder="user name"
            value={username}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="email"
            placeholder="email address"
            value={email}
            onChange={handleInputChange}
          />
          <button type="submit">Add Your Info</button>
        </form>
      </div>
    </div>
  );
};

export default Customers;
