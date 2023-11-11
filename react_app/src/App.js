import {Route, Routes} from "react-router-dom"
import './App.css';
import {Login} from "./pages/Login"
import { Register } from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path = "/" element={<Login/>}/>
      <Route path = "/Register" element={<Register/>}/>
    </Routes>
  );
}

export default App;
