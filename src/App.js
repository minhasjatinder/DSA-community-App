import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import {  useAuth } from "./firebase-config";
import Button from "@mui/material/Button" ;

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const currentUser = useAuth() ;
  const signUserOut = () => {
    signOut(auth).then(() => {
 
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <div style={{ 
      backgroundImage: `url("https://imageio.forbes.com/specials-images/imageserve/615d9fbf8c2f46f4fe359f45/Ai-brain-in-network-space/960x0.jpg?format=jpg&width=960)` ,
      backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%"
      }}>
      <Router>
      <nav style = {{display:"flex",justifyContent:"center"}}>
        <Link to="/"> Home </Link>

        {!isAuth ? (
          <Link to="/login"> Login </Link>
        ) : (
          <>
            <Link to="/createpost"> Create</Link>
            <Button id = "log-out-button" onClick={signUserOut} variant="outlined">LogOut</Button> 
          </>
        )}

        {
          isAuth ?(<div class = "wrapper " style = {{ display :"flex " , justifyContent:"space-between"}}>
        <img  class = "image--cover " src = {currentUser?currentUser.photoURL:"#"}></img>
        </div>):(<span></span>)
        }
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
