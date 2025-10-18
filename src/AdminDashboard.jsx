import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {getProducts, deleteProduct} from "./productsService";

export default function AdminDashboard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getProducts());
  }, []);

  const handleDelete = (id) => {
    deleteProduct(id);
    setItems(getProducts());
  };

  return (
    <div>
      <h2>Панель администратора</h2>
      <Link to="/admin/add">Добавить товар</Link>
      <ul>
        {items.map(p => (
          <li key={p.id}>
            {p.name} — {p.price}
            <Link to={`/admin/edit/${p.id}`}> ✏️</Link>
            <button onClick={() => handleDelete(p.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
