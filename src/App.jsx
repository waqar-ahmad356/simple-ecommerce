import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Products from './components/products'
import Home from './components/Home'
import ProtectedRoute from './components/ProctectedRoute'
import CreateProduct from './components/CreateProduct'
import Page404 from './components/Page404'
import ListProducts from './components/ListProducts'
import Order from './components/Order'
import Orders from './components/orders'
import OrderList from './components/OrderList'

const App = () => {
  return (
    <>
    <Navbar/> 
    <Routes>
    <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/products' element={<ProtectedRoute requiredRole="buyer"><Products/></ProtectedRoute>}/>
      <Route path="/list-products" element={<ProtectedRoute requiredRole="admin"><ListProducts/></ProtectedRoute>}/>
      <Route path='/create-product' element={<ProtectedRoute requiredRole="admin"><CreateProduct/></ProtectedRoute>}/>
      <Route path='/order-list' element={<ProtectedRoute requiredRole="admin"><OrderList/></ProtectedRoute>}/>
      <Route path='/order/:productId' element={<ProtectedRoute requiredRole="buyer"><Order/></ProtectedRoute>}/>
      <Route path="/orders" element={<ProtectedRoute requiredRole="buyer"><Orders/></ProtectedRoute>}/>
      <Route path='*' element={<Page404/>}/>
    </Routes> 
    </>
  )
}

export default App
