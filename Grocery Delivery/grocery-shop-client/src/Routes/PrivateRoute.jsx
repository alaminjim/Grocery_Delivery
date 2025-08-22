import { Navigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import Loader from "../Components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAppContext();

  if (loading) return <Loader></Loader>;

  if (user) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
