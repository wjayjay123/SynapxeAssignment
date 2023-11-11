import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

export const Login = (props) => {
  const [singpassID, setsingpassID] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState("Fail");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch(
      `http://localhost:5000/api/users?singpassID=${singpassID}&password=${password}`
    );
    const jsonResult = await result.json();
    if (jsonResult.length > 0) {
      setLoginState("Success");
    } else {
      setLoginState("Fail");
    }
    console.log(jsonResult);
    if (loginState === "Success") {
      console.log("Success");
    } else {
      console.log("Fail");
    }
  };

  return (
    <>
      <div className="App">
        <div className="auth-form-container">
          <img className="logo" src={require("../icons/medical.png")} alt="" />
          <h2>HealthAssist</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="auth-label">Log in</label>
            <TextField
              className="auth-inputfield"
              id="standard-required"
              label="Singpass ID"
              defaultValue=""
              variant="outlined"
              value={singpassID}
              onChange={(e) => setsingpassID(e.target.value)}
              autoComplete="off"
            />
            <TextField
              className="auth-inputfield"
              id="standard-required"
              label="Password"
              type="password"
              defaultValue=""
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <button className="auth-button-login">Log in</button>
            <button className="auth-button">
              <Link
                to={"/Register"}
                style={{ textDecoration: "None", color: "white" }}
              >
                Register an account
              </Link>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
