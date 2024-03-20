import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";

// http://192.168.207.18:1230/api/ExecutiveManagers/GetTopInnovationLeaderboard

const Management = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_GET_IDEA_HUB_MANAGEMENT;
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [initials, setInitials] = useState("");
  const [management, setManagement] = useState([]);
  const [summary, setSummary] = useState({});

  const GetInteractionSummary = () => {
    const url = `${apiURL}/GetInteractionSummary`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setSummary(response.data);
      })
      .catch((err) => console.log(err));
  };

  const infoCards = [
    {
      icon: "icon",
      figure: summary.totalUsers,
      description: "Total users",
    },
    {
      icon: "icon",
      figure: summary?.totalInteractions?.totalCampaignLikes,
      description: "Total votes",
    },
    {
      icon: "icon",
      figure: summary?.totalInteractions?.totalApprovedPosts,
      description: "Total posts approved",
    },
    {
      icon: "icon",
      figure:
        summary?.totalInteractions?.totalDeclinedPosts === 0
          ? "0"
          : summary?.totalInteractions?.totalDeclinedPosts?.toString() ?? "0",
      description: "Total posts declined",
    },
  ];

  const GetMyCampaigns = () => {
    const url = `${apiURL}/GetTopInnovationLeaderboard`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.responseValue);
        setManagement(response.data.responseValue);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const _initials = user.name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
    setInitials(_initials);
    GetMyCampaigns();
    GetInteractionSummary();
  }, []);
  return (
    <>
      <Navbar />
      <div className="py-10 bg-slate-100/50">
        <div className="w-full h-full flex bg-green-5">
          {/* User Profile Card */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-[326px] h-[489px] bg-white rounded-xl shadow border mx-20 flex flex-col items-center justify-center gap-10">
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[#E43625] text-white text-3xl flex items-center justify-center p-2 font-medium font-mono">
                  {initials}
                </div>
                <div className="py-2 font-semibold">{user.name}</div>
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
            {/* info card */}
            <div className="grid grid-cols-4">
              {infoCards.map((card) => (
                <div className="bg-white rounded-xl w-[210.8px] h-[94.39px] border shadow-lg flex items-center px-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-[#DB1600] mr-4">
                    {card.icon}
                  </div>
                  <div className="">
                    <p className="font-bold font-sans">{card.figure}</p>
                    <p className="font-medium text-[#232323] font-mono text-sm">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* table */}
            <div className="w-full p-4 bg-white rounded-xl flex flex-col items-center shadow-lg border my-10">
              <div className="w-full flex items-center justify-between">
                <p className="text-[#001F54] text-lg font-mono">
                  Leadership board
                </p>
                <p></p>
              </div>
              <table className="w-full table bg-white text-sm text-left text-gray-500 dark:text-gray-400 px-4">
                <thead className="text-xs font-mono text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th className="p-4">Employee Name</th>
                    <th className="p-4">Rank</th>
                    <th className="p-4">Coin</th>
                    <th className="p-4">Strikes</th>
                    <th className="p-4">Status</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {management.length > 0 &&
                    management.map((user, index) => {
                      return (
                        <tr key={index}>
                          <td className="px-6 whitespace-nowrap">
                            {`${user?.StaffName}`}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            {user?.Rank}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            {user?.TotalCoins}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            {user?.branch}
                          </td>
                          <td
                            className={`p-4 whitespace-nowrap ${
                              user?.isActive ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {/* {user?.isActive ? "Active" : "Inactive"} */}
                          </td>
                          <td className="p-4 text-black cursor-pointer">
                            {/* <FaEye
                          onClick={() => {
                            setSelectedRowData(user?.userID);
                            navigate(`/userPage/${user?.userID}`);
                          }}
                        /> */}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Management;
