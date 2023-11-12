import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [singpassID, setsingpassID] = useState("");
  const [password, setPassword] = useState("");
  const [hide, setHide] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch(
      `http://localhost:5000/api/users?singpassID=${singpassID}&password=${password}`,
      {
        method: "GET",
      }
    );
    const jsonResult = await result.json();
    if (jsonResult.length > 0) {
      console.log(jsonResult);
      navigate("/Home");
    } else {
      setHide(false);
    }
  };

  return (
    <>
      <div className="App">
        <div className="auth-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="auth-label">Log in</label>
            <TextField
              className="auth-inputfield"
              required
              label="Singpass ID"
              defaultValue=""
              variant="outlined"
              value={singpassID}
              onChange={(e) => setsingpassID(e.target.value)}
              autoComplete="off"
              style={{ margin: "0.5rem" }}
            />
            <TextField
              className="auth-inputfield"
              required
              label="Password"
              type="password"
              defaultValue=""
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              style={{ margin: "0.5rem" }}
            />
            {hide ? null : (
              <a className="auth-errormsg">
                Incorrect ID or password, please try again.
              </a>
            )}
            <Button
              variant="contained"
              type="submit"
              style={{
                backgroundColor: "#e11f26",
                color: "white",
                fontWeight: "bold",
                padding: "15px",
                borderRadius: "10px",
                margin: "0.5rem",
              }}
            >
              Log In
            </Button>
            <Button
              onClick={() => navigate("/Register")}
              variant="contained"
              style={{
                backgroundColor: "#afaea5",
                color: "white",
                fontWeight: "bold",
                padding: "15px",
                borderRadius: "10px",
                margin: "0.5rem",
              }}
            >
              Register an account
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
