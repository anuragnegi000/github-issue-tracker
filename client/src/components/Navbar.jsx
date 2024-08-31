import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = (e) =>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('UserId');
    setTimeout(()=>{
        navigate('/signin');
    },1000);
}
  return (
    <div className="flex justify-center items-center z-10 absolute">
        <button onClick={handleLogout} className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">LOGOUT</button>
    </div>
  );
};

