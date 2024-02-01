import React, { useEffect } from 'react'
import { useState } from 'react';
import { userContext } from '../Contextapi/context';
import { useContext } from 'react'
import { Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Travel() {
    const {blogs, setblogs} = useContext(userContext);
    const [techBlog, setTechBlog] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        if(blogs){
            console.log(blogs)
            const filterByCategory = blogs.filter((cur)=>cur.category == "travle");
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
            <div key={i} className="max-w-[600px] w-full mt-4 rounded-md border">
            <img
              src={cur.image}
              alt="Laptop"
              className="h-auto w-full rounded-t-md object-cover"
            />

            <div className="p-4">
              <h1 className="inline-flex items-center text-xl font-semibold">
                {cur.title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </h1>
              <p className="mt-3 text-md text-gray-600">{cur.summary}</p>
              <div className="mt-4 flex gap-2">
                <span className="mb-2  inline-block rounded-full bg-gray-100 px-3 py-1 text-[15px] font-semibold text-gray-500">
                  #Macbook
                </span>
                <span className="mb-2  inline-block rounded-full bg-gray-100 px-3 py-1 text-[15px] font-semibold text-gray-500">
                  #Apple
                </span>
                <span className="mb-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[15px] font-semibold text-gray-500">
                  #Laptop
                </span>
              </div>
              <button
                type="button"
                className="mt-4 w-full rounded-sm bg-black px-2 py-2 text-md font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={() => handleSinglePost(cur.$id)}
              >
                Read
              </button>
            </div>
          </div>
        ) : <div className='text-xl h-screen w-full flex justify-center items-center'><span className='text-5xl'>&#128531;</span> !! Ops No Data Found</div>
      }
    </div>
  )
}

export default Travel