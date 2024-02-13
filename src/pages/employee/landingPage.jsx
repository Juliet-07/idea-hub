import React from "react";
import Navbar from "./navbar";

const Employee = () => {
  return (
    <>
      <Navbar />
      <div className="p-10">
        <div className="flex">
          <div className="w-[326.04px] h-[604.09px] bg-white rounded-xl shadow border mx-20 flex flex-col items-center justify-center gap-10">
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#E43625] text-white text-4xl flex items-center justify-center">
                AN
              </div>
              <div className="py-2 font-semibold">Amaka Nwanze</div>
            </div>

            <div className="flex">
              <p>psots</p>
              <p>votes</p>
            </div>
            <div className="w-[271.7px] h-10 flex items-center justify-center bg-[#E43625] text-white rounded">Leaderboard</div>
          </div>
          <div className="flex flex-col">
            <div>search button</div>
            <div>posts</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee;
