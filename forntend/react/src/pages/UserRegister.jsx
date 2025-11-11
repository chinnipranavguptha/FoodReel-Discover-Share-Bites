import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/register",
        { name, email, password },
        { withCredentials: true }
      );
      console.log("✅ Registration successful:", response.data);
      alert("User registered successfully!");
    } catch (error) {
      console.error("❌ Registration failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed");
    }
  };
  
  navigate('/'); // redirect to login page
  return (
    <div className="auth-viewport">
      <div className="auth-card" role="region" aria-labelledby="register-heading">
        <div className="auth-brand">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect width="24" height="24" rx="6" fill="var(--accent)" />
          </svg>
          <div>
            <h1 id="register-heading">Create account</h1>
            <div className="auth-sub">Sign up to order your favorites</div>
          </div>
        </div>

        <form
          className="auth-form"
          aria-describedby="register-desc"
          onSubmit={handleSubmit}
        >
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Jane Doe" />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" />
          </div>

          <div className="actions">
            <button className="btn" type="submit">Create account</button>
            <Link to="/user/login" className="muted-link">Already have an account?</Link>
          </div>
        </form>

        <div className="small" style={{ marginTop: 16 }}>
          By creating an account you agree to our{" "}
          <a className="muted-link" href="#">terms</a>.
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
