import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import PatientCard from "../components/PatientCard";
import { Grid } from "@material-ui/core";

export const Home = () => {
  const location = useLocation();
  const userData = location.state.userData;
  const [patientData, setPatientData] = useState([]);

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

  useEffect(() => {
    handleFetchPatients();
  }, []);

  return (
    <div className="App">
      <Sidebar userData={userData} />
      <Grid
        container
        spacing={2}
        item
        xs={6}
        md={6}
        style={{ alignContent: "center" }}
      >
        {patientData.map((patient) => {
          return <PatientCard patientData={patient} userData={userData} />;
        })}
      </Grid>
    </div>
  );
};
