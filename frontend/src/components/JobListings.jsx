import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListings = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);
  const [showFilter, setShowFilter] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (event, category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (event, location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);

    const matchesLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);

    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);











//   return (
//     <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      
//       <div className="w-full lg:w-1/4 bg-white px-4">
     
//         {isSearched &&
//           (searchFilter.title !== "" || searchFilter.location !== "") && (
//             <>
//               <h3 className="font-medium text-lg mb-4">Current Search</h3>
//               <div className="mb-4 text-gray-600 ">
//                 {searchFilter.title && (
//                   <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
//                     {searchFilter.title}
//                     <img
//                       onClick={(e) =>
//                         setSearchFilter((prev) => ({ ...prev, title: "" }))
//                       }
//                       className="cursor-pointer"
//                       src={assets.cross_icon}
//                       alt=""
//                     />
//                   </span>
//                 )}
//                 {searchFilter.location && (
//                   <span className="ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
//                     {searchFilter.location}
//                     <img
//                       onClick={(e) =>
//                         setSearchFilter((prev) => ({ ...prev, location: "" }))
//                       }
//                       className="cursor-pointer"
//                       src={assets.cross_icon}
//                     />
//                   </span>
//                 )}
//               </div>
//             </>
//           )}
//         <button
//           onClick={() => setShowFilter((prev) => !prev)}
//           className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
//         >
//           {showFilter ? "Close" : "Filters"}
//         </button>
        
//         <div className={showFilter ? "" : "max-lg:hidden"}>
//           <h4 className="font-medium text-lg py-4">Search by categories</h4>
//           <ul className="space-y-4 text-gray-600">
//             {JobCategories.map((category, index) => (
//               <li className="flex gap-3 items-center" key={index}>
//                 <input
//                   onChange={(e) => handleCategoryChange(e, category)}
//                   checked={selectedCategories.includes(category)}
//                   className="scale-125"
//                   type="checkbox"
//                 />
//                 {category}
//               </li>
//             ))}
//           </ul>
//         </div>
        
//         <div className={showFilter ? "" : "max-lg:hidden"}>
//           <h4 className="font-medium text-lg py-4 pt-14">Search by location</h4>
//           <ul className="space-y-4 text-gray-600">
//             {JobLocations.map((location, index) => (
//               <li className="flex gap-3 items-center" key={index}>
//                 <input
//                   onChange={(e) => handleLocationChange(e, location)}
//                   checked={selectedLocations.includes(location)}
//                   className="scale-125"
//                   type="checkbox"
//                 />
//                 {location}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
     
//       <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
//         <h3 className="font-medium text-3xl py-2" id="job-list">
//           Latest Jobs
//         </h3>
//         <p className="mb-8">Get your desired job from top companies</p>
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//           {filteredJobs
//             .slice((currentPage - 1) * 6, currentPage * 6)
//             .map((job, index) => (
//               <JobCard key={index} job={job} />
//             ))}
//         </div>
        
//         {filteredJobs.length > 0 && (
//           <div className="flex items-center justify-center space-x-2 mt-10">
//             <a href="#job-list">
//               <img
//                 onClick={() => setCurrentPage(Math.max(currentPage - 1), 1)}
//                 src={assets.left_arrow_icon}
//                 alt=""
//               />
//             </a>
//             {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
//               (_, index) => (
//                 <a key={index} href="#job-list">
//                   <button
//                     onClick={() => setCurrentPage(index + 1)}
//                     className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
//                       currentPage === index + 1
//                         ? "bg-blue-100 text-blue-500"
//                         : "text-gray-500"
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 </a>
//               )
//             )}
//             <a href="#job-list">
//               <img
//                 onClick={() =>
//                   setCurrentPage(
//                     Math.min(
//                       currentPage + 1,
//                       Math.ceil(filteredJobs.length / 6)
//                     )
//                   )
//                 }
//                 src={assets.right_arrow_icon}
//                 alt=""
//               />
//             </a>
//           </div>
//         )}
//       </section>
//     </div>
//   );


// };

// export default JobListings;






return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8 px-4">
      {/* Filters Sidebar */}
      <div className="w-full lg:w-1/4 bg-white rounded-xl shadow-sm p-6 border border-emerald-50">
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="font-medium text-lg mb-4 text-emerald-800">Current Search</h3>
              <div className="mb-6 flex flex-wrap gap-2">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-emerald-700">
                    {searchFilter.title}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      className="cursor-pointer w-3 h-3 opacity-70 hover:opacity-100 transition"
                      src={assets.cross_icon}
                      alt="Remove filter"
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-full text-teal-700">
                    {searchFilter.location}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      className="cursor-pointer w-3 h-3 opacity-70 hover:opacity-100 transition"
                      src={assets.cross_icon}
                      alt="Remove filter"
                    />
                  </span>
                )}
              </div>
            </>
          )}
        
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="px-5 py-2 rounded-lg border border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition lg:hidden flex items-center gap-2 mb-4"
        >
          {showFilter ? (
            <>
              <span>Close Filters</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          ) : (
            <>
              <span>Show Filters</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
        
        <div className={showFilter ? "space-y-8" : "max-lg:hidden"}>
          <div>
            <h4 className="font-medium text-lg py-2 text-emerald-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              Search by categories
            </h4>
            <ul className="space-y-3 mt-4">
              {JobCategories.map((category, index) => (
                <li className="flex gap-3 items-center py-1.5" key={index}>
                  <input
                    onChange={(e) => handleCategoryChange(e, category)}
                    checked={selectedCategories.includes(category)}
                    className="h-4 w-4 text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500"
                    type="checkbox"
                    id={`category-${index}`}
                  />
                  <label htmlFor={`category-${index}`} className="text-gray-700 hover:text-emerald-600 cursor-pointer transition">
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg py-2 text-emerald-800 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Search by location
            </h4>
            <ul className="space-y-3 mt-4">
              {JobLocations.map((location, index) => (
                <li className="flex gap-3 items-center py-1.5" key={index}>
                  <input
                    onChange={(e) => handleLocationChange(e, location)}
                    checked={selectedLocations.includes(location)}
                    className="h-4 w-4 text-emerald-600 border-emerald-300 rounded focus:ring-emerald-500"
                    type="checkbox"
                    id={`location-${index}`}
                  />
                  <label htmlFor={`location-${index}`} className="text-gray-700 hover:text-emerald-600 cursor-pointer transition">
                    {location}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
     
      {/* Job Listings */}
      <section className="w-full lg:w-3/4 lg:pl-8">
        <div className="mb-8">
          <h3 className="font-medium text-3xl text-emerald-900" id="job-list">
            Latest Jobs
          </h3>
          <p className="text-gray-600">Find your dream job from top companies</p>
        </div>
        
        {filteredJobs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredJobs
                .slice((currentPage - 1) * 6, currentPage * 6)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
            </div>
            
            <div className="flex items-center justify-center space-x-2 mt-12">
              <a href="#job-list" className="flex">
                <button
                  onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center border border-emerald-200 rounded-full text-emerald-600 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </a>
              
              {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
                (_, index) => (
                  <a key={index} href="#job-list" className="flex">
                    <button
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 flex items-center justify-center border rounded-full transition ${
                        currentPage === index + 1
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  </a>
                )
              )}
              
              <a href="#job-list" className="flex">
                <button
                  onClick={() =>
                    setCurrentPage(
                      Math.min(
                        currentPage + 1,
                        Math.ceil(filteredJobs.length / 6)
                      )
                    )
                  }
                  disabled={currentPage === Math.ceil(filteredJobs.length / 6)}
                  className="w-10 h-10 flex items-center justify-center border border-emerald-200 rounded-full text-emerald-600 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </a>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-emerald-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-medium text-emerald-800 mt-4">No jobs found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your search filters</p>
            <button 
              onClick={() => {
                setSearchFilter({ title: "", location: "" });
                setSelectedCategories([]);
                setSelectedLocations([]);
              }}
              className="mt-4 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
  
};

export default JobListings;



