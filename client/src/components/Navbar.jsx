import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("UserId");
    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };
  return (
    <div className="flex grid-cols-3 justify-center items-center w-full z-10 absolute gap-4 mt-2">
      <div className="w-1/2">

      </div>
      <div className="flex justify-evenly w-full">
        <a className="text-xl font-semi-bold text-white hover:cursor-pointer">Home</a>
        <a className="text-xl font-semi-bold text-white hover:cursor-pointer">User-Guide </a>
        <a className="text-xl font-semi-bold text-white" href="">About Us </a>
      </div>
      <div className="flex justify-end w-1/2">
        <img href="dad" src="https://avatars.githubusercontent.com/u/115611556?v=4" alt="user" className="m-2 mr-2 w-8 h-8 rounded-full" />
        <button
          onClick={handleLogout}
          className="mt-2 text-black bg-white  focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-4 py-1 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}
