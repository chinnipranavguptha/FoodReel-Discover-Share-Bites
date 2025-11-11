import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

const PartnerLogin = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password) {
      alert("Please fill in both email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/loginfoodpartner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      console.log("✅ Partner login success:", data);
      alert("Login successful!");
      navigate("/food/dashboard"); // redirect to dashboard or menu page
    } catch (err) {
      console.error("❌ Login failed:", err);
      alert(err.message);
    }
    navigate("/create-food"); // redirect to dashboard or menu page
  };

  return (
    <div className="auth-viewport">
      <div className="auth-card" role="region" aria-labelledby="partner-login">
        <div className="auth-brand">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect width="24" height="24" rx="6" fill="var(--accent)"></rect>
          </svg>
          <div>
            <h1 id="partner-login">Partner sign in</h1>
            <div className="auth-sub">Manage your menu and orders</div>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="partner@example.com" required />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" required />
          </div>

          <div className="actions">
            <button className="btn" type="submit">Sign in</button>
            <Link to="/foodpartner/register" className="btn ghost">Create account</Link>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
            <Link to="/user/register" className="muted-link">Register as normal user</Link>
            <Link to="/foodpartner/register" className="muted-link">Register as food partner</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerLogin;
