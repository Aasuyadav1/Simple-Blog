import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Category from "./Category";
import Post from "./Post";
import Recentpost from "./Recentpost";
import { database } from "../Appwrite/auth";

function Home() {
  
  return (
    <div>
      <Hero />
      <Category />
        <Post/>
    
    </div>
  );
}

export default Home;
