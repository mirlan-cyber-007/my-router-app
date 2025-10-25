const AUTH_KEY = 'auth_info';

export function saveAuth({token, user}) {
    try {localStorage.setItem(AUTH_KEY, JSON.stringify({token, user}));} catch (e) { }
}

export function clearAuth() {try {localStorage.removeItem(AUTH_KEY);} catch (e) { } }

export function getAuth() {try {const raw = localStorage.getItem(AUTH_KEY); return raw ? JSON.parse(raw) : null;} catch (e) {return null} }

export function getToken() {const a = getAuth(); return a && a.token;}

export function getUser() {const a = getAuth(); return a && a.user;}

export async function fetchMe(server) {
    const token = getToken();
    if (!token) return null;
    try {
        const resp = await fetch((server || '') + '/me', {headers: {Authorization: 'Bearer ' + token}});
        if (!resp.ok) return null;
        return await resp.json();
    } catch (e) {return null;}
}
