import { TextField, Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const PrescriptionPage = () => {
  const location = useLocation();
  const classes = useStyles();
  const userData = location.state.userData;
  const [patientData, setPatientData] = useState([]);
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState("");
  const [orderAmount, setOrderAmount] = useState("");

  const handleFetchPatients = async (e) => {
    const result = await fetch(
      `http://localhost:5000/api/patients?singpassID=${userData.singpass_id}`,
      {
        method: "GET",
      }
    );
    const jsonResult = await result.json();
    setPatientData(jsonResult);
  };

  const handleFetchPrescriptions = async (e) => {
    const result = await fetch(
      `http://localhost:5000/api/prescriptions?singpassID=${selectedPatient}`,
      {
        method: "GET",
      }
    );
    const jsonResult = await result.json();
    setPrescriptionData(jsonResult);
  };

  const handleChangePatient = (event) => {
    setSelectedPatient(event.target.value);
  };

  const handleChangePrescription = (event) => {
    setSelectedPrescription(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch(`http://localhost:5000/api/prescriptions`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        singpass_id: selectedPatient,
        prescription: selectedPrescription,
        amount: orderAmount,
      }),
    });
    const jsonResult = await result.json();
    console.log(jsonResult);
    setSelectedPatient("");
    setSelectedPrescription("");
    setOrderAmount("");
  };

  useEffect(() => {
    handleFetchPatients();
  }, []);

  useEffect(() => {
    handleFetchPrescriptions();
  }, [selectedPatient]);

  return (
    <div className="App">
      <Sidebar userData={userData} />
      <div className="auth-form-container">
        <form className="prescription-form" onSubmit={handleSubmit}>
          <Typography gutterBottom variant="h6" component="h2">
            Order Prescription
          </Typography>
          <FormControl
            required
            className={classes.formControl}
            style={{ width: "300px" }}
          >
            <InputLabel>Select Patient</InputLabel>
            <Select value={selectedPatient} onChange={handleChangePatient}>
              {patientData.map((patients) => (
                <MenuItem
                  key={patients.patient_id}
                  value={patients.singpass_id}
                >
                  {patients.patient_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedPatient ? (
            <FormControl
              required
              className={classes.formControl}
              style={{ width: "300px" }}
            >
              <InputLabel>Select Prescription</InputLabel>
              <Select
                value={selectedPrescription}
                onChange={handleChangePrescription}
              >
                {prescriptionData.map((prescription) => (
                  <MenuItem
                    key={prescription.prescription_id}
                    value={prescription.prescription_name}
                  >
                    {prescription.prescription_name} (
                    {prescription.prescription_current_amount} /
                    {prescription.prescription_amount})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
          <TextField
            className="auth-inputfield"
            required
            label="Order Amount"
            defaultValue=""
            variant="outlined"
            value={orderAmount}
            onChange={(e) => setOrderAmount(e.target.value)}
            autoComplete="off"
            style={{ margin: "0.5rem", width: "300px" }}
          />
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
            Order
          </Button>
        </form>
      </div>
    </div>
  );
};
