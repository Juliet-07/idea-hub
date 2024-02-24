import React from "react";
import Navbar from "./navbar";

const Management = () => {
  return (
    <>
      <Navbar />
      <div className="py-10 bg-slate-100/50">
        <div className="w-full h-full flex bg-green-5">
          {/* User Profile Card */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-[326px] h-[489px] bg-white rounded-xl shadow border mx-20 flex flex-col items-center justify-center gap-10">
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#E43625] text-white text-4xl flex items-center justify-center">
                  AN
                </div>
                <div className="py-2 font-semibold">Amaka Nwanze</div>
              </div>

              {/* <div className="flex">
              <p>posts</p>
              <p>votes</p>
            </div> */}
              <div className="w-[271px] h-10 flex items-center justify-center border border-[#E43625] text-[#E43625] rounded">
                Log out
              </div>
            </div>
            <div className="w-[326px] h-[363px] bg-white rounded-xl shadow border mx-20 flex flex-col items-center justify-center gap-10">
              top ideas
            </div>
          </div>

          {/* Campaign section:- Post Input and List */}
          <div className="w-[880px] flex flex-col bg-purple-60">
            <div className=" w-full">info card</div>
            {/* list */}
            <div>table</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Management;
