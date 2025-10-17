import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Products from "./Products";

import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<Products />} />

      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/edit/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
      <Route path="/admin/add" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
    </Routes>
  );
}
