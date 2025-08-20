import { useState } from "react";
import { assets } from "../../public/images/assets";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

const InputField = ({ type, placeholder, name, handleChange, address }) => {
  return (
    <input
      className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-[#4fbf7a] transition"
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={handleChange}
      value={address[name] || ""}
      required
    />
  );
};

const AddAddress = () => {
  const { axios, user } = useAppContext();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/address/add", {
        userId: user._id,
        address,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, [user, navigate]);

  return (
    <div className="mt-16 mb-16">
      <p className="text-2xl md:text-3xl text-gray-500 lg:ml-32">
        Add Shipping{" "}
        <span className="font-semibold text-[#4fbf7a]">Address</span>
      </p>
      <div className="flex flex-col-reverse md:flex-row justify-evenly mt-10">
        <div className="flex-1 max-w-md">
          <form className="space-y-3 mt-6 text-sm" onSubmit={handleSubmit}>
            <div className="flex flex-row gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              type="email"
              placeholder="Email Address"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="street"
              type="text"
              placeholder="Street"
            />
            <div className="flex flex-row gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="City"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="State"
              />
            </div>
            <div className="flex flex-row gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="zipCode"
                type="number"
                placeholder="Zip Code"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="Country"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="text"
              placeholder="Phone"
            />

            <button className="w-full mt-6 bg-[#4fbf7a] text-white py-3 hover:bg-[#4fbf7ac7] transition cursor-pointer uppercase">
              Save Address
            </button>
          </form>
        </div>
        <img
          className="md:mr-16 mb-16 md:mt-0 mr-48"
          src={assets.add_address_iamge}
          alt="add address"
        />
      </div>
    </div>
  );
};

export default AddAddress;
