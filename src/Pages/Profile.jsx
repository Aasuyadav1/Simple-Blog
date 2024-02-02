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
import { Progress } from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { storage } from "../Appwrite/auth";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

function Profile() {
  const [blogData, setBlogData] = useState([]);
  const [userId, setUserId] = useState();
  const { userData } = useContext(userContext);
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState(null);

  

  const handleEdit = ($id) => {
    navigate(`/uploadpost/${$id}`);
  };

  const deleteHandle = async () => {
    try {
      if (deleteId) {
        const getData = await database.getDocument(
          "65b340358ea3657276f8",
          "65b34045850ba70f6fec",
          deleteId
        );
        await storage.deleteFile("65b4c5c0bbec74de98e3", getData.imageId);
        await database.deleteDocument(
          "65b340358ea3657276f8",
          "65b34045850ba70f6fec",
          deleteId
        );

      
      }
    } catch (error) {
      console.log("error on deleting", error);
    } finally {
      setDeleteId(null);
      onClose();
    }
  };

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userData, deleteHandle,navigate]);

  const handleOpen = ($id) => {
    setDeleteId($id);
    onOpen();
  };


  const handleSinglePost = ($id) => {
    navigate(`/singlePost/${$id}`)
  }


  return (
   <div className="h-full w-full">
    <div className="w-full flex justify-center items-center bg-[url(https://static.wixstatic.com/media/5bfb6f_26f1a5c736e544e09c63c82a4c792645~mv2_d_3839_1306_s_2.jpg/v1/fill/w_1517,h_653,al_b,q_85,usm_0.66_1.00_0.01,enc_auto/5bfb6f_26f1a5c736e544e09c63c82a4c792645~mv2_d_3839_1306_s_2.jpg)] h-[200px] object-cover bg-no-repeat bg-center">
        <h1 className="text-4xl text-white">Profile</h1>
      </div>
   {
    isLoading ?  <Progress
    size="sm"
    width="500"
    isIndeterminate
    aria-label="Loading..."
    className="w-screen bg-transparent bg-white fixed top-0=10 z-30"
  /> : null
   }
    <div className="flex gap-4 mt-2 px-4 py-1 sm:justify-start justify-center  flex-wrap">
      
      <Modal size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Delete Post</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this post?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={deleteHandle}>
              Confirm Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {isLoading ? (
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
      ) : blogData.length > 0 ? (
        blogData.map((cur, i) => (
          <Card sx={{ maxWidth: 300 }} className="mt-10" key={i}>
            <CardMedia
              component="img"
              image={cur.image}
              alt="blog image"
              className=" object-contain"
              style={{ height: "200px", width: "300px" }}
              onClick={()=>handleSinglePost(cur.$id)}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {cur.summary}
              </Typography>
            </CardContent>
            <CardActions
              disableSpacing
              className="flex justify-between items-center bottom-0"
            >
              <IconButton
                aria-label="add to favorites"
                onClick={() => handleFavourite(cur.$id)}
              >
               
              </IconButton>
              <div>
                <IconButton onClick={() => handleEdit(cur.$id)}>
                  <FaEdit />
                </IconButton>
                <IconButton onClick={() => handleOpen(cur.$id)}>
                  <MdDeleteOutline />
                </IconButton>
              </div>
            </CardActions>
          </Card>
        ))
      ) : (
        <div className="w-full h-screen flex justify-center items-center text-3xl">
          Upload a Post
        </div>
      )}
    </div>
    </div>
  );
}

export default Profile;
