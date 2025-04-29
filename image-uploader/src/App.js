import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { auth } from "./firebase";
function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
