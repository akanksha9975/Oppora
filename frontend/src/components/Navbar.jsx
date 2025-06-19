import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  const { setShowRecruiterLogin } = useContext(AppContext);




return (
  <div className="shadow-md bg-gradient-to-r from-teal-300 to-emerald-400 py-5">
    <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">



{/* <div 
  onClick={() => navigate("/")}
  className="cursor-pointer group flex items-center gap-2 transition-all duration-300 hover:scale-105"
>
  <div className="w-10 h-10 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
    <span className="text-white font-bold text-xl">O</span>
  </div>
  <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-700 bg-clip-text text-transparent">
    Oppora
  </span>
</div> */}





<div 
  onClick={() => navigate("/")}
  className="cursor-pointer group flex items-center gap-3 transition-all duration-500 hover:scale-[1.02]"
>
  {/* Infinity Symbol Logo */}
  <div className="relative w-12 h-12">
    <div className="absolute w-full h-full rounded-full border-[3px] border-transparent bg-clip-padding before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-teal-400 before:to-emerald-600 before:p-[3px] before:content-['']">
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full text-emerald-600 rotate-[-8deg] group-hover:rotate-0 transition-transform duration-700"
      >
        <path 
          d="M20,50 Q35,15 50,50 Q65,85 80,50 Q65,15 50,50 Q35,85 20,50" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="8" 
          strokeLinecap="round"
          className="group-hover:stroke-[url(#logoGradient)] transition-all duration-500"
        />
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>

  {/* Text Logo */}
  <div className="flex flex-col">
    <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-700 bg-clip-text text-transparent tracking-tight">
      Oppora
    </span>
    <span className="text-xs text-gray-500 font-medium tracking-wider group-hover:text-emerald-600 transition-colors duration-300">
      Infinite Opportunities
    </span>
  </div>
</div>


      {user ? (
        <div className="flex items-center gap-5 text-gray-700">
          <Link
            to={"/applications"}
            className="hover:text-emerald-600 font-medium transition duration-200"
          >
            Applied Jobs
          </Link>
          <p className="text-gray-400">|</p>
          <p className="max-sm:hidden text-sm font-semibold text-gray-800">
            Hi, {user.firstName}
          </p>
          <UserButton />
        </div>
      ) : (
        <div className="flex gap-6 max-sm:text-sm">
          <button
            onClick={() => setShowRecruiterLogin(true)}
            className="text-gray-600 hover:text-emerald-600 font-medium transition duration-200"
          >
            Recruiter Login
          </button>
          <button
            onClick={(e) => openSignIn()}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 sm:px-8 py-2 rounded-full shadow-sm hover:shadow-md transition duration-200"
          >
            User Login
          </button>
        </div>
      )}
    </div>
  </div>
);


};

export default Navbar;
