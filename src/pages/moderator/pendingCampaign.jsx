import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BiDotsVertical } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoTrashBinSharp } from "react-icons/io5";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import { toast } from "react-toastify";

("http://192.168.207.18:1230/api/Moderators/GetAllPendingCampaigns");

const PendingCampaign = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_GET_IDEA_HUB_MODERATOR;
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const tableRef = useRef(null);
  const [pendingCampaign, setPendingCampaign] = useState([]);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = pendingCampaign.slice(firstIndex, lastIndex);
  const npages = Math.ceil(pendingCampaign.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const GetPendingCampaigns = () => {
    const url = `${apiURL}/GetAllPendingCampaigns`;
    axios.get(url).then((response) => {
      console.log(response.data, "Pending Campaign");
      setPendingCampaign(response.data.responseValue);
    });
  };

  useEffect(() => {
    GetPendingCampaigns();
  }, []);

  const prevPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const ViewCampaignDetails = (idea) => {
    // Navigate to the new page and pass the data through state
    console.log("campaignDetails called with:", idea);
    navigate("/details", { state: { idea } });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-6">
        <div className="font-bold text-2xl uppercase mb-2">
          idea campaign for approval
        </div>
        <div className="w-full rounded-lg bg-white p-4 max-w-full overflow-x-auto">
          <div className="flex flex-col items-center justify-center">
            <table
              ref={tableRef}
              className="table bg-white text-sm text-left text-black px-4 w-full"
            >
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold rounded-lg">
                <th className="p-4">Campaign Category</th>
                <th className="p-4">Campaign Name</th>
                <th className="p-4">Initiated By</th>
                <th className="p-4">Initiator Branch</th>
                <th className="p-4">Date Initiated</th>
                <th className="p-4"></th>
                <th className="p-4"></th>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((idea, index) => {
                    return (
                      <tr>
                        <td className="p-4">{idea.campaignCategory}</td>
                        <td className="p-4">{idea.campaignName}</td>
                        <td className="p-4">{idea.createdBy}</td>
                        <td className="p-4">{idea.initiatorBranch}</td>
                        <td className="p-4">{idea.createdDate}</td>
                        <button
                          onClick={() => ViewCampaignDetails(idea)}
                          className="w-full h-10 bg-red-600 rounded-lg text-white font-semibold my-2"
                        >
                          View details
                        </button>
                      </tr>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center text-xl font-semibold">
                    No Pending Campaign!
                  </div>
                )}
              </tbody>
            </table>
            <nav>
              <ul className="flex flex-row items-center">
                <li>
                  <MdSkipPrevious
                    size={20}
                    onClick={prevPage}
                    className="cursor-pointer"
                  />
                </li>
                {numbers.map((n, i) => (
                  <li key={i} className="p-2">
                    <a href="#" onClick={() => changeCurrentPage(n)}>
                      {n}
                    </a>
                  </li>
                ))}
                <li>
                  <MdSkipNext
                    size={20}
                    onClick={nextPage}
                    className="cursor-pointer"
                  />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingCampaign;
