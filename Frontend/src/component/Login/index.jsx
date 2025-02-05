import Wrapper from "./style";
import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import axios from "axios";
import Home from "../Home/";
import Logo from "./Logo.png";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Login = ({ setUser }) => {
  const [teacher, setTeacher] = useState(
    JSON.parse(localStorage.getItem("teacher")) || null
  ); // Load session from localStorage
  const [error, setError] = useState("");
  const loginInProgress = useRef(false);


  const handleLogin = async () => {
    if (loginInProgress.current) return;
    loginInProgress.current = true;

    try {
      await signOut(auth);
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/verify-token`,
        { token: idToken }
      );

      if (response.status === 200) {
        setTeacher(result.user);
        localStorage.setItem("teacher", JSON.stringify(result.user)); // Store in localStorage
        setUser(result.user.displayName);
        setError("");

      } else {
        setError("Authentication failed: " + response.data.message);
      }
    } catch (err) {
      console.error("Error during login:", err.message);
      setError(`An error occurred: ${err.message || err}`);
      await signOut(auth);
    } finally {
      loginInProgress.current = false;
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("teacher"); // Clear session
    setTeacher(null);
    setUser(null);
  };

  return (
    <Wrapper>
      <div className="homePage">
        {teacher ? (
          <Home teacher={teacher}  onLogout={handleLogout} />
        ) : (
          <div className="container">
            <div>
              <img id="logo" src={Logo} alt="Logo" />
              <h1 id="appName">Mayoor</h1>
            </div>
            <input id="SignIn" type="button" value="Sign in with Google" onClick={handleLogin} />
            {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Login;
