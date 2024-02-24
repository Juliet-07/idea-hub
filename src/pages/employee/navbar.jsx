import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiHomeAlt2 } from "react-icons/bi";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { CiSaveDown2 } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FiSettings, FiAlertCircle } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrLanguage } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  MdOutlineFilterAltOff,
  MdOutlineHelpOutline,
  MdRealEstateAgent,
  MdOutlinePersonRemoveAlt1,
} from "react-icons/md";
import { VscRequestChanges } from "react-icons/vsc";

import Logo from "../../assets/logos.png";

const Navbar = () => {
  const activeStyle = ({ isActive }) => {
    return {
      color: isActive ? "#E43625" : "black",
      // backgroundColor: isActive ? "#05A3A3" : "black",
    };
  };

  return (
    <div className="w-full flex items-center justify-between px-20 h-20 bg-white border-b">
      <div className="w-[200px]">
        <img src={Logo} />
      </div>

      {/* Desktop Navigation Menu */}
      <div className="flex items-center gap-4">
        <NavLink to="/employee" style={activeStyle}>
          <div className="flex flex-col items-center justify-center mr-2">
            <BiHomeAlt2 />
            <span>Home</span>
          </div>
        </NavLink>
        <NavLink to="/groups" style={activeStyle}>
          <div className="flex flex-col items-center justify-center mr-2">
            <CiSaveDown2 />
            <span>Groups</span>
          </div>
        </NavLink>
        <div className="flex flex-col items-center justify-center mr-2">
          <IoMdNotificationsOutline />
          <span>Notifications</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
