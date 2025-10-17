import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productsData from "./Products.jsx";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div>
      <h2>Панель администратора</h2>
      <Link to="/admin/add">Добавить товар</Link>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} — ₽{p.price}
            <Link to={`/admin/edit/${p.id}`}> ✏️</Link>
            <button onClick={() => handleDelete(p.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
