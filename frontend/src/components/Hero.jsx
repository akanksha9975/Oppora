import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../contexts/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const handleSearch = ()=>{
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value
    })
    setIsSearched(true)
    console.log({
      title: titleRef.current.value,
      location: locationRef.current.value
    })
  }



return (
  <div className="container 2xl:px-20 mx-auto my-10">
    <div className="bg-gradient-to-r from-teal-800 to-emerald-900 text-white py-20 text-center mx-2 rounded-2xl shadow-lg">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 tracking-wide">
        Over 10,000+ jobs to apply
      </h2>
      <p className="mb-10 max-w-2xl mx-auto text-base md:text-lg font-light text-gray-100 px-6">
        Unlock Your Dream Career Today - Discover Top Job Opportunities and Kickstart Your Future Journey!
      </p>
      <div className="flex items-center justify-between bg-white/90 rounded-lg text-gray-700 max-w-2xl pl-5 mx-4 sm:mx-auto backdrop-blur-sm">
        <div className="flex items-center flex-1">
          <img className="h-5 sm:h-6" src={assets.search_icon} alt="" />
          <input
            className="text-sm sm:text-base p-3 rounded-l outline-none w-full bg-transparent"
            type="text"
            placeholder="Search for jobs"
            ref={titleRef}
          />
        </div>
        <div className="flex items-center flex-1 border-l border-gray-300">
          <img className="h-5 sm:h-6" src={assets.location_icon} alt="" />
          <input
            className="text-sm sm:text-base p-3 outline-none w-full bg-transparent"
            type="text"
            placeholder="Location"
            ref={locationRef}
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-r text-white transition duration-200 m-1"
        >
          Search
        </button>
      </div>
    </div>





    {/* <div className="border border-gray-200 shadow-lg mx-2 mt-8 p-6 rounded-xl flex justify-center items-center">
      <div className="flex justify-center gap-8 lg:gap-12 flex-wrap">
        <p className="font-semibold text-gray-800">Trusted by</p>
        <img className="h-8" src={assets.microsoft_logo} alt="" />
        <img className="h-8" src={assets.walmart_logo} alt="" />
        <img className="h-8" src={assets.accenture_logo} alt="" />
        <img className="h-8" src={assets.samsung_logo} alt="" />
        <img className="h-8" src={assets.amazon_logo} alt="" />
        <img className="h-8" src={assets.adobe_logo} alt="" />
      </div>
    </div> */}


<div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-emerald-100 shadow-sm mx-auto mt-12 p-8 rounded-2xl max-w-6xl">
  <div className="flex flex-col items-center">
    <p className="text-emerald-700 font-medium mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      Trusted by leading companies worldwide
    </p>
    
    <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-12 px-4">
      <img className="h-8 opacity-80 hover:opacity-100 transition duration-300" src={assets.microsoft_logo} alt="Microsoft" />
      <img className="h-8 opacity-80 hover:opacity-100 transition duration-300" src={assets.walmart_logo} alt="Walmart" />
      <img className="h-8 opacity-80 hover:opacity-100 transition duration-300" src={assets.accenture_logo} alt="Accenture" />
      <img className="h-8 opacity-80 hover:opacity-100 transition duration-300" src={assets.samsung_logo} alt="Samsung" />
      <img className="h-8 opacity-80 hover:opacity-100 transition duration-300" src={assets.amazon_logo} alt="Amazon" />
      <img className="h-8 opacity-80 hover:opacity-100 transition duration-300" src={assets.adobe_logo} alt="Adobe" />
    </div>
    
    <div className="mt-6 text-xs text-emerald-600/70">
      Partner companies hiring through our platform
    </div>
  </div>
</div>


  </div>
);

};



export default Hero;
