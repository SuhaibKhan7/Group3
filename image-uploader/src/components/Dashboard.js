import React, { useState } from "react";
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
  const [file, setFile] = useState(null);
  function handleFile(e) {
    setFile(e.target.files[0]);
  }
  function uploadFile(e) {
    e.preventDefault();
    console.log(file);
  }



  
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h2>Dashboard</h2>
      <form action="">
        <input type="file" onChange={handleFile} />
        <br />
        <button onClick={uploadFile}>Upload</button>
      </form>
    </div>
  );
}

export default Dashboard;
