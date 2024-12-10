import React, { useContext } from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { ContextApi } from '../Context_API/Context';
import { toast } from 'react-toastify';
const ListProducts = () => {
  const [products,ListProducts]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error, setError] = useState("");
  const {apiUrl}=useContext(ContextApi)

  const fetchingProducts=async()=>{
    try {
      const response=await axios.get(`${apiUrl}/api/product/list`,{
        headers: {
          'ngrok-skip-browser-warning': 'true',
        
        }
      })
    
    ListProducts(response.data.products)
    setLoading(false)
    console.log(response?.data)
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch Products.");
      setLoading(false);


      
    }
    
  }
  const token=localStorage.getItem("token")
  const removeProduct=async(productId)=>{
    try {
      await axios.post(`${apiUrl}/api/product/remove`,{id: productId},{
        headers: {
          'ngrok-skip-browser-warning': 'true',
            Authorization: `Bearer ${token}`
        }
      })
      toast.success("Product Removed..!")
    await fetchingProducts();
    } catch (error) {

      console.log("Error",error)
      
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
      <div className='grid grid-cols-5 gap-6 '>
        <h2 className='font-bold'>Image</h2>
        <h2 className='font-bold'>Name</h2>
        <h2 className='font-bold'>Description</h2>
        <h2 className='font-bold'>Price</h2>
        <h2 className='font-bold'>Action</h2>
        {products?.map((prod)=>{
          return(
            <>
            <img src={apiUrl+"/images/"+prod.image} className='w-[100px] h-[100px]' alt='img'/>
            <h2>{prod.name}</h2>
            <h2>{prod.description}</h2>
            <h2>{prod.price}</h2>
            <h2 className='cursor-pointer' onClick={()=>{removeProduct(prod._id)}}>X</h2>
            </>
            
          )
        })}
      </div>
    </div>
  )
}

export default ListProducts
