import React, {useEffect, useState} from 'react';
import './index.css';
import {getProducts} from './productsService';
import {addItem} from './cartService';
import {getCategories} from './categoriesService';

function parsePrice(priceStr) {
  if (!priceStr) return 0;
  const digits = priceStr.replace(/[^0-9]/g, '');
  return Number(digits) || 0;
}

function ProductsPage() {
  const [productsList, setProductsList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]); // multi-select
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    const list = getProducts();
    setProductsList(list);
    // merge categories from service and from products to ensure all available
    const svc = getCategories();
    const fromProducts = Array.from(new Set(list.map(p => p.category).filter(Boolean)));
    const merged = Array.from(new Set([...(svc || []), ...fromProducts]));
    setCategories(merged);
  }, []);

  const toggleCategory = (cat) => {
    setSelectedCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const filtered = productsList
    .filter(p => {
      if (selectedCats.length > 0) return selectedCats.includes(p.category);
      return true;
    })
    .filter(p => {
      if (!search) return true;
      const s = search.toLowerCase();
      return (p.name || '').toLowerCase().includes(s) || (p.description || '').toLowerCase().includes(s);
    })
    .sort((a, b) => {
      if (sort === 'alpha-asc') return (a.name || '').localeCompare(b.name || '');
      if (sort === 'alpha-desc') return (b.name || '').localeCompare(a.name || '');
      if (sort === 'price-asc') return parsePrice(a.price) - parsePrice(b.price);
      if (sort === 'price-desc') return parsePrice(b.price) - parsePrice(a.price);
      return 0;
    });

  // simple emoji map for categories
  const emoji = {'Орехи': '🥜', 'Сухофрукты': '🍇', 'Сувениры': '🎁'};

  return (
    <div className="products-page">
      <header className="products-header">
        <h1>Наши продукты</h1>
        <p>Ознакомьтесь с нашими предложениями. Качество гарантировано.</p>
      </header>

      <div className="products-controls">
        <div style={{marginBottom: 12}}>
          <input className="search-input" placeholder="Поиск по названию или описанию" value={search} onChange={e => setSearch(e.target.value)} />
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="default">По умолчанию</option>
            <option value="alpha-asc">По имени A→Z</option>
            <option value="alpha-desc">По имени Z→A</option>
            <option value="price-asc">По цене ↑</option>
            <option value="price-desc">По цене ↓</option>
          </select>
        </div>

        <div className="category-checkboxes">
          {categories.map(cat => (
            <label key={cat} className={`cat-checkbox ${selectedCats.includes(cat) ? 'checked' : ''}`}>
              <input type="checkbox" checked={selectedCats.includes(cat)} onChange={() => toggleCategory(cat)} />
              <span className="cat-emoji">{emoji[cat] || '🏷️'}</span>
              <span className="cat-name">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <section className="products-list">
        {filtered.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name} <small style={{color: '#666', marginLeft: 8}}>{product.sku}</small></h3>
            <div className="product-category">{emoji[product.category] || '🏷️'} {product.category}</div>
            <p>{product.description}</p>
            <span className="price">{product.price}</span>
            <div style={{display: 'flex', gap: 8}}>
              <button onClick={() => addItem(product, 1)}>Добавить в корзину</button>
              <button>Подробнее</button>
            </div>
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
