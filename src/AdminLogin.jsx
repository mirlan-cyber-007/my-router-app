import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./admin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (login === "admin" && password === "admin") {
      localStorage.setItem("adminToken", "123");
      setError("");
      navigate("/admin/dashboard");
    } else {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="admin-login">
      <form className="admin-form" onSubmit={handleLogin}>
        <h2>Вход в админ-панель</h2>
        {error && <div className="admin-error">{error}</div>}
        <input
          className="admin-input"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          className="admin-input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="admin-btn" type="submit">Войти</button>
      </form>
    </div>
  );
}
