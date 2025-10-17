import React from 'react';
import './index.css';

function ContactPage() {
  return (
    <div className="contact-page">
      <header className="contact-header">
        <h1>Свяжитесь с нами</h1>
        <p>У вас есть вопросы или предложения? Мы всегда готовы помочь!</p>
      </header>

      <section className="contact-info">
        <div className="info-block">
          <h3>📞 Телефон</h3>
          <p>+996 707 015 205</p>
        </div>
        <div className="info-block">
          <h3>📧 Email</h3>
          <p>batkenbio.ru</p>
        </div>
        <div className="info-block">
          <h3>📍 Адрес</h3>
          <p>г. Бишкек, ул.Горький 97</p>
        </div>
      </section>

      <section className="contact-form-section">
        <h2>Форма обратной связи</h2>
        <form className="contact-form">
          <input type="text" placeholder="Ваше имя" required />
          <input type="email" placeholder="Ваш Email" required />
          <textarea placeholder="Ваше сообщение" rows="5" required></textarea>
          <button type="submit">Отправить</button>
        </form>
      </section>

      <footer className="footer">
        <p>© 2025 МояКомпания. Все права защищены.</p>
      </footer>
    </div>
  );
}

export default ContactPage;
