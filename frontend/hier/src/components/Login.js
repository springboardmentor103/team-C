import React, { useState } from "react";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <form autoComplete="off">
        <label><b>Email Address</b></label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label><b>Password</b></label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="row">
          <label className="remember">
            <input type="checkbox" /> Remember me
          </label>

          <span className="link" onClick={() => setPage("forgot")}>
            Forgot your password?
          </span>
        </div>

       <button
  className="btn"
  onClick={() => setPage("dashboard")}
>
  Log in
</button>

      </form>

      <p className="switch">
        Don’t have an account?
        <span className="link" onClick={() => setPage("signup")}>
          {" "}Sign up
        </span>
      </p>
    </div>
  );
}

export default Login;