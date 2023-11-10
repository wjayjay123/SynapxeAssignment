import React, { useState } from "react";

export const Login = (props) => {
  const [singpassID, setsingpassID] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(singpassID);
    console.log(password);
  };

  return (
    <div className="auth-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="auth-label">Log in</label>
        <input
          className="auth-input"
          value={singpassID}
          onChange={(e) => setsingpassID(e.target.value)}
          type="text"
          placeholder="Singpass ID"
          id="singpassID"
          name="singpassID"
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
        <button className="auth-button-login">Log in</button>
        <button
          className="auth-button"
          onClick={() => props.onFormSwitch("register")}
        >
          Register an account
        </button>
      </form>
    </div>
  );
};
