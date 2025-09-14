import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Register() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
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
    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }), // без role
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Success: Registration complete!');
        setError('');
        setEmail('');
        setPass('');
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
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          className="input"
          type="password"
          placeholder="********"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button className="button" type="submit">Register</button>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>

      <button
        className="button"
        style={{ marginTop: '1em', background: '#347cff', color: '#fff' }}
        onClick={() => navigate('/login')}
      >
        Already have an account?
      </button>
    </div>
  );
}

export default Register;
