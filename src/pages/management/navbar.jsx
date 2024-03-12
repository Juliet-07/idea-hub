import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import Logo from "../../assets/logos.png";
import { PiEnvelopeLight } from "react-icons/pi";

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
      <div className="flex items-center gap-10">
        {/* <NavLink to="/management" style={activeStyle}>
          <div className="flex flex-col items-center justify-center mr-2">
            <BiHomeAlt2 size={30} />
            <span>Home</span>
          </div>
        </NavLink> */}
        {/* <NavLink to="/groups" style={activeStyle}>
          <div className="flex flex-col items-center justify-center mr-2">
            <PiEnvelopeLight size={30} />
            <span>Groups</span>
          </div>
        </NavLink> */}
      </div>
    </div>
  );
};

export default Navbar;
