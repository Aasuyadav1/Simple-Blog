import React, { useState, useEffect } from "react";
import { deepOrange } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import { account } from "../Appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

function Header() {
  const navItems = [
    {
      id: 1,
      list: "Home",
      path: "/",
    },
    {
      id: 2,
      list: "Technology",
      path: "/technology",
    },
    {
      id: 3,
      list: "Travel",
      path: "/travel",
    },
    {
      id: 4,
      list: "Sports",
      path: "/sports",
    },
    {
      id: 5,
      list: "News",
      path: "/news",
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

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTogglel = () => {
    setToggle(false);
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
    window.location.reload();
  };

  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex bg-[#F2F2F2] items-center py-1 justify-between px-2 lg:px-40 gap-2 md:gap-20 sticky w-screen top-0 left-0 z-50">
      <Link to={"/"} className="hidden md:block">
        <h2 className="text-2xl" style={{ fontFamily: "Pacifico, cursive" }}>
          Emagica
        </h2>
      </Link>
      <div className="text-4xl block md:hidden">
        <BiMenuAltLeft
          onClick={handleToggle}
          className={`${toggle ? "hidden" : "block"}`}
        />
        <IoMdClose
          onClick={handleToggle}
          className={`${toggle ? "block" : "hidden"}`}
        />
      </div>
      <div className="hidden md:flex md:flex-row md:space-x-6">
        {navItems.map((item) => (
          <div key={item.id}>
            <NavLink
              to={item.path}
              className="cursor-pointer text-md text-[#626262] font-sans"
            >
              {item.list}
            </NavLink>
          </div>
        ))}
      </div>
      <Link
        to={"/"}
        className="block md:hidden"
        onClick={() => handleTogglel()}
      >
        <h2 className="text-2xl" style={{ fontFamily: "Pacifico, cursive" }}>
          Emagica
        </h2>
      </Link>
      <div className="md:hidden">
        <div
          className={`absolute flex flex-col gap-4 w-full px-3 py-4 top-12 left-0 bg-slate-100 ${
            toggle ? "block" : "hidden"
          }`}
        >
          {navItems.map((item) => (
            <div key={item.id}>
              <NavLink
                onClick={() => handleToggle()}
                to={item.path}
                className="cursor-pointer text-md text-[#626262] font-sans"
              >
                {item.list}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      {isLoggedIn ? (
        <Dropdown>
          <DropdownTrigger>
            <Button onClick={handleTogglel} isIconOnly radius="full">
              <Avatar
                sx={{ bgcolor: deepOrange[500] }}
                alt="User Avatar"
                className="cursor-pointer"
              >
                {currentUser}
              </Avatar>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions">
            <DropdownItem key="profile" onClick={handleProfile}>
              Profile
            </DropdownItem>
            <DropdownItem key="upload" onClick={handleUpload}>
              Upload Post
            </DropdownItem>
            <DropdownItem
              key="logout"
              className="text-danger"
              color="danger"
              onClick={handlLogout}
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Link
          to="/login"
          className="cursor-pointer text-md text-[#626262] font-sans "
        >
          <Button color="primary" variant="bordered">
            Login
          </Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
