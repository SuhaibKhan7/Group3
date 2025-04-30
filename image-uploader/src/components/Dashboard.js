import React from "react";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Dashboard() {
  const navigate = useNavigate();
  function handleLogout() {
    signOut(auth)
      .then(() => {
        alert("Logout Succesfull");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });

      
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h2>Dashboard</h2>
    </div>
  );
}

export default Dashboard;
