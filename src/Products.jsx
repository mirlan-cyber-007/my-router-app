import React, {useEffect, useState} from 'react';
import './index.css';
import {getProducts} from './productsService';

function ProductsPage() {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    setProductsList(getProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="products-page">
      <header className="products-header">
        <h1>Наши продукты</h1>
        <p>Ознакомьтесь с нашими предложениями. Качество гарантировано.</p>
      </header>

      <section className="products-list">
        {productsList.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span className="price">{product.price}</span>
            <button>Подробнее</button>
          </div>
        ))}
      </section>

      <footer className="footer">
        <p>© 2025 МояКомпания. Все права защищены.</p>
      </footer>
    </div>
  );
}

export default ProductsPage;
