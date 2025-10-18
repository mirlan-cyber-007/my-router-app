const STORAGE_KEY = 'products';

const defaultProducts = [
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
        description: 'Описание продукта 2. Решает задачу бизнеса и пользователей.',
        image: '/images/oreh.jpg',
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
        description: 'Краткое описание продукта 4. Полезный, удобный и эффективный.',
        image: '/images/abri.jpg',
        price: '₽1 200'
    }
];

function load() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [...defaultProducts];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [...defaultProducts];
        return parsed;
    } catch (e) {
        console.error('Failed to load products from localStorage', e);
        return [...defaultProducts];
    }
}

function save(list) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
        console.error('Failed to save products to localStorage', e);
    }
}

export function getProducts() {
    return load();
}

export function addProduct(product) {
    const list = load();
    const maxId = list.reduce((m, p) => Math.max(m, p.id || 0), 0);
    const newProduct = {...product, id: maxId + 1};
    list.push(newProduct);
    save(list);
    return newProduct;
}

export function updateProduct(updated) {
    const list = load().map(p => (p.id === updated.id ? {...p, ...updated} : p));
    save(list);
    return updated;
}

export function deleteProduct(id) {
    const list = load().filter(p => p.id !== id);
    save(list);
}

export function clearProductsForTests() {
    localStorage.removeItem(STORAGE_KEY);
}
