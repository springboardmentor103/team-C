import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import VerifyEmail from "./components/VerifyEmail";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div className="page">
      {page === "login" && <Login setPage={setPage} />}
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "forgot" && <ForgotPassword setPage={setPage} />}
      {page === "verify" && <VerifyEmail setPage={setPage} />}
    </div>
  );
}

export default App;
