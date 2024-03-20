import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import axios from "axios";

const MyCampaigns = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_GET_IDEA_HUB_EMPLOYEE;
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [myCampaigns, setMyCampaigns] = useState([]);

  const GetMyCampaigns = () => {
    let staffEmail = user.givenname;
    const url = `${apiURL}/GetCampaignsByStaff?staffEmail=${staffEmail}@premiumtrustbank.com`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.responseValue);
        setMyCampaigns(response.data.responseValue);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GetMyCampaigns();
  }, []);
  return (
    <>
      <Navbar />
      <div className="py-10 bg-slate-100/50 flex flex-col items-center justify-center p-6">
        <div className="font-mono font-semibold text-xl my-4">My Campaigns</div>
        <div className="w-full p-4 bg-white rounded shadow-lg border">
          <table className="w-full table bg-white text-sm text-left text-gray-500 dark:text-gray-400 px-4 divide-y-4">
            <thead className="text-xs font-mono text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="p-4">Campaign Name</th>
                <th className="p-4">Campaign Category</th>
                <th className="p-4">Date Created</th>
                <th className="p-4">Stage</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {myCampaigns.length > 0 &&
                myCampaigns.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td className="p-4 whitespace-nowrap">
                        ${user?.campaignName}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {user?.campaignCategory}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {user?.createdDate}
                      </td>

                      <td
                        className={`p-4 whitespace-nowrap ${
                          user?.isActive ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {user?.statusCodeDescription}
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
    </>
  );
};

export default MyCampaigns;
