import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProducts, updateProduct} from "./productsService";
import "./admin.css";

const IMAGES = [
  "none",
  "abri.jpg",
  "oreh.jpg",
  "sliva.jpg",
];

export default function EditProduct() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [imageCustom, setImageCustom] = useState("");

  useEffect(() => {
    const p = getProducts().find(p => p.id === Number(id));
    setProduct(p);
  }, [id]);

  const handleChange = (e) => {
    setProduct({...product, [e.target.name]: e.target.value});
  };

  const handleSave = () => {
    const chosen = product.image === 'other' ? imageCustom : product.image;
    const payload = {
      ...product,
      image: chosen && chosen !== 'none' ? (chosen.includes('/images/') ? chosen : `/images/${chosen}`) : ''
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
      <select name="image" value={product.image && product.image.includes('/images/') ? product.image.split('/').pop() : (product.image || 'none')} onChange={(e) => {
        // when selecting 'other' we keep product.image === 'other' so input appears
        const v = e.target.value;
        setProduct({...product, image: v});
      }}>
        {IMAGES.map(img => (
          <option key={img} value={img}>{img}</option>
        ))}
        <option value="other">Другая (ввести имя файла)</option>
      </select>
      {product.image === 'other' && (
        <input placeholder="example.jpg" value={imageCustom} onChange={e => setImageCustom(e.target.value)} />
      )}
      <label>Описание</label>
      <textarea name="description" value={product.description} onChange={handleChange} />
      <div className="admin-actions">
        <button onClick={handleSave}>Сохранить</button>
      </div>
    </div>
  );
}
