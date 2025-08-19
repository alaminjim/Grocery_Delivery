import { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";

const SellerLogin = () => {
  const navigate = useNavigate();
  const { isSeller, setIsSeller } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSeller = (e) => {
    e.preventDefault();
    setIsSeller(true);
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  return (
    !isSeller && (
      <from
        className="min-h-screen flex items-center text-sm text-gray-500"
        onSubmit={handleSeller}
      >
        <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
          <p className="text-2xl font-medium m-auto">
            <span className="text-[#4fbf7a]">Seller</span>Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              type="email"
              placeholder="Enter your email"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#4fbf7a]"
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              type="password"
              placeholder="Enter your password"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-[#4fbf7a]"
            />
          </div>
          <button className="bg-[#4fbf7a] text-white w-full py-2 rounded-md cursor-pointer">
            Login
          </button>
        </div>
      </from>
    )
  );
};

export default SellerLogin;
