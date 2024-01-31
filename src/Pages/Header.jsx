import React, { useState, useEffect } from "react";
import { deepOrange } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import { IoIosSearch } from "react-icons/io";
import { account } from "../Appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from '@mui/material/Skeleton';
import { NavLink } from "react-router-dom";

function Header() {
  const navItems = [
    {
      id: 1,
      list: "Home",
      path: "/"
    },
    {
      id: 2,
      list: "Technology",
      path: "/technology"
    },
    {
      id: 3,
      list: "Travel",
      path: "/travel"
    },
    {
      id: 4,
      list: "Sports",
      path: "/sports"
    },
    {
      id: 5,
      list: "News",
      path: '/news'
    },
  ];

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const userDetail = await account.get();
        setUserId(userDetail.$id);
        setCurrentUser(userDetail.name.charAt(0).toUpperCase());
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
        console.log(error);
      }
    };

    getCurrentUser();
  }, [navigate]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlLogout = async () => {
    const logout = await account.deleteSessions();
    console.log(logout);
    navigate("/");
    window.location.reload();
    setAnchorEl(null);
  };

  const handleUpload = () => {
    navigate(`/uploadpost`);
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="flex bg-[#F2F2F2] items-center py-1 justify-between px-40 gap-20 sticky w-screen top-0 left-0 z-50">
      <div>
        <ul className="flex gap-6">
          {navItems.map((list) => (
            <Link key={list.id}>
              <NavLink to={`${list.path}`} className="cursor-pointer text-md text-[#626262] font-sans">
                {list.list}
              </NavLink>
            </Link>
          ))}
        </ul>
      </div>
      <div className="w-[100px] overflow-hidden">
        {isLoggedIn ? (
          <>
            <IconButton onClick={handleClick}>
              <Avatar
                sx={{ bgcolor: deepOrange[500] }}
                alt="Remy Sharp"
                src="/broken-image.jpg"
                className="cursor-pointer"
              >
                {currentUser}
              </Avatar>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleUpload}>Upload Post</MenuItem>
              <MenuItem onClick={handlLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Link to="/login" className="cursor-pointer text-md text-[#626262] font-sans ">
           
           <button className="px-2 py-4">
           Login
           </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
