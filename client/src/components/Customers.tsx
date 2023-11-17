import React, { useState, useEffect } from "react";
import axios from "axios";

import CustomerData from "../interfaces/CustomerData";
import CustomerUpdate from "./CustomerUpdate";

const Customers: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [newUser, setNewUser] = useState<CustomerData[]>([]);

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
      console.log("data in handleSubmit", data);
      setNewUser(data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const deleteHandler = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/customers/${id}`);
      console.log("id of the customer to be deleted", id);

      setNewUser((prevUsers) =>
        prevUsers.filter((customer) => customer._id !== id)
      );
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div>
      <div>
        <h1>User Info</h1>
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
        <section>
          {newUser.map(({ _id, name, username, email }) => (
            <div key={_id}>
              <p>
                {name}, {username}, {email}
              </p>
              <button
                onClick={() => {
                  deleteHandler(_id);
                }}
              >
                Delete your information
              </button>
              <CustomerUpdate _id={_id} name={name} username={username} email={email} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Customers;
