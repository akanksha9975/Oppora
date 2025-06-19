import React, { useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../contexts/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();

  const { companyData, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  // Funtion to logout for company
  const logout = () => {
    setCompanyToken(null);
    localStorage.removeItem("companyToken");
    setCompanyData(null);
    navigate("/");
  };

  useEffect(() => {
    if (companyData) {
      navigate("/dashboard/manage-jobs");
    }
  }, [companyData]);





return (
    <div className="min-h-screen">
      {/* Navbar for Recruiter Panel */}
      <div className="shadow-md bg-gradient-to-r from-teal-300 to-emerald-400 py-4">
        <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">





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



          {companyData && (
            <div className="flex items-center gap-5 text-gray-700">
              <p className="max-sm:hidden text-sm font-semibold text-gray-800">
                Welcome, {companyData.name}
              </p>
              <div className="relative group">
                <img
                  className="w-8 border rounded-full hover:opacity-80 transition duration-200"
                  src={companyData.image}
                  alt="profile"
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 rounded pt-12">
                  <ul className="list-none m-0 p-2 bg-white rounded-md border shadow-md text-sm">
                    <li
                      onClick={logout}
                      className="py-1 px-4 cursor-pointer hover:bg-emerald-50 rounded text-gray-700 hover:text-emerald-600 transition duration-200"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start">
        {/* Left Sidebar with options */}
        <div className="inline-block min-h-screen border-r-2 border-emerald-100">
          <ul className="flex flex-col items-start pt-5 text-gray-800">
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-emerald-50 transition duration-200 ${
                  isActive && "bg-emerald-100 border-r-4 border-emerald-500"
                }`
              }
              to={"/dashboard/add-job"}
            >
              <img className="min-w-4" src={assets.add_icon} alt="add icon" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-emerald-50 transition duration-200 ${
                  isActive && "bg-emerald-100 border-r-4 border-emerald-500"
                }`
              }
              to={"/dashboard/manage-jobs"}
            >
              <img className="min-w-4" src={assets.home_icon} alt="home icon" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-emerald-50 transition duration-200 ${
                  isActive && "bg-emerald-100 border-r-4 border-emerald-500"
                }`
              }
              to={"/dashboard/view-applications"}
            >
              <img className="min-w-4" src={assets.person_tick_icon} alt="applications icon" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>
        <div className="flex-1 h-full p-2 sm:p-5 bg-gradient-to-br from-teal-50 to-emerald-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;