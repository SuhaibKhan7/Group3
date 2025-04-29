import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router";

function Login() {
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  function handleGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (user) {
          navigate("/dashboard");
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  function hanldeLogin() {
    if (!email || !password) {
      setMessage("Enter Email and Password");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setMessage("");
        // Signed in
        const user = userCredential.user;
        if (user) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  return (
    <div>
      <p>{message}</p>
      <form action="" onSubmit={hanldeLogin}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit ">Login</button>
      </form>

      <button onClick={handleGoogle}>Google Login</button>
    </div>
  );
}

export default Login;
