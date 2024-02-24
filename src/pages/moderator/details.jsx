import React, { useState } from "react";
import Navbar from "./navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import { toast } from "react-toastify";
import axios from "axios";

const Details = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_GET_IDEA_HUB_MODERATOR;
  const location = useLocation();
  const ideaDetails = location.state && location.state.idea;
  console.log("passDetails:", ideaDetails);

  const handleAuthorization = async () => {
    let id;
    id = ideaDetails.campaignId;
    console.log(id, "campaign id");
    const urlApproved = `${apiURL}/UpdateCampaignApprovalStatus?campaignId=${id}&statusCode=${3}`;
    await axios
      .post(urlApproved)
      .then(
        (response) => (
          console.log(response, "response from authorizer"),
          toast.success("Authorization Status:" + response.data.responseMessage)
        )
      );
  };
  return (
    <>
      <Navbar />
      <div className="p-10">
        <div className="flex flex-col">
          <Link
            to="/moderator"
            className="flex items-center p-2 w-[85px] h-10 border border-gray-100 rounded-lg"
          >
            <TbArrowBackUp color="#475467" />
            <span className="text-gray-600 mx-2">Back</span>
          </Link>
          <div className="bg-white my-6 rounded border border-white shadow p-4">
            <div className="flex items-center justify-between text-[#7F7F7F]">
              <div className="flex items-center">
                <p className="w-[64px] h-[64px] bg-[#7F7F7F] rounded-full flex items-center justify-center text-white font-semibold text-2xl">
                  JL
                </p>
                <p className="px-3">{ideaDetails.createdBy}</p>
              </div>
              <p>{ideaDetails.postedDate}</p>
            </div>
            <div className="text-[#7F7F7F] my-4 text-2xl">
              {ideaDetails.campaignName}
            </div>
            <div className="font-normal text-[#7F7F7F] ">
              {ideaDetails.details}
            </div>
            <div className="flex items-center mt-10 mb-4">
              <div
                className="w-[150px] h-[44px] bg-[#339C18] text-white flex items-center justify-center rounded font-semibold cursor-pointer"
                onClick={handleAuthorization}
              >
                Approve
              </div>
              <div className="w-[150px] h-[44px] text-[#E43625] border border-[#E43625] flex items-center justify-center rounded font-semibold mx-3">
                Reject
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
