const KEY = 'categories';

const defaultCats = ['Орехи', 'Сухофрукты', 'Сувениры'];

function load() {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return [...defaultCats];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [...defaultCats];
        return parsed;
    } catch (e) {
        console.error('load categories', e);
        return [...defaultCats];
    }
}

function save(list) {
    try {localStorage.setItem(KEY, JSON.stringify(list));} catch (e) {console.error('save categories', e);}
}

export function getCategories() {return load();}

export function addCategory(name) {
    const list = load();
    if (list.includes(name)) return list;
    list.push(name);
    save(list);
    return list;
}

export function updateCategory(oldName, newName) {
    const list = load().map(c => c === oldName ? newName : c);
    save(list);
    return list;
}

export function deleteCategory(name) {
    const list = load().filter(c => c !== name);
    save(list);
    return list;
}

export function clearCategoriesForTests() {localStorage.removeItem(KEY);}
