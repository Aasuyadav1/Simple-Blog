import React, { useEffect } from 'react'
import { useState } from 'react';
import { userContext } from '../Contextapi/context';
import { useContext } from 'react'
import { Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function News() {
    const {blogs, setblogs} = useContext(userContext);
    const [techBlog, setTechBlog] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        if(blogs){
            console.log(blogs)
            const filterByCategory = blogs.filter((cur)=>cur.category == "news");
            setTechBlog(filterByCategory);
        }
    },[blogs])

    const handleSinglePost = ($id) => {
        navigate(`/singlePost/${$id}`)
      }

      const formatDate = (timestamp) => {
        const options = { day: "numeric", month: "short", year: "numeric" };
        return new Date(timestamp).toLocaleDateString(undefined, options);
      };

      const formatUsername = (username) => {
        return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
      };
    
  return (
    <div className='w-full flex justify-center flex-col gap-10 items-center'>
           {
            techBlog.length > 0 ?  techBlog.map((cur,i)=>
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
        ) :  <div>No blogs Found</div>
      }
    </div>
  )
}

export default News