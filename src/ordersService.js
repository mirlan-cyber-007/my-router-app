const ORD_KEY = 'orders_list';

function load() {
    try {const raw = localStorage.getItem(ORD_KEY); return raw ? JSON.parse(raw) : [];} catch (e) {console.error('load orders', e); return [];}
}

function save(list) {try {localStorage.setItem(ORD_KEY, JSON.stringify(list));} catch (e) {console.error('save orders', e);} }

import {getUser} from './authService';

export function getOrders() {return load();}

export function getOrdersByUser() {
    const user = getUser();
    if (!user) return [];
    return load().filter(o => String(o.userId) === String(user.id));
}

export function addOrder(order) {
    const list = load();
    const id = (list.reduce((m, o) => Math.max(m, o.id || 0), 0) || 0) + 1;
    const user = getUser();
    const created = {...order, id, createdAt: new Date().toISOString(), status: 'new', userId: user?.id || null, userEmail: user?.email || ''};
    list.push(created);
    save(list);
    return created;
}

export function updateOrder(updated) {
    const list = load().map(o => o.id === updated.id ? {...o, ...updated} : o);
    save(list);
    return updated;
}

export function clearOrders() {localStorage.removeItem(ORD_KEY);}
