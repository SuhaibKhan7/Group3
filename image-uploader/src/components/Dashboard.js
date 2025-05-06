import React, { useState } from "react";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

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
  const[imageurl,setImageurl]=useState("")

  function handleFile(e) {
    setFile(e.target.files[0]);
  }
  async function uploadFile(e) {
    e.preventDefault();
    console.log(file);
    const React_APP_CloudName = "dl36zcgco";
    const React_APP_ImagePreset = "imageuploader";
    const formdata = new FormData();
    console.log(formdata);
    formdata.append("file", file);
    formdata.append("upload_preset", React_APP_ImagePreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${React_APP_CloudName}/upload`,
        formdata
      );
      console.log(response);
      const imageurl = response.data.secure_url;
      setImageurl(imageurl);
      console.log(imageurl);
      alert("image uploaded on cloudinary");

      const user=auth.currentUser;

      await addDoc(collection(db, "uploads"), {
        uid:user.uid,
        imageurls:imageurl,
        uploadAt: new Date()
      });
      alert("Image url saved");

    } catch (error) {
      console.log(error);
    }
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
