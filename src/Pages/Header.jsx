import React, { useState } from "react";
import { deepOrange } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import { IoIosSearch } from "react-icons/io";
import { account } from "../Appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from '@mui/material/Skeleton';

function Header() {
  const navItems = [
    {
      id: 1,
      list: "Home",
    },
    {
      id: 2,
      list: "About",
    },
    {
      id: 3,
      list: "Travel",
    },
    {
      id: 4,
      list: "Eat",
    },
    {
      id: 5,
      list: "Relax",
    },
    {
      id: 6,
      list: "Videos",
    },
  ];

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const userDetail = await account.get();
        setUserId(userDetail.$id)
        setCurrentUser(userDetail.name.charAt(0).toUpperCase());
      } catch (error) {
        // navigate("/login");
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
    navigate("/login");
    setAnchorEl(null);
  };

  const handleUpload = ()=>{
    navigate(`/uploadpost`)
  }

  const handleProfile = ()=>{
    navigate("/profile")
  }

  return (
    <div className="flex bg-[#F2F2F2] items-center py-1 justify-between px-40 gap-20 sticky w-screen top-0 left-0 z-50">
      <div className="flex justify-center relative items-center border-solid border-b-2 pb-2 border-black">
        <input
          type="text"
          id="ser"
          className="outline-none font-serif bg-transparent text-black border-none pr-8 px-2"
          placeholder="Search"
        />
        <label
          htmlFor="ser"
          className="cursor-pointer  absolute top-[3px] right-0 "
        >
          <IoIosSearch className="text-xl text-[#626262]" />
        </label>
      </div>
      <div>
        <ul className="flex gap-6">
          {navItems.map((list) => (
            <li
              key={list.id}
              className="cursor-pointer text-md text-[#626262] font-sans"
            >
              {list.list}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-[100px] overflow-hidden">
        {currentUser ? (
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
        ) : <Skeleton variant="circular" width={56} height={56} />
      }
      </div>
    </div>
  );
}

export default Header;
