import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // frontend-only navigation
    navigate("/dashboard");
  };

  return (
    <div className="card">
      {/* Logo */}
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl7i6Iaf5pxrGKuRW6ZdlIjNWZ_X5gBOtUGw&s"
        alt="Login Logo"
        className="logo"
      />

      <h2>Welcome Back</h2>
      <p className="subtitle">Login in to your Hier-a-Helper account</p>
      <br />

      {/* Form */}
      <form autoComplete="off" onSubmit={handleLogin}>
        <label><b>Email Address</b></label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label><b>Password</b></label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="row">
          <label className="remember">
            <input type="checkbox" /> Remember me
          </label>

          {/* ✅ FIX */}
          <span
            className="link"
            onClick={() => navigate("/forgot")}
          >
            Forgot your password?
          </span>
        </div>

        <button type="submit" className="btn">
          Log in
        </button>
      </form>

      <p className="switch">
        Don’t have an account?
        <span
          className="link"
          onClick={() => navigate("/signup")}
        >
          {" "}Sign up
        </span>
      </p>
    </div>
  );
}

export default Login;
