import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {addProduct} from "./productsService";
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

export default function AddProduct() {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: ""
  });

  const handleChange = (e) => {
    setNewProduct({...newProduct, [e.target.name]: e.target.value});
  };

  const handleAdd = () => {
    const payload = {
      ...newProduct,
      image: newProduct.image && newProduct.image !== "none" ? `/images/${newProduct.image}` : ""
    };
    addProduct(payload);
    navigate("/admin/dashboard");
  };

  return (
    <div className="admin-add-form">
      <h2>Добавить товар</h2>
      <label>Название</label>
      <input name="name" placeholder="Название" onChange={handleChange} />
      <label>Цена</label>
      <input name="price" placeholder="Цена" onChange={handleChange} />
      <label>Картинка</label>
      <select name="image" value={newProduct.image} onChange={handleChange}>
        {IMAGES.map(img => (
          <option key={img} value={img}>{img}</option>
        ))}
      </select>
      <label>Описание</label>
      <textarea name="description" placeholder="Описание" onChange={handleChange} />
      <div className="admin-actions">
        <button onClick={handleAdd}>Добавить</button>
      </div>
    </div>
  );
}
