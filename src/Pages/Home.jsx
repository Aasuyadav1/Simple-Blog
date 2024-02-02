import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Category from "./Category";
import Post from "./Post";
import Recentpost from "./Recentpost";
import { database } from "../Appwrite/auth";
import Company from "./Company";
function Home() {
  
  return (
    <div>
      <Hero />
      <Category />
        <Post/>
        <Company/>
    
    </div>
  );
}

export default Home;
