import { useEffect } from "react";
import { useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/Signup";
import Login from "./Pages/Login";
import { account } from "./Appwrite/auth";
import Uploadpost from "./Pages/Uploadpost";
import Header from "./Pages/Header";
import Profile from "./Pages/Profile";
import UserContextProvide from "./Contextapi/context";
import Singlepost from "./Pages/Singlepost";
import Technology from "./Pages/Technology";
import Sports from "./Pages/Sports";
import News from "./Pages/News";
import Travel from "./Pages/Travel";
function App() {
 

  return (
    <BrowserRouter>
    <UserContextProvide>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/uploadpost/:id?" element={<Uploadpost />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/technology" element={<Technology/>} />
        <Route path="/travel" element={<Travel/>} />
        <Route path="/sports" element={<Sports/>} />
        <Route path="/news" element={<News/>} />
        <Route path="/singlePost/:id" element={<Singlepost/>}/>
      </Routes>
      </UserContextProvide>
    </BrowserRouter>
  );
}

export default App;
