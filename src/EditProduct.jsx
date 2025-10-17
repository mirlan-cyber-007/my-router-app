import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import productsData from "./Products.jsx";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const p = productsData.find(p => p.id === Number(id));
    setProduct(p);
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Изменения сохранены (в реальности ты бы отправил запрос на backend)");
    navigate("/admin/dashboard");
  };

  if (!product) return <p>Загрузка...</p>;

  return (
    <div>
      <h2>Редактировать: {product.name}</h2>
      <input name="name" value={product.name} onChange={handleChange} />
      <input name="price" value={product.price} onChange={handleChange} />
      <textarea name="description" value={product.description} onChange={handleChange} />
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
}
