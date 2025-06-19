import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {







return (
    <div className="bg-gradient-to-r from-teal-50 to-emerald-100 border-t border-emerald-200">
      <div className="container px-4 2xl:px-20 mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 py-8">
        {/* Logo Section */}
        <div className="flex items-center gap-4">









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



          <p className="border-l border-emerald-300 pl-4 text-sm text-emerald-700 max-sm:hidden">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-3">

{/* 
          <a href="#" className="group">


            <img 
              width="36" 
              src={assets.facebook_icon} 
              alt="Facebook" 
              className="opacity-70 hover:opacity-100 transition duration-200 group-hover:scale-110"
            />
     </a> */}


<a 
  href="https://www.facebook.com/akanksha01" 
  target="_blank" 
  rel="noopener noreferrer"
  className="group"
>
  <img 
    width="36" 
    src={assets.facebook_icon} 
    alt="Facebook" 
    className="opacity-70 hover:opacity-100 transition duration-200 group-hover:scale-110"
  />
</a>


          {/* <a href="#" className="group">
            <img 
              width="36" 
              src={assets.twitter_icon} 
              alt="Twitter" 
              className="opacity-70 hover:opacity-100 transition duration-200 group-hover:scale-110"
            />
          </a> */}



          <a 
  href="https://x.com/Akanksha9975?t=XV-1dWCcP--O14YrarqAaw&s=09 " 
  target="_blank" 
  rel="noopener noreferrer"
  className="group"
>
  <img 
    width="36" 
    src={assets.twitter_icon} 
    alt="Facebook" 
    className="opacity-70 hover:opacity-100 transition duration-200 group-hover:scale-110"
  />
</a>


{/* 
          <a href="#" className="group">
            <img 
              width="36" 
              src={assets.instagram_icon} 
              alt="Instagram" 
              className="opacity-70 hover:opacity-100 transition duration-200 group-hover:scale-110"
            />
          </a> */}


<a 
  href="https://www.instagram.com/ak_anksha9337?igsh=a2t5bjFoOWYzeXJ4" 
  target="_blank" 
  rel="noopener noreferrer"
  className="group"
>
  <img 
    width="36" 
    src={assets.instagram_icon} 
    alt="Facebook" 
    className="opacity-70 hover:opacity-100 transition duration-200 group-hover:scale-110"
  />
</a>


{/* <a 
  href="https://www.linkedin.com/in/akanksha-b52b39257/" 
  target="_blank" 
  rel="noopener noreferrer"
  className="group"
>
  <img 
    width="36" 
    src={assets.linkedin_icon} 
    alt="Facebook" 
    className="opacity-70 hover:opacity-100 transition duration-200 group-hover:scale-110"
  />
</a> */}



        </div>

        {/* Mobile Copyright Text */}
        <p className="text-sm text-emerald-700 sm:hidden text-center mt-2">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
