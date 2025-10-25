import React from 'react';
import {getOrdersByUser} from './ordersService';

export default function OrderHistory() {
    const orders = getOrdersByUser();
    return (
        <div className="page-content">
            <h2>Мои заказы</h2>
            {orders.length === 0 ? (
                <p>У вас пока нет заказов.</p>
            ) : (
                <div style={{maxWidth: 900, margin: '0 auto', textAlign: 'left'}}>
                    {orders.map(o => (
                        <div key={o.id} style={{padding: 12, border: '1px solid #eee', borderRadius: 8, marginBottom: 12}}>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div>Заказ #{o.id}</div>
                                <div>{new Date(o.createdAt).toLocaleString()}</div>
                            </div>
                            <div style={{marginTop: 8}}>
                                {o.items && o.items.map(it => <div key={it.sku}>{it.name} × {it.qty} <span style={{color: '#666', marginLeft: 8}}>{it.sku}</span></div>)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
