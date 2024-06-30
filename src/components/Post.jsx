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
          process.env.API_DATABASE_ID,
          process.env.API_COLLECTION_ID
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
      <div className="space-y-5 px-2 mb-20 sm:text-center sm:max-w-md sm:mx-auto">
        <h1 className="text-gray-800 text-3xl font-extrabold sm:text-4xl">
          Latest blog posts
        </h1>
        <p className="text-gray-600">
          Blogs that are loved by the community. Updated every hour.
        </p>
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
