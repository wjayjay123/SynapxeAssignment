import {Route, Routes} from "react-router-dom"
import './App.css';
import {Login} from "./pages/Login"
import { Register } from './pages/Register';
import { Home } from "./pages/Home";
import { PatientDetails } from "./pages/PatientDetails";

function App() {
  return (
    <Routes>
      <Route path = "/" element={<Login/>}/>
      <Route path = "/Register" element={<Register/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/Details/:pid" element={<PatientDetails/>}/>
    </Routes>
  );
}

export default App;
