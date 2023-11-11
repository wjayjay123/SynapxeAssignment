import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Register = (props) => {
  const [name, setName] = useState("");
  const [nric, setNric] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(nric);
    console.log(password);
  };

  return (
    <>
      <div className="App">
        <div className="auth-form-container">
          <img className="logo" src={require("../icons/medical.png")} alt="" />
          <h2>HealthAssist</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <label className="auth-label">Register</label>
            <input
              className="auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full name"
              id="name"
              name="name"
            />
            <input
              className="auth-input"
              value={nric}
              onChange={(e) => setNric(e.target.value)}
              type="text"
              placeholder="NRIC / FIN"
              id="nric"
              name="nric"
            />
            <input
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              id="password"
              name="password"
            />
            <button className="auth-button-register">Register</button>
            <button className="auth-button">
              <Link to={"/"} style={{ textDecoration: "None", color: "white" }}>
                Back to log in
              </Link>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
