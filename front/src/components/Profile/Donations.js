import React, { useState } from 'react';

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
    // Здесь можно добавить вызов API для донатов, если потребуется
  }

  return (
    <div style={{
      backgroundColor: 'rgba(32, 35, 54, 0.95)',
      borderRadius: '16px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
      padding: '2rem',
      maxWidth: '400px',
      margin: '2rem auto',
      color: '#e0e1e3',
      fontFamily: "'Montserrat', Arial, sans-serif",
    }}>
      <h2 style={{ color: '#19dfa5', marginBottom: '1.5rem', fontWeight: '800' }}>Поддержите наш проект</h2>

      <p>Все средства идут на организацию будущих мероприятий, печеньки и техническое обновление.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите сумму"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: '8px',
            border: '1px solid #444',
            marginBottom: '1rem',
            backgroundColor: '#212433',
            color: '#e0e1e3',
            fontSize: '1rem',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '1rem',
            background: 'linear-gradient(90deg, #37f4a1 0%, #2fabff 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#222',
            fontWeight: '600',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 16px #2222',
            transition: 'background 0.18s, color 0.17s, transform 0.13s',
          }}
        >
          Поддержать
        </button>
      </form>

      {error && <p style={{ color: '#ff4b6c', marginTop: '0.5rem' }}>{error}</p>}
      {success && <p style={{ color: '#19d47a', marginTop: '0.5rem' }}>{success}</p>}
    </div>
  );
}
