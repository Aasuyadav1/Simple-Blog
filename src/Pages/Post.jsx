import React, { useEffect, useState } from "react";
import { database } from "../Appwrite/auth";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

function Post() {
  const [allPost, setAllPost] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fatchAllPost = async () => {
      try {
        const getPost = await database.listDocuments(
          "65b340358ea3657276f8",
          "65b34045850ba70f6fec"
        );
        console.log(getPost);
        setAllPost(getPost.documents.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    fatchAllPost();
  }, []);

  const formatDate = (timestamp) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  const handleSinglePost = ($id) => {
    navigate(`/singlePost/${$id}`);
  };

  const formatUsername = (username) => {
    return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
  };

  return (
    <div className="flex flex-col items-center mt-40 gap-10">
      <div className="space-y-5 mb-20 sm:text-center sm:max-w-md sm:mx-auto">
        <h1 className="text-gray-800 text-3xl font-extrabold sm:text-4xl">
          Latest blog posts
        </h1>
        <p className="text-gray-600">
          Blogs that are loved by the community. Updated every hour.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="items-center justify-center gap-3 sm:flex"
        >
          <div className="relative">
            <svg
              className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg sm:max-w-xs"
            />
          </div>
          <button className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow sm:mt-0 sm:w-auto">
            Subscribe
          </button>
        </form>
      </div>

      {allPost ? (
        allPost.map((cur, i) => (
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
                  #{cur.category}
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
        ))
      ) : (
        <Skeleton variant="rectangular" width={700} height={900} />
      )}
    </div>
  );
}

export default Post;
