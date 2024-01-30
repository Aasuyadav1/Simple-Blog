import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../Appwrite/auth";
import parse from 'html-react-parser';
import Skeleton from "@mui/material/Skeleton";
function Singlepost() {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentBlog = await database.getDocument(
          "65b340358ea3657276f8",
          "65b34045850ba70f6fec",
          id
        );

        if (currentBlog) {
          setBlogData(currentBlog);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const formatDate = (timestamp) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(timestamp).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full  mt-4 flex  justify-center gap-4">
      {blogData ? (
        <div className="w-full max-w-[900px] border border-gray-300 overflow-hidden py-4 px-8 rounded-md">
          <div className="flex gap-4 font-semibold items-center">
              <div className="w-[40px] aspect-square object-cover flex justify-center items-center bg-orange-400 text-white font-bold rounded-full text-xl">
                R
              </div>
              <div className="leading-none">
              <p>dsjfvl</p>
              <p className="text-black mt-[5px] text-sm opacity-90">{formatDate(blogData.$createdAt)}</p>
              </div>
          </div>
          <p className="text-2xl font-bold mt-10">{blogData.title}</p>
          <p className="mt-4 text-xl font-semibold">{blogData.summary}</p>
          <div className="mt-8">
          <img src={blogData.image} alt="" />
          </div>
          <p className="mt-8 text-xl text-left">{parse(blogData.content)}</p>

        </div>
      ) : <Skeleton variant="rectangular" width={900} height={900} />}
    </div>
  );
}

export default Singlepost;
