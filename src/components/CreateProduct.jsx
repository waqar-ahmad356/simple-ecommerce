import React, { useState,useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const fileInputRef=useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set the preview to the file's data URL
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null); // Reset preview if no file is selected
    }
  };
const token=localStorage.getItem("token")
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post("https://fc1c-119-73-112-37.ngrok-free.app/api/product/create", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });
      setFormData({
        name: "",
        description: "",
        price: "",
        image: null,
      });
      setPreview(null); 
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      setMessage(response.data.message || "Product created successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter product description"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter product price"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              ref={fileInputRef} 
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Selected"
                  className="w-full h-48 object-cover border rounded"
                />
              </div>
            )}
          </div>

         <button
            type="submit" 
            className="w-full mt-3 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
        {message && (
          <div className="mt-4">
            <p className="text-center text-green-500">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
