import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../../public/images/assets";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const NavBar = () => {
  const [open, setOpen] = React.useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    searchQuery,
    setSearchQuery,
    getCartCount,
    axios,
  } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/all-product");
    }
  }, [searchQuery, navigate]);

  const logOut = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to="/" onClick={() => setOpen(false)}>
        <img className="w-38" src={assets.logo} alt="logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <div
          onClick={() => navigate("/seller")}
          className="border rounded-full text-xs px-4 py-1 hover:bg-[#4fbf7ae8] hover:border hover:border-[#4fbf7a] hover:text-white border-gray-300 text-gray-600"
        >
          Seller Dashboard
        </div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/all-product">All Products</NavLink>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img className="w-4 h-4" src={assets.search_icon} alt="search" />
        </div>

        <div className="relative cursor-pointer ">
          <img
            onClick={() => navigate("cart")}
            className="w-6 opacity-80"
            src={assets.nav_cart_icon}
            alt="cart"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary-dull w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary-dull hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-10" alt="" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li
                onClick={() => navigate("my-orders")}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logOut}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 sm:hidden">
        <div className="relative cursor-pointer ">
          <img
            onClick={() => navigate("cart")}
            className="w-6 opacity-80"
            src={assets.nav_cart_icon}
            alt="cart"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary-dull w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
        >
          {/* Menu Icon SVG */}
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/30 flex justify-start items-start md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-64 p-6 flex flex-col gap-4 h-full shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-green-600">GreenCart</h1>
            </div>

            {/* Nav Links */}
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="py-2 text-gray-700 hover:text-green-500 transition"
            >
              Home
            </NavLink>
            <NavLink
              to="/all-product"
              onClick={() => setOpen(false)}
              className="py-2 text-gray-700 hover:text-green-500 transition"
            >
              All Products
            </NavLink>
            <NavLink
              to="/seller"
              onClick={() => setOpen(false)}
              className="py-2 text-gray-700 hover:text-green-500 transition"
            >
              Seller Dashboard
            </NavLink>

            {/* Login / Logout Button */}
            {!user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  setShowUserLogin(true);
                }}
                className="px-6 py-2 mt-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
              >
                Login
              </button>
            ) : (
              <button
                onClick={logOut}
                className="px-6 py-2 mt-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
