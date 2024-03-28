import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Navbar from "./navbar";
import Modal from "../../components/Modal";
import Select from "react-select";
import { toast } from "react-toastify";
import { AiOutlineLike } from "react-icons/ai";
import { MdInsertComment } from "react-icons/md";

const Employee = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_GET_IDEA_HUB_EMPLOYEE;
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { handleSubmit } = useForm();
  const [initials, setInitials] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [modal, setModal] = useState(false);
  const [campaignNames, setCampaignNames] = useState([]);
  const [selectedCampaignName, setSelectedCampaignName] = useState("");
  const [details, setDetails] = useState("");
  const [campaignCategory, setCampaignCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [additionalFields, setAdditionalFields] = useState([]);
  const [inputValue, setValue] = useState("");
  const [inputValue1, setValue1] = useState("");
  const [inputValue2, setValue2] = useState("");
  const [inputValue3, setValue3] = useState("");
  const [commentInputs, setCommentInputs] = useState("");
  const [likedCampaigns, setLikedCampaigns] = useState([]);

  // handleChange for Key Features
  const handleAddField = () => {
    if (additionalFields.length < 5) {
      setAdditionalFields([...additionalFields, { value: "" }]);
    }
  };

  const handleInputChange = (index, event) => {
    const updatedFields = [...additionalFields];
    updatedFields[index] = { value: event.target.value };
    setAdditionalFields(updatedFields); // Assuming setAdditionalFields is a function to update the state
  };

  //   handle selection for Campaign names
  const handleCampaignNameInputChange = (value) => {
    setValue3(value);
  };
  const handleSelectCampaignName = (value) => {
    console.log(value, "values");
    setSelectedCampaignName(value);
    console.log(selectedCampaignName, "campaign names");
  };

  //   handle selection for Category
  const handleCategoryInputChange = (value) => {
    setValue(value);
  };
  const handleSelectCategoryChange = (value) => {
    console.log(value, "values");
    setSelectedCategory(value);
    console.log(selectedCategory, "categories");
  };

  //   handle selection for Groups
  const handleGroupInputChange = (value) => {
    setValue1(value);
  };
  const handleSelectGroupChange = (value) => {
    console.log(value, "values");
    setSelectedGroup(value);
    console.log(selectedGroup, "departments");
  };

  //   handle selection for Branches
  const handleBranchInputChange = (value) => {
    setValue2(value);
  };
  const handleSelectBranchChange = (value) => {
    console.log(value, "values");
    setSelectedBranch(value);
    console.log(selectedBranch, "branches");
  };

  const handleCommentChange = (ideaId, value) => {
    setCommentInputs({ ...commentInputs, [ideaId]: value });
  };

  const getIdeas = () => {
    const url = `${apiURL}/GetApprovedCampaignsForAllEmployees`;
    axios.get(url).then((response) => {
      console.log(response, "for ideas");
      setIdeas(response.data.responseValue);
    });
  };

  const getCampaignNames = () => {
    let campaignName;
    let campaignNameValue;
    const url = `${apiURL}/GetCampaignTitleList`;
    axios.get(url).then((response) => {
      console.log(response);
      campaignName = response.data.responseValue;
      campaignNameValue = campaignName.map((campaignNames) => {
        return {
          value: campaignNames.CampaignId,
          label: campaignNames.CampaignName,
        };
      });
      setCampaignNames(campaignNameValue);
    });
  };

  const getCategories = () => {
    let category;
    let categoryValue;
    const url = `${apiURL}/GetCampaingnCategoryList`;
    axios.get(url).then((response) => {
      console.log(response);
      category = response.data.responseValue;
      categoryValue = category.map((categories) => {
        return {
          value: categories.CatergoryId,
          label: categories.CatergoryName,
        };
      });
      setCampaignCategory(categoryValue);
    });
  };

  const getDepartments = () => {
    const url = "http://192.168.207.18:8080/api/ActiveDirectory/GetDepartments";
    let details;
    let group;
    axios.get(url).then((response) => {
      console.log(response.data.data, "users");
      details = response.data.data;
      group = details.map((dept) => {
        return { value: dept.email, label: dept.fullName };
      });
      setGroups(group);
      console.log(group, "departments");
    });
  };

  const getBranches = () => {
    const url = "http://192.168.207.18:8077/api/Branches/GetBranches";
    let details;
    let branch;
    axios.get(url).then((response) => {
      console.log(response.data.data, "users");
      details = response.data.data;
      branch = details.map((branch) => {
        return { value: branch.branchCode, label: branch.branchName };
      });
      setBranches(branch);
      console.log(branch, "branches");
    });
  };

  useEffect(() => {
    const _initials = user.name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
    setInitials(_initials);
    getIdeas();
    getCategories();
    getDepartments();
    getBranches();
    getCampaignNames();
    console.log(selectedCategory, "selected category");
    console.log(selectedGroup, "selected group");
    console.log(selectedBranch, "selected branch");
    console.log(selectedCampaignName, "selected campaignNames");
  }, [selectedCategory, selectedGroup, selectedBranch, selectedCampaignName]);

  const postCampaign = () => {
    const url = `${apiURL}/PostNewCampaign`;
    const payload = {
      details: details,
      campaignName: selectedCampaignName.label,
      campaignId: selectedCampaignName.value,
      campaignCategory: selectedCategory.label,
      groupOwner: selectedGroup.label,
      createdBy: `${user.givenname}@premiumtrustbank.com`,
      initiatorBranch: selectedBranch.label,
      keyFeatures: additionalFields.map((field) => field.value),
    };
    console.log(payload);
    axios.post(url, payload).then((response) => {
      console.log(response, "response from posting campaign");
      toast.success(response.data.responseMessage);
    });
  };

  const postComment = (e, idea) => {
    const url = `${apiURL}/AddNewCommentOnCampaign`;
    const payload = {
      campaignId: idea.campaignId,
      comment: commentInputs[idea.campaignId],
      commentedBy: user.name,
    };
    console.log(payload);
    axios.post(url, payload).then((response) => {
      console.log(response, "response from posting campaign");
      toast.success(response.data.responseMessage);
      setCommentInputs({ ...commentInputs, [idea.campaignId]: "" });
    });
  };

  const likePost = (e, idea) => {
    const id = idea.campaignId;
    const url = `${apiURL}/IncreaseCampaignLikesCount?campaignId=${id}`;
    axios.get(url).then((response) => {
      console.log(response, "response from liking campaign");
      toast.success(response.data.responseMessage);
      if (likedCampaigns.includes(id)) {
        setLikedCampaigns(
          likedCampaigns.filter((campaignId) => campaignId !== id)
        );
      } else {
        setLikedCampaigns([...likedCampaigns, id]);
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="py-10 bg-slate-100/50 font-mono">
        <div className="w-full h-screen flex bg-green-5">
          {/* User Profile Card */}
          <div className="w-[326.04px] h-[604.09px] bg-white rounded-xl shadow border mx-20 flex flex-col items-center justify-center gap-10">
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
            <div className="w-[271.7px] h-10 flex items-center justify-center bg-[#E43625] text-white rounded">
              Leaderboard
            </div>
          </div>
          {/* Campaign section:- Post Input and List */}
          <div className="w-[880px] flex flex-col bg-purple-60">
            <div className="relative w-full" onClick={() => setModal(true)}>
              <input
                className="appearance-none block w-full text-gray-700 rounded-full p-4 pr-10 leading-tight focus:outline-none"
                type="text"
                name=""
                placeholder="Create something new"
                // value={startDate}
                // onChange={handleChange}
              />
              <button className="absolute inset-y-0 right-0 bg-[#E43625] text-white focus:outline-none mx-3 my-2 rounded-full w-[165.93px] h-[39.29px]">
                Suggest an idea
              </button>
            </div>
            {/* list */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              {ideas.length > 0 ? (
                ideas.map((idea) => (
                  <div className="bg-white my-6 rounded border border-white shadow p-4">
                    <div className="flex items-center justify-between text-[#7F7F7F]">
                      <div className="flex items-center">
                        <p className="w-[64px] h-[64px] bg-[#7F7F7F] rounded-full flex items-center justify-center text-white font-semibold text-2xl">
                          JL
                        </p>
                        <div className="px-3 flex flex-col">
                          <p className="text-[#111111] font-semibold">
                            {idea.createdBy}
                          </p>
                          <p className="text-[#111111] text-xs">
                            {idea.postedDate}
                          </p>
                        </div>
                      </div>
                      <p></p>
                    </div>
                    {/* <div className="text-[#7F7F7F] my-4 text-2xl">
                    ideaDetails.campaignName
                  </div> */}
                    <div className="font-normal text-[#7F7F7F] my-6">
                      {idea.details}
                    </div>
                    <div className="flex items-center justify-around border-t border-b border-gray-400 p-2">
                      <div
                        className="flex items-center text-red-600 cursor-pointer"
                        onClick={(e) => likePost(e, idea)}
                      >
                        <span>
                          <AiOutlineLike />
                        </span>
                        <p className="mx-2">Like</p>
                      </div>
                      <div className=" flex items-center">
                        <span className="mx-2">
                          <MdInsertComment />
                        </span>
                        <p>Comment</p>
                      </div>
                    </div>
                    <div className="mt-6 font-medium text-lg">
                      All Comments ({idea.commentsCount})
                    </div>
                    {idea.comments.length > 0 ? (
                      idea.comments.map((comment) => (
                        <div className="flex items-center my-4 overflow-y-auto">
                          <div className="w-[53.5px] h-[53.5px] bg-[#7F7F7F] rounded-full flex items-center justify-center text-white font-semibold text-2xl">
                            JL
                          </div>
                          <div className="flex flex-col mx-2">
                            <p>{comment.commentedBy}</p>
                            <p className="font-normal text-xs py-2">
                              {comment.comment}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="my-4">No comments here</div>
                    )}
                    <div>
                      <input
                        className="appearance-none block w-full text-gray-700 rounded-full p-2.5 px-4 leading-tight focus:outline-none bg-[#F0F2F5]"
                        placeholder="Write a comment"
                        value={commentInputs[idea.campaignId]}
                        onChange={(e) =>
                          handleCommentChange(idea.campaignId, e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            postComment(e, idea);
                          }
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div>No Campaigns</div>
              )}
            </div>
          </div>
        </div>
        <Modal isVisible={modal} onClose={() => setModal(false)}>
          <div className="p-3 flex flex-col items-center justify-center">
            <div className="uppercase text-xl">new campaign</div>
            <form className="w-[497px]" onSubmit={handleSubmit(postCampaign)}>
              <div className="mt-4">
                <label
                  htmlFor="details"
                  className="text-[#2b2e35] text-sm font-medium mb-2"
                >
                  Campaign Name
                </label>
                <Select
                  options={campaignNames}
                  defaultValue={selectedCampaignName}
                  onChange={handleSelectCampaignName}
                  onInputChange={handleCampaignNameInputChange}
                  isSearchable
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="details"
                  className="text-[#2b2e35] text-sm font-medium mb-2"
                >
                  Your Idea
                </label>
                <textarea
                  className="appearance-none block p-3 w-full text-sm text-gray-700 rounded border border-gray-400 focus:outline-none leading-tight"
                  name="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                />
                <label
                  htmlFor="details"
                  className="block text-[#D3D0D0] text-xs mb-2"
                >
                  Minimum of 300 words
                </label>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="details"
                  className="text-[#2b2e35] text-sm font-medium mb-2"
                >
                  Campaign Category
                </label>
                <Select
                  options={campaignCategory}
                  defaultValue={selectedCategory}
                  onChange={handleSelectCategoryChange}
                  onInputChange={handleCategoryInputChange}
                  isSearchable
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="details"
                  className="text-[#2b2e35] text-sm font-medium mb-2"
                >
                  User Group
                </label>
                <Select
                  options={groups}
                  defaultValue={selectedGroup}
                  onChange={handleSelectGroupChange}
                  onInputChange={handleGroupInputChange}
                  isSearchable
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="details"
                  className="text-[#2b2e35] text-sm font-medium mb-2"
                >
                  User Branch
                </label>
                <Select
                  options={branches}
                  defaultValue={selectedBranch}
                  onChange={handleSelectBranchChange}
                  onInputChange={handleBranchInputChange}
                  isSearchable
                />
              </div>
              {/* Additional dynamic fields */}
              {additionalFields.map((field, index) => (
                <div key={index} className="mt-6">
                  <input
                    className="appearance-none block w-full text-gray-700 rounded-full p-3 leading-tight focus:outline-none border border-gray-400"
                    placeholder={`Key Features ${index + 1}`}
                    name={`additionalField${index + 1}`}
                    value={field.value} // Set the value from the field object
                    onChange={(e) => handleInputChange(index, e)} // Call a function to handle the change
                  />
                </div>
              ))}
              <div className="mt-4 flex items-center">
                <button
                  type="button"
                  className="bg-green-500 text-white p-2 rounded"
                  onClick={handleAddField}
                >
                  Add Key Features
                </button>
                <p className="text-red-600 text-xs pl-2">
                  Kindly add at least one key feature for your campaign
                </p>
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  className="w-full h-[39.29px] font-bold tracking-wide text-white bg-[#E43625] uppercase"
                  // onClick={() => setLoading(!loading)}
                >
                  post campaign
                </button>

                {/* <Loader /> */}
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Employee;
