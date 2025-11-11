import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/auth.css';

const UserLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/user/login',
        { email, password },
        { withCredentials: true }
      );

      console.log("✅ Login successful:", response.data);
      alert("Login successful!");
      navigate('/'); // redirect to home or dashboard
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Invalid credentials");
    }
    navigate('/'); // redirect to home or dashboard
  };

  return (
    <div className="auth-viewport">
      <div className="auth-card" role="region" aria-labelledby="login-heading">
        <div className="auth-brand">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect width="24" height="24" rx="6" fill="var(--accent)"></rect>
          </svg>
          <div>
            <h1 id="login-heading">Welcome back</h1>
            <div className="auth-sub">Sign in to continue</div>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" required />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" required />
          </div>

          <div className="actions">
            <button className="btn" type="submit">Sign in</button>
            <Link to="/user/register" className="muted-link">Create account</Link>
          </div>

          <div style={{ marginTop: 12 }}>
            <Link to="/foodpartner/register" className="muted-link">Register as food partner</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
