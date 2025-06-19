import React, { useContext, useEffect, useState } from "react";
import { manageJobsData } from "../assets/assets";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const ManageJobs = () => {
  const navigate = useNavigate();
  const { backendUrl, companyToken } = useContext(AppContext);

  const [jobs, setJobs] = useState(false);

  // Fetch comapany's posted jobs
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/list-jobs", {
        headers: { token: companyToken },
      });

      if (data.success) {
        setJobs(data.jobsData.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Change job visibility
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-visibility",
        { id },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.success);
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);



return jobs ? (
    jobs.length === 0 ? (
      <div className="flex items-center justify-center h-[70vh] bg-gradient-to-br from-teal-50 to-emerald-50">
        <p className="text-xl sm:text-2xl text-emerald-700">No jobs posted</p>
      </div>
    ) : (
      <div className="container p-4 max-w-5xl">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-emerald-200 max-sm:text-sm rounded-lg overflow-hidden shadow-md">
            <thead>
              <tr className="bg-gradient-to-r from-teal-100 to-emerald-100">
                <th className="py-3 px-4 border-b border-emerald-200 text-left text-emerald-700 max-sm:hidden">
                  #
                </th>
                <th className="py-3 px-4 border-b border-emerald-200 text-left text-emerald-700">
                  Job Title
                </th>
                <th className="py-3 px-4 border-b border-emerald-200 text-left text-emerald-700 max-sm:hidden">
                  Date
                </th>
                <th className="py-3 px-4 border-b border-emerald-200 text-left text-emerald-700 max-sm:hidden">
                  Location
                </th>
                <th className="py-3 px-4 border-b border-emerald-200 text-center text-emerald-700">
                  Applicants
                </th>
                <th className="py-3 px-4 border-b border-emerald-200 text-left text-emerald-700">
                  Visible
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={index} className="text-gray-700 hover:bg-emerald-50 transition duration-150">
                  <td className="py-3 px-4 border-b border-emerald-200 max-sm:hidden">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 border-b border-emerald-200 font-medium">
                    {job.title}
                  </td>
                  <td className="py-3 px-4 border-b border-emerald-200 max-sm:hidden">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-3 px-4 border-b border-emerald-200 max-sm:hidden">
                    {job.location}
                  </td>
                  <td className="py-3 px-4 border-b border-emerald-200 text-center">
                    {job.applicants}
                  </td>
                  <td className="py-3 px-4 border-b border-emerald-200">
                    <input
                      onChange={() => changeJobVisibility(job._id)}
                      className="scale-125 ml-4 accent-emerald-500 cursor-pointer"
                      type="checkbox"
                      checked={job.visible}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => navigate("/dashboard/add-job")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-200"
            >
              Add New Job
            </button>
          </div>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
};

export default ManageJobs;