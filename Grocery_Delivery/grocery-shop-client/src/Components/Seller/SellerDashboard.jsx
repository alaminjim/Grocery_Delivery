import { useAppContext } from "../../Context/AppContext";
import SellerLayout from "../../Pages/Seller/SellerLayout";
import SellerLogin from "./SellerLogin";

const SellerDashboard = () => {
  const { isSeller } = useAppContext();
  return isSeller ? <SellerLayout></SellerLayout> : <SellerLogin></SellerLogin>;
};

export default SellerDashboard;
