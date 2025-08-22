import { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) fetchMyOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!myOrders.length)
    return <p className="text-center mt-16">No Orders Yet.</p>;

  return (
    <div className="mt-16 mb-16 lg:ml-64">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-[#4fbf7a] rounded-full"></div>
      </div>

      {myOrders.map((order, idx) => (
        <div
          key={idx}
          className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
        >
          <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
            <span>OrderId: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>TotalAmount: ${order.amount}</span>
          </p>

          {order.items.map((item, i) => {
            if (!item.product) return null;

            return (
              <div
                key={i}
                className={`relative bg-white text-gray-500/70 ${
                  order.items.length !== i + 1 && "border-b"
                } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
              >
                <div className="flex items-center mb-4 md:mb-0">
                  <div className="bg-[#4fbf7a2a] p-4 rounded-lg">
                    <img
                      className="w-16 h-16 object-cover"
                      src={item.product?.image?.[0] || "/placeholder.png"}
                      alt={item.product?.name || "No name"}
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-medium text-gray-800">
                      {item.product?.name || "Unknown Product"}
                    </h2>
                    <p>Category: {item.product?.category || "N/A"}</p>
                  </div>
                </div>

                <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0">
                  <p>Quantity: {item.quantity}</p>
                  <p>Status: {order.status}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <p className="text-lg text-[#4fbf7a] font-medium">
                  Amount: ${(item.product?.offerPrice || 0) * item.quantity}
                </p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
