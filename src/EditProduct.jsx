import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProducts, updateProduct} from "./productsService";
import "./admin.css";

const IMAGES = [
  "none",
  "abri.jpg",
  "logo.jpeg",
  "man.jpg",
  "oreh.jpg",
  "sliva.jpg",
  "woman.jpg",
  "woman1.jpg",
  "woman2.jpg",
  "woman3.jpg",
  "woman4.jpg",
];

export default function EditProduct() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const p = getProducts().find(p => p.id === Number(id));
    setProduct(p);
  }, [id]);

  const handleChange = (e) => {
    setProduct({...product, [e.target.name]: e.target.value});
  };

  const handleSave = () => {
    const payload = {
      ...product,
      image: product.image && product.image.includes('/images/') ? product.image : (product.image && product.image !== 'none' ? `/images/${product.image}` : '')
    };
    updateProduct(payload);
    navigate("/admin/dashboard");
  };

  if (!product) return <p>Загрузка...</p>;

  return (
    <div className="admin-add-form">
      <h2>Редактировать: {product.name}</h2>
      <label>Название</label>
      <input name="name" value={product.name} onChange={handleChange} />
      <label>Цена</label>
      <input name="price" value={product.price} onChange={handleChange} />
      <label>Картинка</label>
      <select name="image" value={product.image && product.image.includes('/images/') ? product.image.split('/').pop() : (product.image || 'none')} onChange={handleChange}>
        {IMAGES.map(img => (
          <option key={img} value={img}>{img}</option>
        ))}
      </select>
      <label>Описание</label>
      <textarea name="description" value={product.description} onChange={handleChange} />
      <div className="admin-actions">
        <button onClick={handleSave}>Сохранить</button>
      </div>
    </div>
  );
}
