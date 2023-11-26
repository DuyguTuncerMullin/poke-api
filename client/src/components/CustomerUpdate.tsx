import React, { useState } from "react";
import axios from "axios";
interface UpdateProps {
  _id: string;
}

const CustomerUpdate: React.FC<UpdateProps> = ({ _id }) => {
  const [updatedName, setUpdatedName] = useState("");
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  const inputFileldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "updatedName") {
      setUpdatedName(value);
    } else if (name === "updatedUsername") {
      setUpdatedUsername(value);
    } else if (name === "updatedEmail") {
      setUpdatedEmail(value);
    }
  };

  const submitHandler = async (id: string) => {
    const { data } = await axios.put(
      `http://localhost:4000/api/customers/${id}`,
      {
        updatedName,
        updatedUsername,
        updatedEmail,
      }
    );
  };

  return (
    <div>
      <form
        onSubmit={() => {
          submitHandler(_id);
        }}
      >
        <h1>Update your Info</h1>
        <input
          type="text"
          name="updatedName"
          placeholder="name"
          value={updatedName}
          onChange={inputFileldHandler}
        ></input>
        <input
          type="text"
          name="updatedUsername"
          placeholder="username"
          value={updatedUsername}
          onChange={inputFileldHandler}
        ></input>
        <input
          type="text"
          name="updatedEmail"
          placeholder="email"
          value={updatedEmail}
          onChange={inputFileldHandler}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CustomerUpdate;
