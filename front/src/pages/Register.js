import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Register() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [role, setRole] = useState('user'); // дефолтная роль - пользователь
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !pass) {
      setError('Error: Please check your inputs.');
      setSuccess('');
      return;
    }
    setError('');
    // Отправляем email, password, role на backend
    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass, role }),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess('Success: Registration complete!');
        setError('');
        // Можно автоматически перейти на логин
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(data.error || 'Registration failed');
        setSuccess('');
      }
    } catch (err) {
      setError('Network error');
      setSuccess('');
    }
  }

  return (
    <div className="card">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <label>Email Address</label>
        <input
          className="input"
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          className="input"
          type="password"
          placeholder="********"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />

        <label>Role</label>
        <div style={{ marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={() => setRole('user')}
            style={{
              marginRight: '1rem',
              backgroundColor: role === 'user' ? '#347cff' : '#ccc',
              color: role === 'user' ? '#fff' : '#000',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            style={{
              backgroundColor: role === 'admin' ? '#347cff' : '#ccc',
              color: role === 'admin' ? '#fff' : '#000',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Admin
          </button>
        </div>

        <button className="button" type="submit">Register</button>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>

      <button
        className="button"
        style={{ marginTop: '1em', background: "#347cff", color: "#fff" }}
        onClick={() => navigate('/login')}
      >
        Already have an account?
      </button>
    </div>
  );
}

export default Register;
