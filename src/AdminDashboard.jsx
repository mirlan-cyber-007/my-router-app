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
    <div className="admin-dashboard container">
      <div className="admin-header">
        <h2>Панель администратора</h2>
        <div style={{display: 'flex', gap: 8}}>
          <Link to="/admin/add" className="admin-btn">Добавить товар</Link>
          <Link to="/admin/categories" className="admin-btn" style={{background: '#6c757d'}}>Категории</Link>
        </div>
      </div>

      <div className="admin-grid">
        {items.map(p => (
          <div className="admin-card" key={p.id}>
            <div className="admin-card-img">
              {p.image ? <img src={p.image} alt={p.name} /> : <div className="no-img">No image</div>}
            </div>
            <div className="admin-card-body">
              <h3 className="admin-card-title">{p.name} <small style={{color: '#666', marginLeft: 8}}>{p.sku}</small></h3>
              <div className="admin-card-price">{p.price}</div>
              <div className="admin-card-actions">
                <Link to={`/admin/edit/${p.id}`} className="admin-action">✏️ Edit</Link>
                <button className="admin-action danger" onClick={() => handleDelete(p.id)}>🗑️ Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
