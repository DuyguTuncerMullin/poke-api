import React, { useState, useEffect } from "react";
import axios from "axios";

import CustomerData from "../interfaces/CustomerData";
import CustomerUpdate from "./CustomerUpdate";
import CustomerDelete from "./CustomerDelete";

const Customers: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newUser, setNewUser] = useState<CustomerData[]>([]);

  const inputFileldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "username") {
      setUsername(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await axios.post(`http://localhost:4000/api/customers`, {
      name,
      username,
      email,
    });
    setNewUser(data);
  };

  const deleteHandler = (deletedUserId: string) => {
    setNewUser((prevUsers) => prevUsers.filter((c) => c._id !== deletedUserId));
  };

  return (
    <div>
      <div>
        <form onSubmit={submitHandler}>
          <h1>User Info</h1>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={inputFileldHandler}
          ></input>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={inputFileldHandler}
          ></input>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={email}
            onChange={inputFileldHandler}
          ></input>
          <button type="submit">Submit</button>
        </form>
        <section>
          <div>
            {newUser.map(({ _id, name, username, email }) => (
              <div key={_id}>
                <h1>New User</h1>
                <li>
                  {name}, {username}, {email}
                </li>
                <CustomerDelete _id={_id} onDelete={() => deleteHandler(_id)} />
                <CustomerUpdate _id={_id} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Customers;
