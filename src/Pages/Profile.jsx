import React, { useEffect } from "react";
import { useState } from "react";
import { userContext } from "../Contextapi/context";
import { useContext } from "react";
import { database } from "../Appwrite/auth";
import { Query } from "appwrite";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Skeleton from "@mui/material/Skeleton";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [blogData, setBlogData] = useState([]);
  const [userId, setUserId] = useState();
  const { userData } = useContext(userContext);
  const [favourite, setFavourite] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData && userData.$id) {
          setUserId(userData.$id);

          const userPost = await database.listDocuments(
            "65b340358ea3657276f8",
            "65b34045850ba70f6fec",
            [Query.equal("userid", userData.$id)]
          );

          if (userPost) {
           
            setBlogData(userPost.documents.reverse());

            const initialFavoriteMap = {};
            userPost.documents.forEach((post) => {
              initialFavoriteMap[post.$id] = false;
            });
            setFavourite(initialFavoriteMap);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userData]);


  const handleFavourite = ($id) => {
    setFavourite((prevMap) => ({
      ...prevMap,
      [$id]: !prevMap[$id],
    }));
  };

  const handleEdit = ($id)=>{
    navigate(`/uploadpost/${$id}`)
  }

  return (
    <div className="flex gap-4 mt-2 px-4 py-1 flex-wrap">
      {blogData.length > 0 ? (
        blogData.map((cur, i) => (
          <Card sx={{ maxWidth: 300 }} key={i}>
            <CardMedia
              component="img"
              image={cur.image}
              alt="blog image"
              className=" object-contain"
              style={{ height: "200px", width: "300px" }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {cur.summary}
              </Typography>
            </CardContent>
            <CardActions
              disableSpacing
              className="flex justify-end items-center bottom-0"
            >
              <IconButton
                aria-label="add to favorites"
                onClick={() => handleFavourite(cur.$id)}
              >
                <FavoriteIcon
                  color={favourite[cur.$id] ? "warning" : "action"}
                />
              </IconButton>
              <IconButton onClick={()=>handleEdit(cur.$id)}>
                  <FaEdit />
              </IconButton>
            </CardActions>
          </Card>
        ))
      ) : (
        <div className="flex w-full justify-between flex-wrap gap-4 mt-2">
          <div className="w-[300px]">
            <Skeleton variant="rectangular" width={300} height={300} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </div>
          <div className="w-[300px]">
            <Skeleton variant="rectangular" width={300} height={300} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </div>
          <div className="w-[300px]">
            <Skeleton variant="rectangular" width={300} height={300} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </div>
          <div className="w-[300px]">
            <Skeleton variant="rectangular" width={300} height={300} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
