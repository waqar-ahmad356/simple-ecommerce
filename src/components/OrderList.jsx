import React, { useEffect, useState } from "react";
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch orders data
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the admin token from localStorage
      const { data } = await axios.get("https://07bc-203-99-174-147.ngrok-free.app/api/order/get", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
      });

      setOrders(data.orders); // Store fetched orders
      setLoading(false); // Stop loading
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700">Loading Orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Orders List</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left text-gray-600">Order ID</th>
                <th className="py-2 px-4 text-left text-gray-600">Buyer ID</th>
                <th className="py-2 px-4 text-left text-gray-600">Product Name</th>
                <th className="py-2 px-4 text-left text-gray-600">Total Amount</th>
                <th className="py-2 px-4 text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-300">
                  <td className="py-2 px-4">{order._id}</td>
                  <td className="py-2 px-4">
                    {order.buyerId ? `${order.buyerId} ` : "N/A"}
                  </td>
                  <td className="py-2 px-4">{order.items[1]}</td>
                  <td className="py-2 px-4">${order.amount}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-lg text-white ${
                        order.status === "completed"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
