import React, { useState, useEffect } from "react";
import axios from "axios";

import CustomerData from "../interfaces/CustomerData";

const Customers: React.FC = () => {
  const [data, setData] = useState<CustomerData[]>([]);

  useEffect(() => {
    const getDataFromServer = async () => {
      const { data } = await axios.get(`http://localhost:4000/api/customers`);
      console.log("data", data);
      setData(data);
    };
    getDataFromServer();
  }, []);
  return (
    <div>
      <div>
        {data.map(({ _id, name }) => (
          <li key={_id}>{name}</li>
        ))}
      </div>
    </div>
  );
};

export default Customers;