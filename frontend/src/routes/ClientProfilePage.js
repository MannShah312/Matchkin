// // import React, { useEffect, useState } from "react";
// // import { makeAuthenticatedPOSTRequest, makeAuthenticatedGETRequest } from "../utils/serverHelpers";
// // import Lottie from "lottie-react";
// // import profileAnimation from "../assets/animations/Profile.json";

// // const ClientProfilePage = () => {
// //   const [profile, setProfile] = useState({
// //     age: "",
// //     location: "",
// //     skills: "",
// //     bio: ""
// //   });
// //   const [loading, setLoading] = useState(true);

// //   const fetchProfile = async () => {
// //     try {
// //       const res = await makeAuthenticatedGETRequest("/clients/profile/me");
// //       const formattedSkills = res.skills?.join(", ") || "";
// //       setProfile({ ...res, skills: formattedSkills });
// //     } catch (err) {
// //       console.error("Error fetching client profile", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleChange = (e) => {
// //     setProfile({ ...profile, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const updatedProfile = {
// //       ...profile,
// //       skills: profile.skills
// //         .split(",")
// //         .map((skill) => skill.trim())
// //         .filter((skill) => skill !== "")
// //     };

// //     const res = await makeAuthenticatedPOSTRequest("/clients/profile", updatedProfile);
// //     if (res.success) {
// //       alert("Profile updated successfully!");
// //     } else {
// //       alert("Failed to update profile");
// //       console.error("Error:", res.error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProfile();
// //   }, []);

// //   if (loading) {
// //     return <p className="text-center mt-10">Loading...</p>;
// //   }

// //   return (
// //     <div className="flex h-screen">
// //       <div className="w-1/2 bg-gray-100 flex items-center justify-center">
// //         <Lottie animationData={profileAnimation} loop className="w-3/4" />
// //       </div>

// //       <div className="w-1/2 flex flex-col justify-center px-16 bg-white">
// //         <h2 className="text-3xl font-bold mb-6 text-blue-700">Client Profile</h2>
// //         <form className="space-y-5" onSubmit={handleSubmit}>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">Age</label>
// //             <input
// //               name="age"
// //               value={profile.age}
// //               onChange={handleChange}
// //               type="number"
// //               className="mt-1 w-full border border-gray-300 rounded-md p-2"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">Location</label>
// //             <input
// //               name="location"
// //               value={profile.location}
// //               onChange={handleChange}
// //               type="text"
// //               className="mt-1 w-full border border-gray-300 rounded-md p-2"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
// //             <input
// //               name="skills"
// //               value={profile.skills}
// //               onChange={handleChange}
// //               type="text"
// //               className="mt-1 w-full border border-gray-300 rounded-md p-2"
// //               placeholder="e.g. React, Node.js, MongoDB"
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-700">Bio</label>
// //             <textarea
// //               name="bio"
// //               value={profile.bio}
// //               onChange={handleChange}
// //               className="mt-1 w-full border border-gray-300 rounded-md p-2"
// //               rows={4}
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
// //           >
// //             Save Profile
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };
// // export default ClientProfilePage;

// import React, { useEffect, useState } from "react";
// import { makeAuthenticatedPUTRequest, makeAuthenticatedGETRequest } from "../utils/serverHelpers";
// import Lottie from "lottie-react";
// import profileAnimation from "../assets/animations/Profile.json";
// import { useNavigate } from 'react-router-dom';

// const ClientProfilePage = () => {
//   const [profile, setProfile] = useState({
//     company: "",
//     website: "",
//     description: ""
//   });
//   const [loading, setLoading] = useState(true);

//   const fetchProfile = async () => {
//     try {
//       const res = await makeAuthenticatedGETRequest("/client/profile");
//       setProfile({
//         company: res.company || "",
//         website: res.website || "",
//         description: res.description || ""
//       });
//     } catch (err) {
//       console.error("Error fetching client profile", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const navigate = useNavigate(); // Add this inside your component

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const res = await makeAuthenticatedPUTRequest("/client/profile", profile);
//   //   if (res.success) {
//   //     alert("Profile updated successfully!");
//   //   } else {
//   //     alert("Failed to update profile");
//   //     console.error("Error:", res.error);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const res = await makeAuthenticatedPUTRequest("/client/profile", profile);
//     if (res.success) {
//       alert("Profile updated successfully!");
//     } else {
//       alert("Failed to update profile");
//       console.error("Error:", res.error || res);
//     }
//   } catch (err) {
//     alert("An unexpected error occurred. See console for details.");
//     console.error("Unexpected error:", err);
//   }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   if (loading) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   return (
//     <div className="flex h-screen">
//       <div>
//         <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
//   {/* Logo on the Left */}
//   <div className="text-xl font-bold text-blue-700 cursor-pointer" onClick={() => navigate('/')}>
//     Matchkin
//   </div>

//   {/* Back to Home Button on the Right */}
//   <button
//     onClick={() => navigate('/client')}
//     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
//   >
//     Back to Home
//   </button>
// </nav>
//       </div>
//       <div className="w-1/2 bg-gray-100 flex items-center justify-center">
//         <Lottie animationData={profileAnimation} loop className="w-3/4" />
//       </div>

//       <div className="w-1/2 flex flex-col justify-center px-16 bg-white">
//         <h2 className="text-3xl font-bold mb-6 text-blue-700">Client Profile</h2>
//         <form className="space-y-5" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Company</label>
//             <input
//               name="company"
//               value={profile.company}
//               onChange={handleChange}
//               type="text"
//               className="mt-1 w-full border border-gray-300 rounded-md p-2"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Website</label>
//             <input
//               name="website"
//               value={profile.website}
//               onChange={handleChange}
//               type="text"
//               className="mt-1 w-full border border-gray-300 rounded-md p-2"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea
//               name="description"
//               value={profile.description}
//               onChange={handleChange}
//               className="mt-1 w-full border border-gray-300 rounded-md p-2"
//               rows={4}
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Save Profile
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ClientProfilePage;

import React, { useEffect, useState } from "react";
import { makeAuthenticatedPUTRequest, makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import Lottie from "lottie-react";
import profileAnimation from "../assets/animations/Profile.json";
import { useNavigate } from "react-router-dom";

const ClientProfilePage = () => {
  const [profile, setProfile] = useState({
    company: "",
    website: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await makeAuthenticatedGETRequest("/client/profile");
      setProfile({
        company: res.company || "",
        website: res.website || "",
        description: res.description || "",
      });
    } catch (err) {
      console.error("Error fetching client profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await makeAuthenticatedPUTRequest("/client/profile", profile);
      if (res.success) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
        console.error("Error:", res.error || res);
      }
    } catch (err) {
      alert("An unexpected error occurred. See console for details.");
      console.error("Unexpected error:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Navbar */}
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

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Animation Side */}
        <div className="w-1/2 bg-gray-100 flex items-center justify-center">
          <Lottie animationData={profileAnimation} loop className="w-3/4" />
        </div>

        {/* Form Side */}
        <div className="w-1/2 flex flex-col justify-center px-16 bg-white">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Client Profile</h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                name="company"
                value={profile.company}
                onChange={handleChange}
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <input
                name="website"
                value={profile.website}
                onChange={handleChange}
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={profile.description}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClientProfilePage;