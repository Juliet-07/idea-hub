import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_AD_BASEURL;
  const APP_ID = import.meta.env.VITE_REACT_APP_IDEA_HUB_APP_ID;
  const navigate = useNavigate();
  const { handleSubmit } = useForm();

  const initialValues = {
    userName: "",
    password: "",
  };
  const [loginDetails, setLoginDetails] = useState(initialValues);

  const { userName, password } = loginDetails;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const [loading, setLoading] = useState(false);

  // function to validate user through ActiveDirectory
  const handleLoginValidation = () => {
    try {
      fetch(`${apiURL}/AuthenticateUser`, {
        method: "POST",
        body: JSON.stringify(loginDetails),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((user) => {
          console.log(user, "confirm here");
          window.alert(user.message);
          let userDetail = JSON.stringify(user.data);
          localStorage.setItem("userInfo", userDetail);
          if (user.message) {
            handleRole();
          } else alert("User does not exist");
          //   if (user.message === "User Authenticated Successfully") {
          //     navigate("/applications");
          //   }
          //   if (user.status === "99") {
          //     alert(user.message);
          //     navigate("/");
          //   }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const loginInfo = JSON.parse(localStorage.getItem("userInfo"));
  const handleRole = async () => {
    // let email = loginInfo.givenname;
    // let email = "Sarah.Omoike";
    let email = "Tolulope.Buraimoh";
    let user;
    let url = `http://192.168.201.57:449/api/UserApplications/getUserRoleByEmail&AppId?AppId=${APP_ID}&email=${email}@premiumtrustbank.com`;
    try {
      //   setShowSplash(true);
      const response = await axios.get(url);
      console.log(response.data, "User Info IdeaHub");
      user = response.data;
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // navigation
      if (user.data === null && user.responseMessage === "User Not Profiled") {
        return navigate("/employee");
      }
      // if (user.roleDescription === "Employee") {
      //   return navigate("/employee");
      // }
      if (user.roleDescription === "Moderator") {
        return navigate("/moderator");
      }
      if (user.roleDescription === "Management") {
        return navigate("/management");
      }
      if (user.roleDescription === "IT") {
        return navigate("/it-team");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="m-10 cursor-pointer" onClick={() => navigate("/")}>
        <IoMdArrowBack size={30} color="red" />
      </div>
      <div className="flex items-center justify-center">
        <div className="w-[687px] rounded-xl shadow-xl shadow-slate-400/50 bg-white flex flex-col items-center justify-between border">
          <p className="py-4 text-3xl font-medium">Login</p>
          <form
            onSubmit={handleSubmit(handleLoginValidation)}
            className="w-[421px]"
          >
            <div className="mt-4">
              <input
                type="text"
                className="block w-full h-[56px] px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="userName"
                value={userName}
                onChange={handleChange}
                required
                placeholder="Username"
              />
            </div>
            <div className="mt-6">
              <input
                type="password"
                className="block w-full h-[56px] px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <div className="mt-10 mb-6">
              <button
                type="submit"
                className="w-full h-[48px] px-4 py-2 font-medium tracking-wide text-white bg-[#E43625] rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                onClick={() => setLoading(!loading)}
              >
                Login
              </button>
              {/* <div className="flex items-center justify-center mt-2">
                <CircleLoader loading={loading} color="red" />
              </div> */}
              {/* <Loader /> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
