import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {addProduct} from "./productsService";
import "./admin.css";
import {getCategories} from "./categoriesService";
import {useEffect} from "react";

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
    image: "",
    category: "Орехи"
  });

  const [cats, setCats] = useState([]);

  useEffect(() => {
    setCats(getCategories());
  }, []);

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
      <label>Артикул (SKU)</label>
      <input name="sku" placeholder="0001" onChange={handleChange} />
      <label>Цена</label>
      <input name="price" placeholder="Цена" onChange={handleChange} />
      <label>Картинка</label>
      <select name="image" value={newProduct.image} onChange={handleChange}>
        {IMAGES.map(img => (
          <option key={img} value={img}>{img}</option>
        ))}
        <option value="other">Другая (ввести имя файла)</option>
      </select>
      <label>Категория</label>
      <select name="category" value={newProduct.category} onChange={handleChange}>
        {cats.map(c => <option key={c}>{c}</option>)}
      </select>
      {newProduct.image === 'other' && (
        <input name="imageCustom" placeholder="example.jpg" onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} />
      )}
      <label>Описание</label>
      <textarea name="description" placeholder="Описание" onChange={handleChange} />
      <div className="admin-actions">
        <button onClick={handleAdd}>Добавить</button>
      </div>
    </div>
  );
}
