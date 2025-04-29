import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={!user?<Login />:<Dashboard/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={!user?<Login/>:<Dashboard />} />
    </Routes>
  );
}

export default App;
