import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

const baseURL = "http://localhost:3009/user";

export default function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullNames, setFullNames] = useState([]);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const addUser = (e) => {
    e.preventDefault();
    const data = {
      id: uuidv4(),
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
    };
    setFullNames([...fullNames, data]);
  };

  const getFunc = async () => {
    const response = await axios.post(baseURL, {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
    });
    console.log(response.data);
  };

  useEffect(() => {
    getFunc();
  }, []);

  return (
    <form onSubmit={addUser}>
      <input
        ref={firstNameRef}
        type="text"
        placeholder="first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        ref={lastNameRef}
        type="text"
        placeholder="last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button type="submit">add user</button>
      {fullNames.map((name, index) => {
        return (
          <div key={index}>
            <h1>{name.firstName}</h1>
            <h1>{name.lastName}</h1>
          </div>
        );
      })}
    </form>
  );
}
