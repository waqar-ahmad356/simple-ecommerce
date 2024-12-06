import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';

const ListProducts = () => {
  const [products,ListProducts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error, setError] = useState("");
  const url="https://07bc-203-99-174-147.ngrok-free.app/"

  const fetchingProducts=async()=>{
    try {
      const response=await axios.get("http://localhost:4000/api/product/list")
    
    ListProducts(response.data.products)
    setLoading(false)
    console.log(response.data)
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch Products.");
      setLoading(false);


      
    }
    
  }
  useEffect(()=>{
    fetchingProducts();
    
  },[])
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-700">Loading Products...</p>
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
    <div className='px-[80px] flex flex-col gap-9'>
      <h2 className='text-center underline text-[72px] font-bold'>List of Products</h2>
      <div className='grid grid-cols-4 gap-6 '>
        <h2 className='font-bold'>Image</h2>
        <h2 className='font-bold'>Name</h2>
        <h2 className='font-bold'>Description</h2>
        <h2 className='font-bold'>Price</h2>
        {products.map((prod)=>{
          return(
            <>
            <img src={url+"/images/"+prod.image} className='w-[100px] h-[100px]' alt='img'/>
            <h2>{prod.name}</h2>
            <h2>{prod.description}</h2>
            <h2>{prod.price}</h2>
            </>
            
          )
        })}
      </div>
    </div>
  )
}

export default ListProducts
