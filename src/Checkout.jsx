import {useState} from 'react';
import {getCart, clearCart, getCartTotal} from './cartService';
import {addOrder, updateOrder} from './ordersService';
import {useNavigate} from 'react-router-dom';

export default function Checkout() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const [coords, setCoords] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const items = getCart();
        if (!items || items.length === 0) return alert('Корзина пуста');
        const total = getCartTotal();
        // create order first (so we have order.id) then try to start payment
        const order = addOrder({buyer: {name, phone, address, coords: coords || null}, items, total});

        // Помечаем заказ как оплачен локально
        try {
            if (updateOrder) updateOrder({...order, paid: true});
        } catch (err) {console.warn('local mark paid failed', err);}

        clearCart();
        navigate(`/order-success/${order.id}`);
    };

    const useMyLocation = () => {
        if (!navigator.geolocation) return alert('Геолокация не поддерживается в этом браузере');
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const {latitude, longitude} = pos.coords;
            setCoords({lat: latitude, lng: longitude});
            // reverse geocode via Nominatim
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
                const data = await res.json();
                if (data && data.display_name) setAddress(data.display_name);
            } catch (e) {console.error('geocode', e);}
        }, (err) => {
            alert('Не удалось получить местоположение: ' + err.message);
        });
    };

    return (
        <div className="checkout-page">
            <h2>Оформление заказа</h2>
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                <input className="checkout-input" required placeholder="Имя" value={name} onChange={e => setName(e.target.value)} />
                <input className="checkout-input" required placeholder="Телефон" value={phone} onChange={e => setPhone(e.target.value)} />
                <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
                    <input className="checkout-input" required placeholder="Адрес" value={address} onChange={e => setAddress(e.target.value)} />
                    <button type="button" onClick={useMyLocation} style={{padding: '8px 10px'}}>Использовать моё местоположение</button>
                </div>
                <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end'}}>
                    <button type="submit">Подтвердить заказ и оплатить (симуляция)</button>
                </div>
            </form>
        </div>
    );
}
