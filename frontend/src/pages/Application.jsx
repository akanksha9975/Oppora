import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import moment from "moment";
import { assets, jobsApplied } from "../assets/assets";
import Footer from "../components/Footer";
import { AppContext } from "../contexts/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

const Application = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const {
    backendUrl,
    userData,
    userApplications,
    fetchUserData,
    fetchUserApplications,
  } = useContext(AppContext);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/user/update-resume",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsEdit(false);
    setResume(null);
  };

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);


return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        {/* Resume Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-emerald-100">
          <h2 className="text-xl font-semibold text-emerald-800 mb-4">Your Resume</h2>
          <div className="flex gap-3 items-center">
            {isEdit || !userData || (userData && userData.resume === "") ? (
              <>
                <label className="flex items-center gap-3" htmlFor="resume-upload">
                  <div className="bg-emerald-50 text-emerald-600 rounded-lg px-4 py-2.5 border border-emerald-200 hover:bg-emerald-100 transition duration-200 cursor-pointer">
                    {resume ? resume.name : "Select Resume"}
                  </div>
                  <input
                    id="resume-upload"
                    onChange={(e) => setResume(e.target.files[0])}
                    accept="application/pdf"
                    type="file"
                    hidden
                  />
                  <img 
                    src={assets.profile_upload_icon} 
                    alt="Upload icon" 
                    className="w-5 opacity-70"
                  />
                </label>
                <button
                  onClick={updateResume}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                >
                  Save Resume
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <a
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 px-5 py-2.5 rounded-lg border border-emerald-200 transition duration-200 flex items-center gap-2"
                  href={userData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                  <img 
                    src={assets.resume_download_icon} 
                    alt="Download" 
                    className="w-4"
                  />
                </a>
                <button
                  onClick={() => setIsEdit(true)}
                  className="text-emerald-600 hover:text-emerald-700 border border-emerald-200 hover:border-emerald-300 rounded-lg px-5 py-2.5 hover:bg-emerald-50 transition duration-200"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Applications Section */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-emerald-100">
          <h2 className="text-xl font-semibold text-emerald-800 mb-6">Job Applications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-emerald-100 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-teal-50 to-emerald-50">
                  <th className="py-3 px-4 border-b border-emerald-200 text-left text-emerald-700">Company</th>
                  <th className="py-3 px-4 border-b border-emerald-200 text-left text-emerald-700">Job Title</th>
                  <th className="py-3 px-4 border-b border-emerald-200 text-left text-emerald-700 max-sm:hidden">
                    Location
                  </th>
                  <th className="py-3 px-4 border-b border-emerald-200 text-left text-emerald-700 max-sm:hidden">
                    Date
                  </th>
                  <th className="py-3 px-4 border-b border-emerald-200 text-left text-emerald-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {userApplications.map((job, index) => (
                  <tr key={index} className="hover:bg-emerald-50 transition duration-150">
                    <td className="py-3 px-4 border-b border-emerald-200 flex items-center gap-3">
                      <img 
                        className="w-8 h-8 object-cover rounded-md border border-emerald-100" 
                        src={job.companyId.image} 
                        alt={job.companyId.name} 
                      />
                      <span className="font-medium">{job.companyId.name}</span>
                    </td>
                    <td className="py-3 px-4 border-b border-emerald-200 text-emerald-800 font-medium">
                      {job.jobId.title}
                    </td>
                    <td className="py-3 px-4 border-b border-emerald-200 text-gray-600 max-sm:hidden">
                      {job.jobId.location}
                    </td>
                    <td className="py-3 px-4 border-b border-emerald-200 text-gray-600 max-sm:hidden">
                      {moment(job.date).format("ll")}
                    </td>
                    <td className="py-3 px-4 border-b border-emerald-200">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          job.status === "Accepted"
                            ? "bg-emerald-100 text-emerald-700"
                            : job.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Application;
