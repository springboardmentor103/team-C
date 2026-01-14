import { useState } from "react";

function ForgotPassword({ setPage }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = () => {
    if (!email) {
      alert("Please enter email");
      return;
    }
    setStep(2); // move to new password step
  };

  const handleSavePassword = () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password reset successful");
    setPage("login"); // redirect to login
  };

  return (
    <div className="card">
      {step === 1 && (
        <>
          <h2>Forgot Password</h2>
          <p className="subtitle">Enter your email to reset password</p>

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn" onClick={handleReset}>
            Reset Password
          </button>

          <p className="switch">
            <span className="link" onClick={() => setPage("login")}>
              Back to Login
            </span>
          </p>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Set New Password</h2>

          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="btn" onClick={handleSavePassword}>
            Save Password
          </button>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
