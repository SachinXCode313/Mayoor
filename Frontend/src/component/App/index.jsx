import { useState,useEffect } from "react"
import Login from "../Login"
import Home from "../Home"
import './index.css'

import { getMessaging, onMessage } from "firebase/messaging";
import { toast } from "react-toastify";

const messaging = getMessaging();


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