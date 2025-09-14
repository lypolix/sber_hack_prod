import React, { useState, useEffect } from 'react';

const profileCardStyle = {
  backgroundColor: 'rgba(32, 35, 54, 0.95)',
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
  padding: '2rem',
  maxWidth: '400px',
  margin: '2rem auto',
  color: '#e0e1e3',
};

const fieldStyle = {
  marginBottom: '1rem',
  fontSize: '1.1rem',
};

const labelStyle = {
  fontWeight: '700',
  color: '#40c6f6',
  marginRight: '0.5rem',
};

export default function ProfileInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError('Пользователь не авторизован');
      setLoading(false);
      return;
    }

    fetch('http://localhost:8080/api/profile', {
      headers: { 'Authorization': 'Bearer ' + token },
    })
      .then(res => {
        if (res.status === 401) throw new Error('Требуется авторизация');
        if (!res.ok) throw new Error('Ошибка загрузки профиля');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ color: '#fff', textAlign: 'center' }}>Загрузка профиля…</div>;
  if (error) return <div style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</div>;

  const renderField = (label, value) => (
    <div style={fieldStyle}>
      <span style={labelStyle}>{label}:</span> {value || 'не указано'}
    </div>
  );

  return (
    <div style={profileCardStyle}>
      <h2 style={{ color: '#19dfa5', marginBottom: '1.5rem', fontWeight: '800' }}>Профиль пользователя</h2>
      {renderField('Email', user.email)}
      {renderField('Имя', user.name)}
      {renderField('Фамилия', user.surname)}
      {renderField('Телефон', user.phone)}
    </div>
  );
}
