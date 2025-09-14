import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !pass) {
      setError('Please enter both email and password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Invalid credentials. Please try again.');
        } else {
          setError('Login failed. Please try again later.');
        }
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('jwtToken', data.token); // сохраняем токен
        setLoading(false);
        navigate('/profile'); // переходим в профиль
      } else {
        setError('Login failed: token not received.');
        setLoading(false);
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      setLoading(false);
    }
  }

  return (
    <div className="dark-bg">
      <div className="card card-dark">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            className="input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <label>Password</label>
          <input
            className="input"
            type="password"
            placeholder="Enter your password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            disabled={loading}
            required
          />
          {error && <div className="error" role="alert">{error}</div>}
          <button className="button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <button
          className="button"
          style={{ marginTop: '1em', background: '#347cff', color: '#fff' }}
          onClick={() => navigate('/register')}
          disabled={loading}
        >
          Go to Registration
        </button>
      </div>
    </div>
  );
}

export default Login;
