import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !pass) {
      setError('Incorrect email or password. Please try again.');
    } else {
      setError('');
      // handle successful login here
    }
  }

  return (
    <div className="dark-bg">
      <div className="card card-dark">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input className="input"
                 type="email"
                 placeholder="Enter your email"
                 value={email}
                 onChange={e => setEmail(e.target.value)} />
          <label>Password</label>
          <input className="input"
                 type="password"
                 placeholder="Enter your password"
                 value={pass}
                 onChange={e => setPass(e.target.value)} />
          {error && <div className="error">{error}</div>}
          <button className="button">Login</button>
        </form>
        <button
          className="button"
          style={{ marginTop: '1em', background: "#347cff", color: "#fff" }}
          onClick={() => navigate('/register')}>
            Go to Registration
        </button>
      </div>
    </div>
  );
}
export default Login;
