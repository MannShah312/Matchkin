// // // // routes/MatchConsultants.js
// // // import React, { useEffect, useState } from "react";
// // // import { useParams } from "react-router-dom";
// // // import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

// // // const MatchConsultants = () => {
// // //   const { projectId } = useParams();
// // //   const [matches, setMatches] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchMatches = async () => {
// // //       const res = await makeAuthenticatedGETRequest(`/match/${projectId}`);
// // //       if (!res.error) {
// // //         setMatches(res.topMatches);
// // //       }
// // //       setLoading(false);
// // //     };
// // //     fetchMatches();
// // //   }, [projectId]);

// // //   if (loading) return <p className="text-center mt-10">Loading matches...</p>;

// // //   return (
// // //     <div className="p-6 max-w-4xl mx-auto">
// // //       <h2 className="text-2xl font-bold mb-4">Top Consultant Matches</h2>
// // //       {matches.length === 0 ? (
// // //         <p>No matching consultants found.</p>
// // //       ) : (
// // //         <div className="space-y-4">
// // //           {matches.map((match) => (
// // //             <div key={match.consultantId} className="border p-4 rounded shadow">
// // //               <h3 className="text-xl font-semibold">{match.name}</h3>
// // //               <p>Email: {match.email}</p>
// // //               <p>Match: {match.matchPercentage}%</p>
// // //               <p>Skills matched: {match.skillsMatched.join(", ")}</p>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };
// // // export default MatchConsultants;


// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate, useLocation } from "react-router-dom";
// // import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
// // import Lottie from "lottie-react";
// // import animationData from "../assets/animations/Profile.json"; // You can use a different one if desired

// // const MatchConsultants = () => {
// //   const { projectId } = useParams();
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const [matches, setMatches] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     if (!location.state?.fromUpload) {
// //       navigate("/client/profile");
// //     }
// //   }, [location, navigate]);

// //   useEffect(() => {
// //     const fetchMatches = async () => {
// //       try {
// //         const res = await makeAuthenticatedGETRequest(`/match/${projectId}`);
// //         if (res.error) {
// //           setError(res.error);
// //         } else {
// //           setMatches(res.topMatches);
// //         }
// //       } catch (err) {
// //         setError("Error fetching matches.");
// //       }
// //       setLoading(false);
// //     };

// //     fetchMatches();
// //   }, [projectId]);

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen bg-gray-100">
// //         <p className="text-lg text-gray-600">Loading consultant matches...</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
// //       {/* Left - Animation */}
// //       <div className="hidden md:flex w-1/2 justify-center">
// //         <Lottie animationData={animationData} loop={true} className="w-3/4" />
// //       </div>

// //       {/* Right - Consultant Matches */}
// //       <div className="w-full md:w-1/2 bg-white shadow-lg rounded-2xl p-8 overflow-y-auto max-h-[90vh]">
// //         <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
// //           Top Consultant Matches
// //         </h2>

// //         {error && (
// //           <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
// //         )}

// //         {matches.length === 0 ? (
// //           <p className="text-gray-600 text-center">No matching consultants found.</p>
// //         ) : (
// //           <div className="space-y-4">
// //             {matches.map((match) => (
// //               <div
// //                 key={match.consultantId}
// //                 className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
// //               >
// //                 <h3 className="text-xl font-semibold text-gray-800">{match.name}</h3>
// //                 <p className="text-gray-600 text-sm mb-1">Email: {match.email}</p>
// //                 <p className="text-blue-600 font-medium mb-1">
// //                   Match: {match.matchPercentage}%
// //                 </p>
// //                 <p className="text-gray-700 text-sm">
// //                   Skills matched:{" "}
// //                   <span className="font-medium">{match.skillsMatched.join(", ")}</span>
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default MatchConsultants;


// // routes/MatchConsultants.js
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';

// const MatchConsultants = () => {
//   const { projectId } = useParams();
//   const navigate = useNavigate();
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [projectTitle, setProjectTitle] = useState('');

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const response = await makeAuthenticatedGETRequest(`/match/${projectId}`);
//         setMatches(response.topMatches || []);
//         setProjectTitle(response.projectTitle || 'Selected Project');
//       } catch (err) {
//         console.error('Error fetching matched consultants:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatches();
//   }, [projectId]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold mb-4 text-blue-700">
//           Top Consultant Matches
//         </h1>
//         <p className="text-gray-600 mb-6">Based on the skills for: <strong>{projectTitle}</strong></p>

//         {loading ? (
//           <p>Loading matches...</p>
//         ) : matches.length === 0 ? (
//           <p>No matches found.</p>
//         ) : (
//           <div className="space-y-4">
//             {matches.map((match) => (
//               <div
//                 key={match.consultantId}
//                 className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
//               >
//                 <h2 className="text-xl font-semibold text-gray-800">{match.name}</h2>
//                 <p className="text-gray-600">Email: {match.email}</p>
//                 <p className="text-green-700 font-semibold">Match: {match.matchPercentage}%</p>
//                 <p className="text-sm text-gray-500 mt-1">
//                   Skills Matched: {match.skillsMatched.join(', ')}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="mt-6 text-center">
//           <button
//             onClick={() => navigate('/client')}
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MatchConsultants;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from '../utils/serverHelpers';

const MatchConsultants = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectTitle, setProjectTitle] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(`/match/${projectId}`);
        setMatches(response.topMatches || []);
        setProjectTitle(response.projectTitle || 'Selected Project');
      } catch (err) {
        console.error('Error fetching matched consultants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [projectId]);

  const handleStartChat = async (consultantId) => {
    try {
      const response = await makeAuthenticatedPOSTRequest('/chat/start', {
        userId: consultantId,
      });
      if (response._id) {
        // Navigate to the 1-1 chat page with chatId
        navigate(`/chat/${response._id}`);
      }
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Top Consultant Matches</h1>
        <p className="text-gray-600 mb-6">
          Based on the skills for: <strong>{projectTitle}</strong>
        </p>

        {loading ? (
          <p>Loading matches...</p>
        ) : matches.length === 0 ? (
          <p>No matches found.</p>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => (
              <div
                key={match.consultantId}
                onClick={() => handleStartChat(match.consultantId)}
                className="cursor-pointer p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold text-gray-800">{match.name}</h2>
                <p className="text-gray-600">Email: {match.email}</p>
                <p className="text-green-700 font-semibold">Match: {match.matchPercentage}%</p>
                <p className="text-sm text-gray-500 mt-1">
                  Skills Matched: {match.skillsMatched.join(', ')}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/client')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchConsultants;