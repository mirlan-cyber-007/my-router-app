import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {saveAuth} from './authService';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const server = import.meta.env.VITE_AUTH_SERVER || 'http://localhost:4242';
            const resp = await fetch(server + '/login', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email, password})});
            if (!resp.ok) return setErr('Неверные учётные данные');
            const data = await resp.json();
            saveAuth(data);
            navigate('/');
        } catch (e) {setErr('Ошибка входа');}
    };

    return (
        <div className="auth-page">
            <h2>Вход</h2>
            <form onSubmit={submit} style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                <input required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input required placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <div style={{color: 'red'}}>{err}</div>
                <div style={{display: 'flex', gap: 8}}>
                    <button className="btn btn-primary" type="submit">Войти</button>
                </div>
                <div style={{textAlign: 'center', marginTop: 8}} className="muted">Нет аккаунта? <a href="/register">Зарегистрироваться</a></div>
            </form>
        </div>
    );
}
