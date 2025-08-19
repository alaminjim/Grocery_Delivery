import { useAppContext } from "../../Context/AppContext";
import SellerLogin from "./SellerLogin";

const SellerDashboard = () => {
  const { isSeller } = useAppContext();
  return isSeller ? null : <SellerLogin></SellerLogin>;
};

export default SellerDashboard;
