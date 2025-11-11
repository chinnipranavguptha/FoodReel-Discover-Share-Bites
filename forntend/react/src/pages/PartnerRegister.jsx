import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const PartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/userfoodpartner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("✅ Registration successful:", data);
      alert("Partner registered successfully!");
      navigate("/food/create"); // redirect to food creation page
    } catch (error) {
      console.error("❌ Error registering partner:", error);
      alert(error.message);
    }
    navigate('/create-food'); // redirect to food creation page
  };

  return (
    <div className="auth-viewport">
      <div className="auth-card" role="region" aria-labelledby="partner-register">
        <div className="auth-brand">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect width="24" height="24" rx="6" fill="var(--accent)"></rect>
          </svg>
          <div>
            <h1 id="partner-register">Partner sign up</h1>
            <div className="auth-sub">Create an account for your restaurant</div>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Mama's Diner" required />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="partner@example.com" required />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" required />
          </div>

          <div className="actions">
            <button className="btn" type="submit">Create account</button>
            <Link to="/foodpartner/login" className="muted-link">Already a partner?</Link>
          </div>

          <div style={{ marginTop: 12 }}>
            <Link to="/user/login" className="muted-link">Login as user</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerRegister;
