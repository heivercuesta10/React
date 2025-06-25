import Adminview from "./components/Adminview"
import Home from "./components/Home"
import Login from "./components/Login"
import Userview from "./components/Userview"
import { useState } from "react"




function App() {

  const[user, SetUser] = useState(false)
  return (
    <div> 
      <h4>Primer Vista con Nombre App</h4>

      { user ? <Home/> : <Login/> }
    
        
    </div>

  )
}

export default App
