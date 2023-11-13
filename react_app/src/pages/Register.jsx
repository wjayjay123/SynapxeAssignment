import React, { useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export const Register = (props) => {
  const [name, setName] = useState("");
  const [nric, setNric] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === rePassword) {
      setPasswordCheck(true);
      const result = await fetch(`http://localhost:5000/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          nric: nric,
          password: password,
        }),
      });
      const jsonResult = await result.json();
      console.log(jsonResult);
      navigate("/");
    } else {
      setPasswordCheck(false);
    }
  };

  return (
    <>
      <div className="App">
        <div className="auth-form-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <label className="auth-label">Register</label>
            <TextField
              className="auth-inputfield"
              required
              label="Full Name"
              defaultValue=""
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              style={{ margin: "0.5rem" }}
            />
            <TextField
              className="auth-inputfield"
              required
              label="NRIC / FIN"
              defaultValue=""
              variant="outlined"
              value={nric}
              onChange={(e) => setNric(e.target.value)}
              autoComplete="off"
              style={{ margin: "0.5rem" }}
            />
            <TextField
              className="auth-inputfield"
              required
              type="password"
              label="Password"
              defaultValue=""
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              style={{ margin: "0.5rem" }}
            />
            <TextField
              className="auth-inputfield"
              required
              type="password"
              label="Re-enter Password"
              defaultValue=""
              variant="outlined"
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              autoComplete="off"
              style={{ margin: "0.5rem" }}
            />
            {passwordCheck ? null : (
              <Typography
                style={{ color: "red", fontSize: "small", textAlign: "center" }}
              >
                Password does not match. Please try again.
              </Typography>
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
              Register
            </Button>
            <Button
              onClick={() => navigate("/")}
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
              Back to log in
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
