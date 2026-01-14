import { useState } from "react";

function VerifyEmail({ setPage }) {
  const [code, setCode] = useState("");

  const handleVerify = () => {
    if (code.length === 6) {
      setPage("login"); // redirect to login after verification
    } else {
      alert("Enter 6-digit code");
    }
  };

  return (
    <div className="card">
      <div className="icon">🛡️</div>

      <h2>Verify your email</h2>

      {/* BOLD subtitle */}
      <p className="subtitle">
        Enter the 6-digit code sent to your email
      </p>

      {/* NORMAL demo text */}
      <p className="demo-text">
        for demo : any 6-digit number works
      </p>
     <br />
      <label><b>Verification code</b></label>
      <input
        type="text"
        maxLength="6"
        placeholder="000000"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="code-input"
      />

      <button className="btn" onClick={handleVerify}>
        Verify Code
      </button>

      <p className="switch">
        Didn’t receive the code?
        <span className="link"> Resend</span>
      </p>
    </div>
  );
}

export default VerifyEmail;
