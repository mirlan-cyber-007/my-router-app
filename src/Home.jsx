import React from 'react';
import './index.css';

function HomePage() {
  return (
    <div className="homepage">
      <header className="hero">
        <h1>Добро пожаловать на наш сайт!</h1>
        <p>Мы рады видеть вас здесь. Изучите наши продукты и услуги.</p>
        <a href="/about" className="cta-button">Узнать больше</a>
      </header>

      <section id="about" className="about-section">
        <h2>О нас</h2>
        <p>
          БиоНур — производитель натуральных сухофруктов без добавок и консервантов. Мы отбираем лучшие фрукты, бережно сушим их и сохраняем максимум вкуса и пользы. Наша цель — сделать здоровое питание простым и доступным для каждого.
        </p>
      </section>

      <footer className="footer">
        <p>© 2025 МояКомпания. Все права защищены.</p>
      </footer>
    </div>
  );
}

export default HomePage;
