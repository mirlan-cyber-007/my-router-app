const STORAGE_KEY = 'products';

const defaultProducts = [
    {
        id: 1,
        name: 'Продукт 1',
        description: 'Краткое описание продукта 1. Полезный, удобный и эффективный.',
        image: '/images/abri.jpg',
        price: '₽1 200',
        category: 'Орехи',
        sku: '0001'
    },
    {
        id: 2,
        name: 'Продукт 2',
        description: 'Описание продукта 2. Решает задачу бизнеса и пользователей.',
        image: '/images/oreh.jpg',
        price: '₽2 500',
        category: 'Сухофрукты',
        sku: '0002'
    },
    {
        id: 3,
        name: 'Продукт 3',
        description: 'Описание продукта 3. Надёжный, простой в использовании.',
        image: '/images/sliva.jpg',
        price: '₽900',
        category: 'Сухофрукты',
        sku: '0003'
    },
    {
        id: 4,
        name: 'Продукт 4',
        description: 'Краткое описание продукта 4. Полезный, удобный и эффективный.',
        image: '/images/abri.jpg',
        price: '₽1 200',
        category: 'Сувениры',
        sku: '0004'
    }
];

function load() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            // ensure defaultProducts have skus
            ensureSkus(defaultProducts);
            return [...defaultProducts];
        }
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            ensureSkus(defaultProducts);
            return [...defaultProducts];
        }
        // ensure every parsed product has a unique sku; save back if changed
        const fixed = ensureSkus(parsed);
        if (fixed._changed) save(fixed.list);
        return fixed.list;
    } catch (e) {
        console.error('Failed to load products from localStorage', e);
        ensureSkus(defaultProducts);
        return [...defaultProducts];
    }
}

// ensure unique sku values for a list of products
function ensureSkus(list) {
    const used = new Set();
    let changed = false;
    // helper: format number as 4-digit string
    const fmt = n => String(n).padStart(4, '0');
    const findNext = (start = 1) => {
        let n = Number(start) || 1;
        while (used.has(fmt(n))) n++;
        return fmt(n);
    };

    // first, collect existing SKUs
    list.forEach(p => {
        if (p.sku) used.add(String(p.sku).trim());
    });
    // then ensure each product has sku and uniqueness (4 digits)
    list.forEach(p => {
        let candidate = null;
        if (!p.sku || !String(p.sku).trim()) {
            candidate = findNext(p.id || 1);
            p.sku = candidate;
            changed = true;
        } else {
            const base = String(p.sku).trim();
            const digits = base.match(/(\d+)/g);
            if (digits && digits.length) {
                candidate = fmt(Number(digits[digits.length - 1]));
            } else {
                candidate = findNext(p.id || 1);
            }
            // if candidate is already used (by another product), find next free
            if (used.has(candidate)) {
                candidate = findNext(Number(candidate) + 1);
            }
            if (candidate !== p.sku) {
                p.sku = candidate;
                changed = true;
            }
        }
        used.add(String(p.sku));
    });
    return {list, _changed: changed};
}

// helper to produce unique sku given desired and existing list (exclude optional id)
function makeUniqueSku(list, desired, excludeId) {
    const used = new Set(list.filter(p => p.id !== excludeId).map(p => String(p.sku)).filter(Boolean));
    const fmt = n => String(n).padStart(4, '0');
    const findNext = (start = 1) => {
        let n = Number(start) || 1;
        while (used.has(fmt(n))) n++;
        return fmt(n);
    };

    let candidate = null;
    if (desired && String(desired).trim()) {
        const digits = String(desired).match(/(\d+)/g);
        if (digits && digits.length) {
            candidate = fmt(Number(digits[digits.length - 1]));
            if (used.has(candidate)) candidate = findNext(Number(candidate) + 1);
        } else {
            candidate = findNext(1);
        }
    } else {
        candidate = findNext(1);
    }
    return candidate;
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
    const newId = maxId + 1;
    const desiredSku = product.sku && String(product.sku).trim() ? String(product.sku).trim() : `SKU-${newId}`;
    const sku = makeUniqueSku(list, desiredSku);
    const newProduct = {...product, id: newId, sku};
    list.push(newProduct);
    save(list);
    return newProduct;
}

export function updateProduct(updated) {
    const list = load();
    // ensure sku uniqueness among other products
    const sku = makeUniqueSku(list, updated.sku, updated.id);
    const merged = list.map(p => p.id === updated.id ? {...p, ...updated, sku} : p);
    save(merged);
    return {...updated, sku};
}

export function deleteProduct(id) {
    const list = load().filter(p => p.id !== id);
    save(list);
}

export function clearProductsForTests() {
    localStorage.removeItem(STORAGE_KEY);
}
