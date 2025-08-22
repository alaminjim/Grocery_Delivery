import { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { assets } from "../../public/images/assets";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const {
    products,
    cartItems,
    removeCartItems,
    getCartCount,
    updatedCart,
    getCartAmount,
    axios,
    user,
    setCartItems,
  } = useAppContext();
  const [showAddress, setShowAddress] = useState(false);
  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState([]);
  const [selectAddress, setSelectAddress] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      if (product) {
        tempArray.push({ ...product, quantity: cartItems[key] });
      }
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get(`/api/address/get?userId=${user._id}`);
      if (data.success) {
        const fetchedAddresses = data.addresses || [];
        setAddress(fetchedAddresses);
        if (fetchedAddresses.length > 0) {
          setSelectAddress(fetchedAddresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (user) {
      getUserAddress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, cartItems]);

  const placeOrder = async () => {
    try {
      if (!selectAddress) {
        return toast.error("Please select an address");
      }

      // place order in COD
      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectAddress._id,
        });
        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post("/api/order/stripe", {
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectAddress._id,
        });
        if (data.success) {
          window.location.replace(data.url);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-16 lg:ml-52 ml-5">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6 text-gray-700">
          Shopping Cart{" "}
          <span className="text-sm text-[#4fbf7a]">{getCartCount()} Items</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(
                    `/product/${product.category.toLowerCase()}/${product._id}`
                  );
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      onChange={(e) =>
                        updatedCart(product._id, Number(e.target.value))
                      }
                      value={cartItems[product._id]}
                      className="outline-none"
                    >
                      {Array(
                        cartItems[product._id] > 9 ? cartItems[product._id] : 9
                      )
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              ${product.offerPrice * cartItems[product._id]}
            </p>
            <button
              onClick={() => removeCartItems(product._id)}
              className="cursor-pointer mx-auto"
            >
              <img
                className="inline-block w-6 h-6"
                src={assets.remove_icon}
                alt=""
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/all-product");
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-[#4fbf7a] font-medium"
        >
          <img
            className="group-hover:translate-x-1 transition"
            src={assets.arrow_right_icon_colored}
            alt=""
          />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {" "}
              {selectAddress
                ? `${selectAddress.street},${selectAddress.city},${selectAddress.state},${selectAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-[#4fbf7a] hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                {address.map((addresses, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setAddress(addresses);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100"
                  >
                    {addresses.street},{addresses.city},{addresses.state},
                    {addresses.country}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-[#4fbf7a] text-center cursor-pointer p-2 hover:bg-[#4fbf7a1a]"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            value={paymentOption}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>${getCartAmount()}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>${(getCartAmount() * 2) / 100}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>${getCartAmount() + (getCartAmount() * 2) / 100}</span>
          </p>
        </div>
        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-[#4fbf7a] text-white font-medium hover:bg-[#4fbf7ac4] transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed To CheckOut"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
