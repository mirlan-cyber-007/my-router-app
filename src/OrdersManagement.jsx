import {useEffect, useState} from 'react';
import {getOrders, updateOrder} from './ordersService';

export default function OrdersManagement() {
    const [orders, setOrders] = useState([]);
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [expandedMap, setExpandedMap] = useState(null); // order id to show map

    useEffect(() => setOrders(getOrders()), []);

    const changeStatus = (id, status) => {
        updateOrder({id, status});
        setOrders(getOrders());
    };

    const visible = orders.filter(o => {
        if (statusFilter !== 'all' && o.status !== statusFilter) return false;
        if (!query) return true;
        const q = String(query).toLowerCase();
        return String(o.id).includes(q) || (o.buyer?.name || '').toLowerCase().includes(q) || (o.buyer?.phone || '').toLowerCase().includes(q);
    });

    return (
        <div className="admin-dashboard container">
            <h2>Заказы</h2>

            <div style={{display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center'}}>
                <input placeholder="Поиск по ID, имени или телефону" value={query} onChange={e => setQuery(e.target.value)} style={{padding: 8, borderRadius: 6, border: '1px solid #ddd', flex: 1}} />
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{padding: 8, borderRadius: 6}}>
                    <option value="all">Все статусы</option>
                    <option value="new">Новые</option>
                    <option value="processing">В работе</option>
                    <option value="done">Выполнен</option>
                    <option value="cancelled">Отменён</option>
                </select>
            </div>

            <table className="orders-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Клиент</th>
                        <th>Товары</th>
                        <th>Сумма</th>
                        <th>Дата</th>
                        <th>Координаты</th>
                        <th>Статус</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {visible.map(o => (
                        <>
                            <tr key={o.id}>
                                <td>{o.id}</td>
                                <td>{o.buyer?.name}<br />{o.buyer?.phone}</td>
                                <td>
                                    {o.items?.map(it => (
                                        <div key={it.productId} style={{fontSize: 13}}>
                                            {it.name} × {it.qty} <small style={{color: '#666', marginLeft: 6}}>{it.sku}</small>
                                        </div>
                                    ))}
                                </td>
                                <td>{o.total}</td>
                                <td>{o.createdAt}</td>
                                <td>{o.buyer?.coords ? <a href="#" onClick={(e) => {e.preventDefault(); setExpandedMap(expandedMap === o.id ? null : o.id);}}>{o.buyer.coords.lat.toFixed(5)}, {o.buyer.coords.lng.toFixed(5)}</a> : '-'}</td>
                                <td><span className={`orders-badge ${o.status}`}>{o.status}</span></td>
                                <td className="admin-orders-actions">
                                    <button onClick={() => changeStatus(o.id, 'processing')}>В работе</button>
                                    <button onClick={() => changeStatus(o.id, 'done')}>Выполнен</button>
                                    <button onClick={() => changeStatus(o.id, 'cancelled')}>Отменён</button>
                                </td>
                            </tr>
                            {expandedMap === o.id && o.buyer?.coords && (
                                <tr key={o.id + "-map"}>
                                    <td colSpan={7} style={{padding: 0}}>
                                        <div className="order-map-wrap">
                                            <iframe
                                                title={`map-${o.id}`}
                                                src={`https://www.openstreetmap.org/export/embed.html?bbox=${o.buyer.coords.lng - 0.01}%2C${o.buyer.coords.lat - 0.01}%2C${o.buyer.coords.lng + 0.01}%2C${o.buyer.coords.lat + 0.01}&layer=mapnik&marker=${o.buyer.coords.lat}%2C${o.buyer.coords.lng}`}
                                                style={{border: 0, width: '100%', height: 280}}
                                            ></iframe>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
