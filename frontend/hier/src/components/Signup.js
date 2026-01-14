import React from "react";

function Signup({ setPage }) {

  const handleSignup = (e) => {
    e.preventDefault();

    // 👉 Later you can add API call here

    // After signup → go to verify email page
    setPage("verify");
  };

  return (
    <div className="card">
      {/* Create Account Logo */}
      <img
        src="https://static.vecteezy.com/system/resources/previews/018/742/015/original/minimal-profile-account-symbol-user-interface-theme-3d-icon-rendering-illustration-isolated-in-transparent-background-png.png"
        alt="Create Account"
        className="logo"
      />

      <h2>Create Account</h2>
      <p className="subtitle">Join Hier-a-Helper community</p>

      <br />

      {/* Disable browser autofill */}
      <form onSubmit={handleSignup} autoComplete="off">

        <div className="two-inputs">
          <div className="input-group">
            <label><b>First Name</b></label>
            <input
              type="text"
              placeholder="Enter first name"
              required
              autoComplete="given-name"
            />
          </div>

          <div className="input-group">
            <label><b>Last Name</b></label>
            <input
              type="text"
              placeholder="Enter last name"
              required
              autoComplete="family-name"
            />
          </div>
        </div>

        <label><b>Email Address</b></label>
        <input
          type="email"
          placeholder="Enter your email"
          required
          autoComplete="email"
        />

        <label><b>Phone Number</b> (optional)</label>
        <input
          type="text"
          placeholder="Enter your phone number"
          autoComplete="tel"
        />

        <label><b>Password</b></label>
        <input
          type="password"
          placeholder="Enter your password"
          required
          autoComplete="new-password"
        />

        <button className="btn" type="submit">
          Create Account
        </button>
      </form>

      <p className="switch">
        Already have an account?
        <span
          className="link"
          onClick={() => setPage("login")}
        >
          {" "}Sign in
        </span>
      </p>
    </div>
  );
}

export default Signup;