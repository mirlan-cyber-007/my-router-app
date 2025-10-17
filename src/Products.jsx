import React from 'react';
import './index.css';

function ProductsPage() {
  const products = [
    {
      id: 1,
      name: 'Продукт 1',
      description: 'Краткое описание продукта 1. Полезный, удобный и эффективный.',
      image: '/images/abri.jpg',
      price: '₽1 200'
    },
    {
      id: 2,
      name: 'Продукт 2',
      description: 'Описание продукта 2. Решает задачи бизнеса и пользователей.',
      image: 'images/oreh.jpg',
      price: '₽2 500'
    },
    {
      id: 3,
      name: 'Продукт 3',
      description: 'Описание продукта 3. Надёжный, простой в использовании.',
      image: '/images/sliva.jpg',
      price: '₽900'
    },
    {
      id: 4,
      name: 'Продукт 4',
      description: 'Краткое описание продукта 1. Полезный, удобный и эффективный.',
      image: '/images/abri.jpg',
      price: '₽1 200'
    }
  ];

  return (
    <div className="products-page">
      <header className="products-header">
        <h1>Наши продукты</h1>
        <p>Ознакомьтесь с нашими предложениями. Качество гарантировано.</p>
      </header>

      <section className="products-list">
        {products.map(product => (
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
