const CART_KEY = 'cart_items';

function load() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch (e) {console.error('load cart', e); return [];}
}

function save(list) {
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(list));
        window.dispatchEvent(new Event('cartUpdated'));
    } catch (e) {console.error('save cart', e);}
}

export function getCart() {return load();}

export function addItem(product, qty = 1) {
    const list = load();
    const existing = list.find(i => i.productId === product.id);
    if (existing) {existing.qty += qty;}
    else {
        list.push({productId: product.id, qty, name: product.name, price: product.price, sku: product.sku, image: product.image});
    }
    save(list);
    return list;
}

export function updateQty(productId, qty) {
    const list = load().map(i => i.productId === productId ? {...i, qty} : i).filter(i => i.qty > 0);
    save(list);
    return list;
}

export function removeItem(productId) {
    const list = load().filter(i => i.productId !== productId);
    save(list);
    return list;
}

export function clearCart() {
    save([]);
}

export function getCartTotal() {
    const list = load();
    return list.reduce((s, i) => s + (Number(String(i.price || '').replace(/[^0-9]/g, '')) || 0) * (i.qty || 1), 0);
}
