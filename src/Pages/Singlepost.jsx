import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../Appwrite/auth";

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

  return (
    <div>
      {blogData ? (
        <div>
          <div>{blogData.author}</div>
          <img src={blogData.image} alt="" />
          {/* Render other details of the blog post */}
        </div>
      ) : null}
    </div>
  );
}

export default Singlepost;
