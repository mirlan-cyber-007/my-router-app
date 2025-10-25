import {useEffect, useState} from 'react';
import {getCart, updateQty, removeItem, clearCart, getCartTotal} from './cartService';
import {Link, useNavigate} from 'react-router-dom';

export default function Cart() {
    const [items, setItems] = useState(getCart());
    const [total, setTotal] = useState(getCartTotal());
    const navigate = useNavigate();

    useEffect(() => {
        const onUpdate = () => {setItems(getCart()); setTotal(getCartTotal());};
        window.addEventListener('cartUpdated', onUpdate);
        return () => window.removeEventListener('cartUpdated', onUpdate);
    }, []);

    const changeQty = (id, qty) => {updateQty(id, Number(qty)); setItems(getCart()); setTotal(getCartTotal());};
    const del = (id) => {removeItem(id); setItems(getCart()); setTotal(getCartTotal());};

    if (items.length === 0) return (
        <div className="cart-page empty">
            <h2>Корзина пуста</h2>
            <Link to="/products" className="btn btn-primary">Перейти к продуктам</Link>
        </div>
    );

    return (
        <div className="cart-page">
            <h2>Корзина</h2>

            <div className="cart-list">
                {items.map(i => (
                    <div className="cart-card" key={i.productId}>
                        <div className="cart-card-image">
                            {i.image ? <img src={i.image} alt={i.name} /> : <div className="no-image">No image</div>}
                        </div>
                        <div className="cart-card-body">
                            <div className="cart-card-title">{i.name} <small className="sku">{i.sku}</small></div>
                            <div className="cart-card-meta">{i.price} • <span className="muted">Артикул: {i.sku}</span></div>
                            <div className="cart-card-controls">
                                <input className="qty-input" type="number" value={i.qty} min={1} onChange={e => changeQty(i.productId, e.target.value)} />
                                <div className="card-actions">
                                    <button className="btn btn-secondary" onClick={() => del(i.productId)}>Удалить</button>
                                </div>
                            </div>
                        </div>
                        <div className="cart-card-price">{((Number(String(i.price || '').replace(/[^0-9]/g, '')) || 0) * i.qty).toLocaleString('ru-RU')} ₽</div>
                    </div>
                ))}
            </div>

            <div className="cart-footer">
                <div className="cart-total">Итого: <strong>{total.toLocaleString('ru-RU')} ₽</strong></div>
                <div className="cart-actions">
                    <button className="btn btn-danger" onClick={() => {clearCart(); setItems([]); setTotal(0);}}>Очистить</button>
                    <button className="btn btn-primary" onClick={() => navigate('/checkout')}>Оформить заказ</button>
                </div>
            </div>
        </div>
    );
}
