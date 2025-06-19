import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const navigate = useNavigate();

  const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } =
    useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state === "Sign Up" && !isTextDataSubmitted) {
      return setIsTextDataSubmitted(true);
    }

    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/company/login", {
          email,
          password,
        });

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      }
      else {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("image", image)

        const {data} = await axios.post(backendUrl + "/api/company/register", formData)

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setShowRecruiterLogin(false);
          navigate("/dashboard");
        }
        else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);








  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-black/50 flex justify-center items-center p-4">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-700 mb-2">
            {state === "Login" ? "Welcome Back" : "Join Our Platform"}
          </h1>
          <p className="text-gray-500">
            {state === "Login" 
              ? "Sign in to manage your job postings" 
              : "Create your recruiter account"}
          </p>
        </div>

        {/* Form Content */}
        {state === "Sign Up" && isTextDataSubmitted ? (
          <div className="flex flex-col items-center mb-6">
            <label htmlFor="image" className="cursor-pointer group">
              <div className="relative w-24 h-24 rounded-full bg-emerald-50 border-2 border-dashed border-emerald-200 flex items-center justify-center overflow-hidden mb-4 group-hover:border-emerald-300 transition">
                {image ? (
                  <img 
                    src={URL.createObjectURL(image)} 
                    alt="Company logo preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                accept="image/*"
                hidden
              />
              <p className="text-center text-emerald-600 font-medium">
                Upload Company Logo
              </p>
              <p className="text-xs text-gray-500 text-center mt-1">
                (Recommended: 300×300 PNG)
              </p>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            {state !== "Login" && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                />
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </div>
        )}

        {/* Forgot Password */}
        {state === "Login" && (
          <div className="text-right mt-2">
            <button type="button" className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline">
              Forgot Password?
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-lg font-medium mt-6 shadow-md hover:shadow-lg transition-all hover:from-emerald-600 hover:to-teal-700"
        >
          {state === "Login"
            ? "Sign In"
            : isTextDataSubmitted
            ? "Complete Registration"
            : "Continue"}
        </button>

        {/* Toggle Auth State */}
        <div className="text-center mt-6 text-sm text-gray-500">
          {state === "Login" ? (
            <>
              Don't have an account?{" "}
              <button 
                type="button" 
                onClick={() => setState("Sign Up")}
                className="text-emerald-600 font-medium hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button 
                type="button" 
                onClick={() => setState("Login")}
                className="text-emerald-600 font-medium hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );


   };

 export default RecruiterLogin;

 