import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/LoginPage.css';

export default function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      // Dummy login logic
      if (userId === 'user' && password === 'password') {
        navigate('/home');
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        {error && <p className='error'>Invalid Credentials</p>}
        <h2 className="login-title">Welcome to Fruit.ai</h2>
        <p className="login-subtitle">Please login to continue</p>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="userId" className="form-label">User ID</label>
            <input
              type="text"
              id="userId"
              className="form-input"
              placeholder="Enter your user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn login-btn">Login</button>
        </form>
        <p>Demo credentials</p>
        <p>User ~ user</p>
        <p>Password ~ password</p>
      </div>
    </div>
  );
}
