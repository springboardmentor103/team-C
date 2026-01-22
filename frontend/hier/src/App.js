import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import VerifyEmail from "./components/VerifyEmail";

import Dashboard from "./components/Dashboard";
import Feed from "./components/Feed";
import MyTasks from "./components/MyTasks";
import AddTask from "./components/AddTask";
import Settings from "./components/Settings";

import "./App.css";

function App() {
  return (
    <Routes>
      {/* Auth pages (centered) */}
      <Route
        path="/login"
        element={
          <div className="page">
            <Login />
          </div>
        }
      />
      <Route
        path="/signup"
        element={
          <div className="page">
            <Signup />
          </div>
        }
      />
      <Route
        path="/forgot"
        element={
          <div className="page">
            <ForgotPassword />
          </div>
        }
      />
      <Route
        path="/verify"
        element={
          <div className="page">
            <VerifyEmail />
          </div>
        }
      />

      {/* Dashboard (FULL SCREEN) */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Navigate to="feed" />} />
        <Route path="feed" element={<Feed />} />
        <Route path="my-tasks" element={<MyTasks />} />
        <Route path="add-task" element={<AddTask />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Default */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
