import React from 'react'

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from 'react-router-dom';


function Recentpost({img, tit, sum, id}) {
  const navigate = useNavigate();
  const handlePost = (id)=>{
    navigate(`/singlepost/${id}`)
  }
  return (
    <div>
        <Card sx={{ maxWidth: 300 }} className="mt-10" >
            <CardMedia
              component="img"
              image={img}
              alt="blog image"
              className=" object-contain"
              style={{ height: "200px", width: "300px" }}
              onClick={()=>handlePost(id)}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {sum}
              </Typography>
            </CardContent>
            
          </Card>
    </div>
  )
}

export default Recentpost