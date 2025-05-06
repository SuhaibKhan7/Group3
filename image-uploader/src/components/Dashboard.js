import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Header = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  margin: 1rem 0.5rem;
  padding: 0.6rem 1.2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ImageWrapper = styled.div`
  display: inline-block;
  margin: 1rem;
  text-align: center;
`;

const UploadedImg = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const UploadForm = styled.form`
  margin: 2rem 0;
`;

const FileInput = styled.input`
  margin: 1rem 0;
`;

function Dashboard() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [imageurl, setImageurl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "uploads"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const TempUrl = [];
      querySnapshot.forEach((doc) => {
        TempUrl.push({ id: doc.id, ...doc.data() });
      });
      setImages(TempUrl);
    });
    return () => unsubscribe();
  }, []);

  function handleLogout() {
    signOut(auth)
      .then(() => {
        alert("Logout Successful");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  }

  function handleFile(e) {
    setFile(e.target.files[0]);
  }

  async function uploadFile(e) {
    e.preventDefault();
    const React_APP_CloudName = "dl36zcgco";
    const React_APP_ImagePreset = "imageuploader";

    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", React_APP_ImagePreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${React_APP_CloudName}/upload`,
        formdata
      );

      const imageurl = response.data.secure_url;
      setImageurl(imageurl);
      alert("Image uploaded to Cloudinary");

      const user = auth.currentUser;
      await addDoc(collection(db, "uploads"), {
        uid: user.uid,
        imageurls: imageurl,
        uploadAt: new Date(),
      });

      alert("Image URL saved to Firestore");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }
  async function handleDelete(id) {
    console.log(id);
    await deleteDoc(doc(db, "uploads", id));
  }
  return (
    <Container>
      <Button onClick={handleLogout}>Logout</Button>
      <Header>Dashboard</Header>

      <UploadForm>
        <FileInput type="file" onChange={handleFile} />
        <br />
        <Button onClick={uploadFile}>Upload</Button>
      </UploadForm>

      {images.map((img, index) => (
        <ImageWrapper key={index}>
          <UploadedImg src={img.imageurls} alt={`upload-${index}`} />
          <br />
          <Button onClick={() => handleDelete(img.id)}>Delete</Button>
        </ImageWrapper>
      ))}
    </Container>
  );
}

export default Dashboard;
