import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";
export const Home = () => {
  const location = useLocation();
  const userData = location.state.userData;
  return (
    <div className="App">
      <Sidebar userName={userData.name} />
      <div>Home Page</div>
    </div>
  );
};
