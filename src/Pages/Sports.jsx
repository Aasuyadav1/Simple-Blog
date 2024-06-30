import React, { useEffect } from 'react'
import { useState } from 'react';
import { userContext } from '../Contextapi/context';
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

function Sports() {
    const {blogs, setblogs} = useContext(userContext);
    const [techBlog, setTechBlog] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        if(blogs){
            console.log(blogs)
            const filterByCategory = blogs.filter((cur)=>cur.category == "sports");
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
    <div className='w-full flex justify-center flex-col gap-10 items-center h-full'>
      <div className="w-full flex justify-center items-center bg-[url(https://static.wixstatic.com/media/5bfb6f_26f1a5c736e544e09c63c82a4c792645~mv2_d_3839_1306_s_2.jpg/v1/fill/w_1517,h_653,al_b,q_85,usm_0.66_1.00_0.01,enc_auto/5bfb6f_26f1a5c736e544e09c63c82a4c792645~mv2_d_3839_1306_s_2.jpg)] h-[200px] object-cover bg-no-repeat bg-center">
        <h1 className="text-4xl text-white">Sports blog</h1>
      </div>
    {techBlog.length > 0 ? techBlog.map((cur,i)=>
           <div  key={i} className="max-w-[600px] w-full mt-4 rounded-md border">
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
    ) : (
      <div className='text-xl h-52 w-full flex justify-center items-center'><span className='text-5xl'>&#128531;</span> !! Ops No Data Found</div>
    )}
  </div>
  )
}

export default Sports