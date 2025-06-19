import React, { useContext, useEffect, useRef, useState } from "react";
import Quill from "quill";
import DOMPurify from 'dompurify';
import { JobCategories, JobLocations } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-toastify";

const AddJobs = () => {
  const { backendUrl, companyToken } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [category, setCategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner");
  const [salary, setSalary] = useState(0);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const description = DOMPurify.sanitize(quillRef.current.root.innerHTML);

      const { data } = await axios.post(
        backendUrl + "/api/company/post-job",
        { title, description, location, salary, category, level },
        { headers: { token: companyToken } }
      );

      if(data.success) {
        setTitle("");
        setSalary(0);
        quillRef.current.root.innerHTML = "";
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['link'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }]
          ]
        }
      });
    }
  }, []);


  
return (
    <form
      onSubmit={handleSubmit}
      className="container p-6 flex flex-col w-full items-start gap-6 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl shadow-lg"
    >
      <div className="w-full">
        <p className="mb-2 text-lg font-semibold text-emerald-700">Job Title</p>
        <input
          className="w-full max-w-lg px-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-all duration-300 hover:shadow-md bg-white"
          type="text"
          placeholder="Enter job title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
      </div>
      <div className="w-full max-w-lg">
        <p className="my-2 text-lg font-semibold text-emerald-700">Job Description</p>
        <div ref={editorRef} className="border-2 border-emerald-200 rounded-lg bg-white p-4 hover:shadow-md transition-all duration-300"></div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:gap-6">
        <div className="w-full sm:w-1/3">
          <p className="mb-2 text-lg font-semibold text-emerald-700">Job Category</p>
          <select
            className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-all duration-300 hover:shadow-md bg-white"
            onChange={(e) => setCategory(e.target.value)}
          >
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-1/3">
          <p className="mb-2 text-lg font-semibold text-emerald-700">Job Location</p>
          <select
            className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-all duration-300 hover:shadow-md bg-white"
            onChange={(e) => setLocation(e.target.value)}
          >
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-1/3">
          <p className="mb-2 text-lg font-semibold text-emerald-700">Job Level</p>
          <select
            className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-all duration-300 hover:shadow-md bg-white"
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="Beginner level">Beginner level</option>
            <option value="Intermediate level">Intermediate level</option>
            <option value="Senior level">Senior level</option>
          </select>
        </div>
      </div>
      <div>
        <p className="mb-2 text-lg font-semibold text-emerald-700">Job Salary</p>
        <input
          className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:outline-none focus:border-emerald-500 transition-all duration-300 hover:shadow-md bg-white lg:w-[150px]"
          type="number"
          min={0}
          placeholder="2500"
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>
      <button className="w-32 py-3 mt-4 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg">
        Add Job
      </button>
    </form>
  );
};

export default AddJobs;