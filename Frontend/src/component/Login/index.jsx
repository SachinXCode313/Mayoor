import Wrapper from "./style";
import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
// import { requestNotificationPermission } from "../../Helper/firebase";
// import { onMessage } from "firebase/messaging";
// import { messaging } from "../../Helper/firebase";
import axios from "axios";
import Home from "../Home/";
import Logo from './Logo.png';

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

const allowedDomains = ["gitjaipur.com"];
const WS_URL = "ws://localhost:3500";

const Login = ({setUser}) => {
  const [teacher, setTeacher] = useState(null); // Start with null to avoid flicker
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const [ws, setWs] = useState(null);
  const [notification, setNotification] = useState({ title: "", body: "" });
  
  const loginInProgress = useRef(false); // Track if login is in progress

  // useEffect(() => {
  //   const token = requestNotificationPermission();

  //   onMessage(messaging, (payload) => {
  //     console.log("Received foreground message:", payload);
  //     const { title, body } = payload.notification || {};

  //     new Notification({ title, body });

      
  //   });
  // }, []);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    setWs(socket);

    socket.onopen = () => console.log("✅ Connected to WebSocket server");

    socket.onmessage = (event) => {
      console.log("📥 Received data:", event.data);
      setTeachers(JSON.parse(event.data));
    };

    socket.onclose = () => console.log("🔴 Disconnected from WebSocket server");

    return () => socket.close();
  }, []);

  // const handleJoin = () => {
  //   if (teacher && ws) {
  //     const userData = JSON.stringify({ teacherName: teacher.displayName, email: teacher.email });
  //     console.log("Sending data to WebSocket server:", userData);  // Log the data before sending
  //     ws.send(userData);
  //     setTeacher(null); // Clear after sending
  //   }
  // };
  

  const handleLogin = async () => {
    if (loginInProgress.current) return;
    loginInProgress.current = true;
  
    try {
      await signOut(auth);
      provider.setCustomParameters({ prompt: "select_account" });
  
      if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        // Use redirect for iOS
        await signInWithRedirect(auth, provider);
      } else {
        // Use popup for other devices
        const result = await signInWithPopup(auth, provider);
        handleSignInResult(result);
      }
    } catch (err) {
      console.error("Error during login:", err.message);
      setError(`Login failed: ${err.message}`);
    } finally {
      loginInProgress.current = false;
    }
  };
  
  // Handle the redirect result
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) handleSignInResult(result);
      })
      .catch((error) => {
        console.error("Redirect sign-in error:", error.message);
      });
  }, []);
  
  const handleSignInResult = async (result) => {
    if (!result) return;
  
    const email = result.user.email;
    const domain = email.split("@")[1];
  
    if (allowedDomains.includes(domain)) {
      const idToken = await result.user.getIdToken();
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/verify-token`, { token: idToken });
  
        if (response.status === 200) {
          setTeacher(result.user);
          setUser(result.user.displayName);
  
          if (ws) {
            ws.send(JSON.stringify({ email: result.user.email, name: result.user.displayName }));
          }
        } else {
          setError("Authentication failed: " + response.data.message);
        }
      } catch (err) {
        setError("Error verifying token with backend.");
      }
    } else {
      setError("Access denied: Unauthorized domain.");
      await signOut(auth);
    }
  };

  console.log(teacher);

  return (
    <Wrapper>
      <div className="homePage">
        {teacher ? (
          <Home teacher={teacher} teachers={teachers} />
        ) : (
          <div className="container">
            <div>
              <img id="logo" src={Logo} alt="Logo" /><br />
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
