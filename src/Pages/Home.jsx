import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Post from "../components/Post";
import Company from "../components/Company";
import Category from "../components/Category";
function Home() {
  return (
    <div>
      <Hero />
      <Category />
      <Post />
      <Company />
    </div>
  );
}

export default Home;
