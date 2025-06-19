import React, { useContext, useEffect, useState } from "react";
import { assets, viewApplicationsPageData } from "../assets/assets";
import { AppContext } from "../contexts/AppContext.jsx";
import Loading from "../components/Loading.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applicants, setApplicants] = useState(false);

  // Fetch company job applications data
  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/applicants", {
        headers: { token: companyToken },
      });

      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update job application status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-status",
        { id, status },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        fetchCompanyJobApplications();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);


return applicants ? (
    applicants.length === 0 ? (
      <div className="flex items-center justify-center h-[70vh] bg-gradient-to-br from-teal-50 to-emerald-50">
        <p className="text-xl sm:text-2xl text-emerald-700">No Applications Available</p>
      </div>
    ) : (
      <div className="container mx-auto p-4 max-w-5xl">
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-emerald-200 max-sm:text-sm rounded-lg overflow-hidden shadow-md">
            <thead>
              <tr className="bg-gradient-to-r from-teal-100 to-emerald-100">
                <th className="py-3 px-4 border-b border-emerald-200 text-left text-emerald-700">#</th>
                <th className="py-3 px-4 border-b border-emerald-200 text-left text-emerald-700">Name</th>
                <th className="py-3 px-4 border-b border-emerald-200 text-left text-emerald-700 max-sm:hidden">Job Title</th>
                <th className="py-3 px-4 border-b border-emerald-200 text-left text-emerald-700 max-sm:hidden">Location</th>
                <th className="py-3 px-4 border-b border-emerald-200 text-left text-emerald-700">Resume</th>
                <th className="py-3 px-4 border-b border-emerald-200 text-left text-emerald-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants
                .filter((item) => item.jobId && item.userId)
                .map((applicant, index) => (
                  <tr key={index} className="text-gray-700 hover:bg-emerald-50 transition duration-150">
                    <td className="py-3 px-4 border-b border-emerald-200 text-center">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 border-b border-emerald-200 flex items-center">
                      <img
                        className="w-10 h-10 rounded-full mr-3 max-sm:hidden object-cover"
                        src={applicant.userId.image}
                        alt="Applicant"
                      />
                      <span className="font-medium">{applicant.userId.name}</span>
                    </td>
                    <td className="py-3 px-4 border-b border-emerald-200 max-sm:hidden">
                      {applicant.jobId.title}
                    </td>
                    <td className="py-3 px-4 border-b border-emerald-200 max-sm:hidden">
                      {applicant.jobId.location}
                    </td>
                    <td className="py-3 px-4 border-b border-emerald-200">
                      <a
                        className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg inline-flex gap-2 items-center hover:bg-emerald-100 transition duration-200"
                        href={applicant.userId.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resume <img className="w-4" src={assets.resume_download_icon} alt="Download" />
                      </a>
                    </td>
                    <td className="py-3 px-4 border-b border-emerald-200 relative">
                      {applicant.status === "Pending" ? (
                        <div className="relative inline-block text-left group">
                          <button className="text-gray-500 action-button hover:text-emerald-600 transition duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </button>
                          <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-emerald-200 rounded-lg shadow-lg group-hover:block">
                            <button
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Accepted"
                                )
                              }
                              className="block w-full text-left px-4 py-2 text-emerald-600 hover:bg-emerald-50 transition duration-200"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                changeJobApplicationStatus(
                                  applicant._id,
                                  "Rejected"
                                )
                              }
                              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-emerald-50 transition duration-200"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className={`font-medium ${
                          applicant.status === "Accepted" 
                            ? "text-emerald-600" 
                            : "text-red-500"
                        }`}>
                          {applicant.status}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ViewApplications;