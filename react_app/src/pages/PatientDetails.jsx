import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Tab, Typography } from "@material-ui/core";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import PrescriptionTable from "../components/PrescriptionTable";

export const PatientDetails = (props) => {
  const params = useParams();
  const location = useLocation();
  const patientData = location.state.patientData;
  const userData = location.state.userData;
  const [prescriptionData, setPrescriptionData] = useState([]);

  const handlePrescriptions = async (e) => {
    const result = await fetch(
      `http://localhost:5000/api/prescriptions?singpassID=${patientData.singpass_id}`,
      {
        method: "GET",
      }
    );
    const jsonResult = await result.json();
    setPrescriptionData(jsonResult);
  };

  useEffect(() => {
    handlePrescriptions();
  }, []);

  return (
    <div className="App">
      <Sidebar userData={userData} />
      <div className="auth-form-container">
        <AccountCircleIcon style={{ fontSize: "150px" }} />
        <Typography gutterBottom variant="h6" component="h2">
          {patientData.patient_name}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          Age: {patientData.patient_age} <br />
          Gender: {patientData.patient_gender === "M" ? "Male" : "Female"}{" "}
          <br />
          Address: <br />
          {patientData.patient_address}
        </Typography>
      </div>
      <div className="auth-form-container">
        <Typography gutterBottom variant="h6" component="h2">
          Prescriptions
        </Typography>
        <PrescriptionTable prescriptionData={prescriptionData} />
      </div>
      <div className="auth-form-container">
        <Typography gutterBottom variant="h6" component="h2">
          Appointments
        </Typography>
      </div>
    </div>
  );
};
