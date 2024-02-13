import React from "react";
import Logo from "../../assets/logos.png";

const Navbar = () => {
  return (
    <div className="w-full bg-white h-20 px-10 py-2 flex items-center justify-between shadow">
      <div className="w-[200px]">
        <img src={Logo} />
      </div>
      {/* <div>urls</div> */}
    </div>
  );
};

export default Navbar;
