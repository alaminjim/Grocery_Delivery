import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { useAppContext } from "../Context/AppContext";
import Login from "../Components/Login";

const Layouts = () => {
  const { showUserLogin } = useAppContext();
  return (
    <div>
      <div>
        <NavBar></NavBar>
        <div>
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
      {showUserLogin ? <Login /> : null}
    </div>
  );
};

export default Layouts;
