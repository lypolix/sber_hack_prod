import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="misis-home-bg">
      <div className="misis-home-container">
        <h1 className="misis-title-gradient">
          Добро пожаловать в CoHUB!
        </h1>
        <p className="misis-desc">
        Бронируй места в коворкинге, следи за событиями и пользуйся ресурсами кампуса в одном удобном сервисе.<br />
          Зарегистрируйся и начни прямо сейчас!<br />
          <span className="misis-byline">Сreated for hackathon.</span>
        </p>
        <div className="misis-btn-row">
          <button className="misis-btn" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="misis-btn" onClick={() => navigate('/register')}>
            Register
          </button>
        </div>
        <div className="misis-contact">
          ✉️ <a href="https://github.com/lypolix/sber_hack_prod">https://github.com/lypolix/sber_hack_prod</a>
          <br />
          <span style={{ fontSize: '1.25rem', marginTop: '0.6rem' }}></span>
        </div>
      </div>
    </div>
  );
}

export default Home;
