import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";

export const PatientDetails = (props) => {
  const params = useParams();
  const location = useLocation();
  const patientData = location.state.patientData;
  const userData = location.state.userData;

  return (
    <div className="App">
      <Sidebar userData={userData} />
      <div>Patient Details</div>
      <div>Patient ID is :{patientData.patient_name}</div>
    </div>
  );
};
