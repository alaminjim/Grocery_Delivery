import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";

const Layouts = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>
  );
};

export default Layouts;
