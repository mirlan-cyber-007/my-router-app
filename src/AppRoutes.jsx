import {Routes, Route} from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Products from "./Products";

import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import CategoryManagement from "./CategoryManagement";
import ProtectedRoute from "./ProtectedRoute";

import Cart from "./Cart";
import Checkout from "./Checkout";
import OrderSuccess from "./OrderSuccess";
import OrdersManagement from "./OrdersManagement";
import Login from './Login';
import Register from './Register';
import UserProtectedRoute from './UserProtectedRoute';
import Profile from './Profile';
import OrderHistory from './OrderHistory';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<Products />} />

      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<UserProtectedRoute><Checkout /></UserProtectedRoute>} />
      <Route path="/order-success/:id" element={<OrderSuccess />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/order-history" element={<UserProtectedRoute><OrderHistory /></UserProtectedRoute>} />

      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/edit/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
      <Route path="/admin/add" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
      <Route path="/admin/categories" element={<ProtectedRoute><CategoryManagement /></ProtectedRoute>} />
      <Route path="/admin/orders" element={<ProtectedRoute><OrdersManagement /></ProtectedRoute>} />
    </Routes>
  );
}
