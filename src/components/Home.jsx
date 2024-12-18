import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ContextApi } from '../Context_API/Context';

const Home = () => {
  const [products,setProducts]=useState([]);
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(true)
const {apiUrl}=useContext(ContextApi)
  const fetchingProducts=async()=>{
    try {
      const response=await axios.get(`${apiUrl}/api/product/list`,{
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
    
      setProducts(response.data.products)
      setLoading(false)
      console.log(response.data)
      
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch Products.");
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
    <div className='d-flex flex-row gap-10 pt-10'>
    <h2 className='text-center underline text-[34px] sm:text-[44px] md:text-[72px] text-[#0b0a2e]'>Products</h2>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 px-[16px] sm:px-[40px] md:px-[60px] lg:px-[80px]'>
      {products.map((prod,index)=>{
       return (
        <>
        <div className='py-8 px-8 bg-[#fff] shadow-md  rounded-lg flex flex-col gap-3 items-start'>
        <img src={apiUrl+"/images/"+ prod.image}  alt='img'/>
        <h3 className='font-bold' >{prod.name}</h3>
        <p>{prod.description}</p>
        <span className='font-bold'>Price: {prod.price}</span>
        <Link to={`/order/${prod._id}`} className='py-3 px-6 bg-black text-white text-[16px]' >Buy</Link>
        </div>
       </>
       ) 
      })}
    </div>

    </div>
  )
}

export default Home
