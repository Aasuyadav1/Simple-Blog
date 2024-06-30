import { useEffect } from "react";
import { useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/Signup";
import Login from "./Pages/Login";

import Uploadpost from "./Pages/Uploadpost";
import Header from "./components/Header";
import Profile from "./Pages/Profile";
import UserContextProvide from "./Contextapi/context";
import Singlepost from "./Pages/Singlepost";
import Technology from "./Pages/Technology";
import Sports from "./Pages/Sports";
import News from "./Pages/News";
import Travel from "./Pages/Travel";
import Footer from "./components/Footer";
import Scrolltop from "./components/Scrolltop";
import Singleuser from "./Pages/Singleuser";
import Banner from "./components/Banner";
import { account } from "./Appwrite/auth";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false)
 
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const userDetail = await account.get();
        if(userDetail){
          setIsLogin(true)
        }
      } catch (error) {
        setIsLogin(false)
        console.log(error)
      }
    };

    getCurrentUser();
  }, []);

  return (
    <BrowserRouter>
    <UserContextProvide>
    <Header/>
    {
      isLogin ? null : <Banner/>
    }
    <Scrolltop/>
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
        <Route path="/singleuser/:id" element={<Singleuser/>} />
      </Routes>
      <Footer/>
      </UserContextProvide>
    </BrowserRouter>
  );
}

export default App;
