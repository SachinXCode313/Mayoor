import { useState,useEffect } from "react"
import Login from "../Login"
import Home from "../Home"
import './index.css'

import { getMessaging, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";

const messaging = getMessaging();


const App = () => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onMessage(messaging, (payload) => {
          console.log("Received foreground message:", payload);
    
          if (payload.notification) {
            const { title, body } = payload.notification;
    
            // Option 1: Using toast for a UI notification
            toast.info(`${title}: ${body}`);
    
            // Option 2: Using the browser's Notification API
            if (Notification.permission === "granted") {
              new Notification(title, { body });
            }
          }
        });
    
        return () => unsubscribe();
      }, []);

    return (
        <Login/>
    )
}


export default App