import Wrapper from "./style";
import React, { useState, useEffect, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence, getRedirectResult, signInWithRedirect } from "firebase/auth";
import axios from "axios";
import Home from "../Home";
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

const Login = () => {
  const [user, setUser] = useState(null); // Start with null to avoid flicker
  const [error, setError] = useState("");
  const loginInProgress = useRef(false); // Track if login is in progress

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("firebaseUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // ✅ Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userData = {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        };

        // ✅ Store user in localStorage
        localStorage.setItem("firebaseUser", JSON.stringify(userData));
        setUser(userData);
      } else {
        localStorage.removeItem("firebaseUser");
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount

    // Set persistence to local storage
    setPersistence(auth, browserLocalPersistence)
      .then(() => console.log("Auth persistence set to local"))
      .catch((error) => console.error("Error setting auth persistence:", error));
  }, []);

  // Handle login using popup or redirect based on device
  const handleLogin = async () => {
    if (loginInProgress.current) return; // Prevent multiple login attempts
    loginInProgress.current = true;

    try {
      await signOut(auth); // Force sign out for fresh login

      provider.setCustomParameters({
        prompt: "select_account", // Always prompt user to select account
      });

      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // If iOS device, use redirect
        console.log("Using redirect login on iOS");
        await signInWithRedirect(auth, provider);
      } else {
        // Use popup login for other devices
        console.log("Using popup login");
        const result = await signInWithPopup(auth, provider);
        handleUserLogin(result);
      }
    } catch (err) {
      console.error("Error during login:", err.code, err.message);
      setError(`An error occurred during login: ${err.message || err}`);
      await signOut(auth); // Ensure we clean up invalid credentials
    } finally {
      loginInProgress.current = false;
    }
  };

  // Handle login result from redirect (for iOS)
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          handleUserLogin(result);
        }
      })
      .catch((error) => {
        console.error("Error getting redirect result:", error);
        setError(`An error occurred: ${error.message}`);
      });
  }, []);

  const handleUserLogin = async (result) => {
    if (!result?.user) return;

    const userData = {
      uid: result.user.uid,
      displayName: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
    };

    // Store user in localStorage
    localStorage.setItem("firebaseUser", JSON.stringify(userData));
    setUser(userData);

    try {
      const idToken = await result.user.getIdToken();
      console.log("ID Token retrieved:", idToken);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/verify-token`, {
        token: idToken,
      });

      if (response.status === 200) {
        setError("");
        console.log("User authenticated successfully:", userData);
      } else {
        setError("Authentication failed: " + response.data.message);
      }
    } catch (err) {
      console.error("Error during token verification:", err.response?.data || err.message || err);
      setError("Error verifying token with backend.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("firebaseUser"); // Remove user from localStorage
    setUser(null);
  };

  return (
    <Wrapper>
      <div className="homePage">
        {user ? (
          <Home user={user?.displayName} onLogout={handleLogout} />
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
