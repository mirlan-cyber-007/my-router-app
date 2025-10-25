import {useEffect, useState} from 'react';
import {getOrders} from './ordersService';
import {useParams, Link} from 'react-router-dom';

export default function OrderSuccess() {
    const {id} = useParams();
    const [order, setOrder] = useState(null);
    useEffect(() => {
        const o = getOrders().find(x => String(x.id) === String(id));
        setOrder(o);
    }, [id]);

    if (!order) return <div style={{padding: 20}}>Заказ не найден</div>;
    return (
        <div className="order-success">
            <h2>Спасибo! Заказ #{order.id} принят {order.paid ? <span style={{color: '#2a7a2a'}}>(Оплачен)</span> : <span style={{color: '#856404'}}>(Ожидает оплаты)</span>}</h2>
            <p>Сумма: {order.total} ₽</p>
            <p>Имя: {order.buyer?.name}</p>
            <p>Телефон: {order.buyer?.phone}</p>
            <p>Адрес: {order.buyer?.address}</p>
            {order.buyer?.coords && (
                <p>Координаты: {order.buyer.coords.lat}, {order.buyer.coords.lng} — <a href={`https://www.openstreetmap.org/?mlat=${order.buyer.coords.lat}&mlon=${order.buyer.coords.lng}#map=18/${order.buyer.coords.lat}/${order.buyer.coords.lng}`} target="_blank" rel="noreferrer">Открыть на карте</a></p>
            )}
            <Link to="/">Вернуться на главную</Link>
        </div>
    );
}
