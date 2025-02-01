import { useState } from "react"
import Login from "../Login"
import Home from "../Home"
import './index.css'


const App = () => {

    const [user, setUser] = useState(null)

    return (
        <Login/>
    )
}


export default App