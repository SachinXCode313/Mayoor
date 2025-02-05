import { useState,useEffect } from "react"
import { requestNotificationPermission } from "../../Helper/firebase"
import { messaging } from "../../Helper/firebase"
import Login from "../Login"
import Home from "../Home"
import './index.css'

import { getMessaging, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";

const messaging = getMessaging();

  useEffect(() => {
    requestNotificationPermission();

    onMessage(messaging, (payload) => {
      console.log("Received foreground message:", payload);
      const { title, body } = payload.notification || {};

      new Notification({ title, body });
      
    });
  }, []);


const App = () => {

    const [user, setUser] = useState(null)

    return (
      <>
        {/* <Login/> */}
        {
          user ? <Home user={user} /> : <Login setUser = {setUser} />
        }
        </>
    )
}


export default App