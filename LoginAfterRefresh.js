import Wrapper from "./style";
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import Home from "../Home/";
import { requestNotificationPermission } from "../../Helper/push";
import { messaging } from "../../Helper/firebase";
import { onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCalzB6xLiUZ3dHBGiLmk3c2q1I2EY-36I",
  authDomain: "mayoorapp-d73d2.firebaseapp.com",
  projectId: "mayoorapp-d73d2",
  storageBucket: "mayoorapp-d73d2.firebasestorage.app",
  messagingSenderId: "310581028042",
  appId: "1:310581028042:web:956ec4e10b520ceaebc033",
  measurementId: "G-9HMZTG30NV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const allowedDomains = ["gitjaipur.com"];

const Login = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Request notification permission and listen for messages
  useEffect(() => {
    requestNotificationPermission();
    onMessage(messaging, (payload) => {
      console.log("Received foreground message:", payload);
      const { title, body, icon } = payload.notification;
      new Notification(title, { body: body || "Foreground Notification Body" });
    });

    // Check if user is already logged in when component mounts
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const email = currentUser.email;
        const domain = email.split("@")[1];

        if (allowedDomains.includes(domain)) {
          const idToken = await currentUser.getIdToken();
          try {
            const response = await axios.post("http://192.168.1.12:8000/api/verify-token", {
              token: idToken,
            });

            if (response.status === 200) {
              setUser(currentUser);
              setError("");
            } else {
              setError("Authentication failed: " + response.data.message);
            }
          } catch (err) {
            console.error("Error during token verification:", err.response?.data || err.message || err);
            setError("Error verifying token with backend.");
          }
        } else {
          setError("Access denied: Unauthorized domain.");
          await signOut(auth);
        }
      } else {
        setUser(null); // No user signed in
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  const handleLogin = async () => {
    try {
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      const domain = email.split("@")[1];

      if (allowedDomains.includes(domain)) {
        const idToken = await result.user.getIdToken();
        const response = await axios.post("http://192.168.1.12:8000/api/verify-token", {
          token: idToken,
        });

        if (response.status === 200) {
          setUser(result.user);
          setError("");
        } else {
          setError("Authentication failed: " + response.data.message);
        }
      } else {
        setError("Access denied: Unauthorized domain.");
        await signOut(auth);
      }
    } catch (err) {
      console.error("Error during login:", err.code, err.message);
      setError(`An error occurred during login: ${err.message || err}`);
      await signOut(auth); // Ensure we clean up invalid credentials
    }
  };

  return (
    <Wrapper>
      <div className="homePage">
        {user ? (
          <Home user={user} />
        ) : (
          <div className="signIn">
            <input type="button" value="Login" onClick={handleLogin} />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Login;
