import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SingleProductOrder = () => {
  const { productId } = useParams(); // Get product ID from route params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const url="https://fc1c-119-73-112-37.ngrok-free.app"

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://fc1c-119-73-112-37.ngrok-free.app/api/product/${productId}`,{
            headers: {
              'ngrok-skip-browser-warning': 'true'
            }
          }
        );
        setProduct(data);
        setLoading(false); // Stop loading
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch product details."
          
        );
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);
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

  // Handle order submission
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
  
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      
      // Prepare the products data to match the order schema
     
      
      const totalAmount = product.product.price;
  
      const { data } = await axios.post(
        "https://fc1c-119-73-112-37.ngrok-free.app/api/order/create", // Order creation API
        {
          
          items: [product.product._id,product.product.name], // Array of items in the order
          amount: totalAmount, // Total order amount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in header
          },
        }
      );
  
      setMessage(data.message); // Display success message
      setTimeout(() => navigate("/orders"), 10); // Redirect after order success
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to place order. Please try again."
      );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className=" w-full max-w-md">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}

        {product ? (
          <>
            {/* Product Details */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">{product.product.name}</h2>
              <p className="text-gray-700 mb-2">{product.product.description}</p>
              <p className="text-lg font-semibold text-blue-600 mb-4">
                ${product.product.price}
              </p>
              <img
                src={url+"/images/"+product.product.image}
                alt={product.product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
            </div>

            {/* Order Form */}
            <form onSubmit={handleOrderSubmit}>
              

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              >
                Place Order
              </button>
            </form>
          </>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </div>
  );
};

export default SingleProductOrder;
