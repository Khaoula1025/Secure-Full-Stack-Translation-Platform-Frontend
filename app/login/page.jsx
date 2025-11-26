"use client";
import React, { useState } from "react";
function page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userName: username, password }),
    });
    return res
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

export default page;
