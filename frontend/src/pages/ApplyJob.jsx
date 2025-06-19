import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import DOMPurify from 'dompurify';

const ApplyJob = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const {
    jobs,
    backendUrl,
    userData,
    userApplications,
    fetchUserApplications,
  } = useContext(AppContext);

  const [jobData, setJobData] = useState(null);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`);

      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyHandler = async () => {
    try {
      if (!userData) {
        return toast.error("Login to apply for a job");
      }

      if (isAlreadyApplied) {
        return toast.error("Already Applied");
      }

      if (!userData.resume) {
        navigate("/applications");
        return toast.error("Upload resume to apply for a job");
      }

      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/apply",
        {
          jobId: jobData._id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserApplications();
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(
      (item) => item.jobId._id === jobData._id
    );
    setIsAlreadyApplied(hasApplied);
  };

  useEffect(() => {
    if (userApplications.length > 0 && jobData) {
      checkAlreadyApplied();
    }
  }, [jobData, userApplications, id]);

  useEffect(() => {
    fetchJob();
  }, [id]);

return jobData ? (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="bg-white rounded-lg w-full shadow-md">
          {/* Job Header Section */}
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-8 md:px-14 py-12 mb-6 bg-gradient-to-r from-teal-50 to-emerald-100 border border-emerald-200 rounded-xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                className="h-24 w-24 bg-white rounded-lg p-2 border-2 border-emerald-100 object-contain shadow-sm"
                src={jobData.companyId.image}
                alt={jobData.companyId.name}
              />
              <div className="text-center md:text-left">
                <h1 className="text-2xl sm:text-3xl font-semibold text-emerald-800">
                  {jobData.title}
                </h1>
                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-4 items-center text-emerald-700 mt-3">
                  <span className="flex items-center gap-1.5 text-sm">
                    <img className="w-4" src={assets.suitcase_icon} alt="Company" />
                    {jobData.companyId.name}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm">
                    <img className="w-4" src={assets.location_icon} alt="Location" />
                    {jobData.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm">
                    <img className="w-4" src={assets.person_icon} alt="Level" />
                    {jobData.level}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm">
                    <img className="w-4" src={assets.money_icon} alt="Salary" />
                    CTC: {kconvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center text-end text-sm max-md:mx-auto max-md:text-center">
              <button
                onClick={applyHandler}
                className={`p-2.5 px-10 rounded-lg shadow-md hover:shadow-lg transition duration-200 ${
                  isAlreadyApplied 
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                {isAlreadyApplied ? "Already Applied ✓" : "Apply Now"}
              </button>
              <p className="mt-2 text-emerald-600">
                Posted {moment(jobData.date).fromNow()}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 p-6">
            {/* Job Description Section */}
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-6 text-emerald-800">Job Description</h2>
              <div
                className="rich-text-content prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(jobData?.description || '')
                }}
              ></div>
              <button
                onClick={applyHandler}
                className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 px-10 rounded-lg shadow-md hover:shadow-lg transition duration-200 mt-8"
              >
                {isAlreadyApplied ? "Application Submitted" : "Apply Now"}
              </button>
            </div>

            {/* More Jobs Section */}
            <div className="w-full lg:w-1/3 lg:pl-6">
              <h2 className="font-bold text-xl mb-4 text-emerald-800 border-b border-emerald-100 pb-2">
                More Jobs From {jobData.companyId.name}
              </h2>
              <div className="space-y-4">
                {jobs
                  .filter(
                    (job) =>
                      job._id !== jobData._id &&
                      job.companyId._id === jobData.companyId._id
                  )
                  .filter((job) => {
                    const appliedJobIds = new Set(
                      userApplications.map((app) => app.jobId && app.jobId._id)
                    );
                    return !appliedJobIds.has(job._id);
                  })
                  .slice(0, 4)
                  .map((job, index) => (
                    <JobCard key={index} job={job} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default ApplyJob;
