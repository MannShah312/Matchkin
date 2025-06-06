// // // routes/UploadProject.js
// // import React, { useState } from "react";
// // import Lottie from "lottie-react";
// // import animationData from "../assets/animations/Profile.json"; // your Lottie file
// // import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
// // import { useNavigate } from "react-router-dom";

// // const UploadProject = () => {
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     description: "",
// //     requiredSkills: "",
// //     domain: "",
// //     timeline: "",
// //     budget: ""
// //   });

// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const body = {
// //       ...formData,
// //       requiredSkills: formData.requiredSkills.split(",").map((s) => s.trim())
// //     };

// //     const res = await makeAuthenticatedPOSTRequest("/client/project", body);

// //     if (res.error) {
// //       setError(res.error);
// //       setSuccess("");
// //     } else {
// //       setSuccess("Project uploaded successfully!");
// //       setError("");
// //         const projectId = res.projectId;
// //         setTimeout(() => navigate(`/match/${projectId}`), 1500);
// //     }
// //   };

// //   return (
// //     <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
// //       {/* Left - Animation */}
// //       <div className="hidden md:flex w-1/2 justify-center">
// //         <Lottie animationData={animationData} loop={true} className="w-3/4" />
// //       </div>

// //       {/* Right - Form */}
// //       <div className="w-full md:w-1/2 bg-white shadow-lg rounded-2xl p-8">
// //         <h2 className="text-2xl font-bold mb-6 text-center">Upload New Project</h2>

// //         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
// //         {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <input name="title" placeholder="Project Title" onChange={handleChange} required className="w-full border p-2 rounded" />
// //           <textarea name="description" placeholder="Project Description" onChange={handleChange} className="w-full border p-2 rounded" />

// //           <input name="requiredSkills" placeholder="Skills (comma-separated)" onChange={handleChange} className="w-full border p-2 rounded" />
// //           <input name="domain" placeholder="Domain (e.g. Web, AI)" onChange={handleChange} className="w-full border p-2 rounded" />
// //           <input name="timeline" placeholder="Timeline (e.g. 2 weeks)" onChange={handleChange} className="w-full border p-2 rounded" />
// //           <input name="budget" type="number" placeholder="Budget ($)" onChange={handleChange} className="w-full border p-2 rounded" />

// //           <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
// //             Submit Project
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };
// // export default UploadProject;


// import React, { useState } from "react";
// import Lottie from "lottie-react";
// import animationData from "../assets/animations/Profile.json";
// import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie"; // ✅ Import cookies

// const UploadProject = () => {
//   const navigate = useNavigate();
//   const [cookies] = useCookies(['token']); // ✅ Read token from cookies

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     requiredSkills: "",
//     domain: "",
//     timeline: "",
//     budget: ""
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const body = {
//       ...formData,
//       requiredSkills: formData.requiredSkills
//         .split(",")
//         .map((s) => s.trim())
//         .filter(Boolean)
//     };

//     try {
//       const res = await makeAuthenticatedPOSTRequest("/client/project", body, cookies.token); // ✅ Include token

//       if (res.error) {
//         setError(res.error);
//         setSuccess("");
//       } else {
//         setSuccess("Project uploaded successfully!");
//         setError("");
//         const projectId = res.projectId;
//         setTimeout(() => navigate(`/match/${projectId}`), 1500);
//       }
//     } catch (err) {
//       console.error("Upload failed:", err);
//       setError("Something went wrong. Please try again.");
//       setSuccess("");
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
//       {/* Navbar */}
//       <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
//         <div
//           className="text-xl font-bold text-blue-700 cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           Matchkin
//         </div>
//         <button
//           onClick={() => navigate("/client")}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
//         >
//           Back to Home
//         </button>
//       </nav>
//       {/* Left - Animation */}
//       <div className="hidden md:flex w-1/2 justify-center">
//         <Lottie animationData={animationData} loop={true} className="w-3/4" />
//       </div>

//       {/* Right - Form */}
//       <div className="w-full md:w-1/2 bg-white shadow-lg rounded-2xl p-8">
//         <h2 className="text-2xl font-bold mb-6 text-center">Upload New Project</h2>

//         {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
//         {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input name="title" placeholder="Project Title" onChange={handleChange} required className="w-full border p-2 rounded" />
//           <textarea name="description" placeholder="Project Description" onChange={handleChange} className="w-full border p-2 rounded" />

//           <input name="requiredSkills" placeholder="Skills (comma-separated)" onChange={handleChange} className="w-full border p-2 rounded" />
//           <input name="domain" placeholder="Domain (e.g. Web, AI)" onChange={handleChange} className="w-full border p-2 rounded" />
//           <input name="timeline" placeholder="Timeline (e.g. 2 weeks)" onChange={handleChange} className="w-full border p-2 rounded" />
//           <input name="budget" type="number" placeholder="Budget ($)" onChange={handleChange} className="w-full border p-2 rounded" />

//           <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
//             Submit Project
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default UploadProject;

import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animations/Profile.json";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const UploadProject = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requiredSkills: "",
    domain: "",
    timeline: "",
    budget: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...formData,
      requiredSkills: formData.requiredSkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    };

    try {
      const res = await makeAuthenticatedPOSTRequest("/client/project", body, cookies.token);

      if (res.error) {
        setError(res.error);
        setSuccess("");
      } else {
        setSuccess("Project uploaded successfully!");
        setError("");
        const projectId = res.projectId;
        setTimeout(() => navigate(`/match/${projectId}`), 1500);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Something went wrong. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Navbar */}
      <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
        <div
          className="text-xl font-bold text-blue-700 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Matchkin
        </div>
        <button
          onClick={() => navigate("/client")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Back to Home
        </button>
      </nav>

      {/* ✅ Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center p-4">
        {/* Animation */}
        <div className="hidden md:flex md:w-1/2 justify-center">
          <Lottie animationData={animationData} loop className="w-3/4" />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Upload New Project</h2>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            <input
              name="requiredSkills"
              placeholder="Skills (comma-separated)"
              value={formData.requiredSkills}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="domain"
              placeholder="Domain (e.g. Web, AI)"
              value={formData.domain}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="timeline"
              placeholder="Timeline (e.g. 2 weeks)"
              value={formData.timeline}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
            <input
              name="budget"
              type="number"
              placeholder="Budget ($)"
              value={formData.budget}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
            >
              Submit Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadProject;