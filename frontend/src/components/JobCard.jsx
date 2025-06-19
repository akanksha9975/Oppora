import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import DOMPurify from 'dompurify';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const truncateHTML = (html, maxLength) => {
    const div = document.createElement('div');
    div.innerHTML = DOMPurify.sanitize(html);
    const text = div.textContent || div.innerText || '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };



return (
    <div className="border border-emerald-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 bg-white">
      <div className="flex justify-between items-center">
        <img 
          className="h-10 w-10 object-contain rounded-lg border border-emerald-100" 
          src={job.companyId.image} 
          alt={job.companyId.name} 
        />
      </div>
      <h4 className="font-semibold text-xl mt-4 text-emerald-800">{job.title}</h4>
      <div className="flex items-center gap-3 mt-3 text-xs">
        <span className="bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full text-emerald-700">
          {job.location}
        </span>
        <span className="bg-teal-50 border border-teal-100 px-3 py-1.5 rounded-full text-teal-700">
          {job.level}
        </span>
      </div>
      <p className="text-gray-600 text-sm mt-4 line-clamp-3">
        {truncateHTML(job.description, 150)}
      </p>
      <div className="mt-6 flex gap-4 text-sm">
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition duration-200 flex-1"
        >
          Apply Now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="text-emerald-600 hover:text-emerald-700 border border-emerald-200 hover:border-emerald-300 rounded-lg px-5 py-2.5 hover:bg-emerald-50 transition duration-200 flex-1"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;