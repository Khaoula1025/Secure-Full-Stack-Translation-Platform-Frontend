'use client';
import React, { useState } from "react";

export default function page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
      const res= await fetch("api/signUp", {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({ userName:username, password }),
    });
     
    const data = res.json()
    return data
  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">userName</label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="">password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
