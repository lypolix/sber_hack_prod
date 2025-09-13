import React, { useState } from 'react';
import './App.css';

export default function Donations() {
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const num = Number(amount);
    if (isNaN(num) || num <= 0) {
      setError('Введите корректную сумму.');
      setSuccess('');
      return;
    }
    setSuccess('Спасибо за вашу поддержку!');
    setError('');
    setAmount('');
    // Тут вызов API на донат, если потребуется
  }

  return (
    <div className="donations-page" style={{
      maxWidth: 430,
      margin: '55px auto 0',
      background: 'rgba(32, 35, 54, 0.96)',
      borderRadius: 22,
      boxShadow: '0 16px 48px #1c1849a0',
      padding: '2.8rem 2.2rem 2.1rem 2.2rem',
      textAlign: 'center',
      color: '#ecebf2'
    }}>
      <h2
        style={{
          fontSize: '2.3rem',
          background: 'linear-gradient(92deg, #19dfa5 0%, #40c6f6 85%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 800,
          marginBottom: '1.1rem'
        }}
      >Донаты для команды</h2>
      <p style={{ color: '#c9cee3', fontSize: '1.14rem', marginBottom: '1.8rem' }}>
        Поддержите наш проект и внесите свой вклад в развитие команды ITAM<br />
        Все средства идут на организацию будущих мероприятий, печеньки и техническое обновление.
      </p>
      <form onSubmit={handleSubmit} style={{ marginTop: '1.1rem' }}>
        <input
          type="number"
          className="input"
          style={{
            width: '100%', padding: '1rem', borderRadius: 9,
            background: '#212433', color: '#ecebf2', fontSize: '1.21rem', border: '1.4px solid #40c6f6'
          }}
          value={amount}
          min={1}
          placeholder="Введите сумму (₽)"
          onChange={e => setAmount(e.target.value)}
        />
        <button
          type="submit"
          className="button"
          style={{
            width: '100%', padding: '1.05rem', marginTop: '0.7rem',
            background: 'linear-gradient(93deg, #19dfa5 0%, #40c6f6 100%)',
            color: '#222', fontWeight: 700, borderRadius: 9, fontSize: '1.19rem'
          }}
        >
          Отправить донат
        </button>
      </form>
      {success && <div className="success" style={{ color: '#19d47a', fontWeight: 600, marginTop: '1.5rem' }}>{success}</div>}
      {error && <div className="error" style={{ color: '#ff4b6c', fontWeight: 600, marginTop: '1.2rem' }}>{error}</div>}
      <div style={{ fontSize: '1.05rem', color: '#43d6c3', marginTop: '2.7rem' }}>
        Ваша поддержка — это вдохновение для всей команды.<br />
        Спасибо за вклад в наше будущее!
      </div>
    </div>
  );
}
