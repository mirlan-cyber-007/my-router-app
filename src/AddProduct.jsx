import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: ""
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    alert("Новый товар добавлен (только в памяти)");
    navigate("/admin/dashboard");
  };

  return (
    <div>
      <h2>Добавить товар</h2>
      <input name="name" placeholder="Название" onChange={handleChange} />
      <input name="price" placeholder="Цена" onChange={handleChange} />
      <input name="image" placeholder="URL картинки" onChange={handleChange} />
      <textarea name="description" placeholder="Описание" onChange={handleChange} />
      <button onClick={handleAdd}>Добавить</button>
    </div>
  );
}
