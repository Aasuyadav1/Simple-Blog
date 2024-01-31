import React, { useEffect, useState  } from "react";
import { database } from "../Appwrite/auth";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

function Post() {
  const [allPost, setAllPost] = useState(null)
  const navigate = useNavigate();
  useEffect(()=>{
    const fatchAllPost =async ()=>{
      try {
        const getPost =await database.listDocuments("65b340358ea3657276f8","65b34045850ba70f6fec");
        console.log(getPost)
        setAllPost(getPost.documents.reverse())
      } catch (error) {
        console.log(error)
      }
    }
    fatchAllPost();
  },[])

  const formatDate = (timestamp) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  const handleSinglePost = ($id) => {
    navigate(`/singlePost/${$id}`)
  }

  const formatUsername = (username) => {
    return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
  };


  return (
   
    <div className="flex flex-col items-center mt-40 gap-10">
      {
        allPost ? allPost.map((cur,i)=>
        <div key={i} className="w-full max-w-[700px] bg-transparent text-black overflow-hidden border border-gray-300">
        <div className="w-full h-[500px] object-cover" onClick={()=>handleSinglePost(cur.$id)}>
          <img src={cur.image} alt="" className="w-full h-full object-cover"/>
        </div>
        <div className="py-3  mt-3 px-10">
          <div className="flex gap-4 font-semibold items-center">
              <div className="w-[40px] aspect-square object-cover flex justify-center items-center bg-orange-400 text-white font-bold rounded-full text-xl">
              {cur.username.charAt(0).toUpperCase()}
              </div>
              <div className="leading-none">
              <p>{formatUsername(cur.username)}</p>
              <p className="text-black mt-[5px] text-sm opacity-90">{formatDate(cur.$createdAt)}</p>
              </div>
          </div>
          <div className="mt-4">
          <h2 className="text-2xl font-bold mt-[5px]">{cur.title}</h2>
          <p className="text-lg text-black mt-[10px]">{cur.summary}</p>
          </div>
        </div>
      </div>
        ) :  <Skeleton variant="rectangular" width={700} height={900} />
      }
     
    </div>
  );
}

export default Post;
