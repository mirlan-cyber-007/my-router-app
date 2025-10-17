import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("adminToken", "123");
    navigate("/admin/dashboard");
  };

  return (
    <div>
      <h2>Вход в админ-панель</h2>
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
}
