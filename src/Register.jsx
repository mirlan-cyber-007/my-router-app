import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {saveAuth} from './authService';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const server = import.meta.env.VITE_AUTH_SERVER || 'http://localhost:4242';
            const resp = await fetch(server + '/register', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email, password, name})});
            if (!resp.ok) return setErr('Ошибка регистрации');
            const data = await resp.json();
            saveAuth(data);
            navigate('/');
        } catch (e) {setErr('Ошибка сети');}
    };

    return (
        <div className="auth-page">
            <h2>Регистрация</h2>
            <form onSubmit={submit} style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                <input required placeholder="Имя" value={name} onChange={e => setName(e.target.value)} />
                <input required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input required placeholder="Пароль" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <div style={{color: 'red'}}>{err}</div>
                <div style={{display: 'flex', gap: 8}}>
                    <button className="btn btn-primary" type="submit">Зарегистрироваться</button>
                </div>
                <div style={{textAlign: 'center', marginTop: 8}} className="muted">Уже есть аккаунт? <a href="/login">Войти</a></div>
            </form>
        </div>
    );
}
