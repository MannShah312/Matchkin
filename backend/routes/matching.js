const express = require('express');
const router = express.Router();
const passport = require('passport');
const Project = require('../models/Project');
const ConsultantProfile = require('../models/ConsultantProfile');
const User = require('../models/User');

// GET /match/:projectId
router.get(
  '/:projectId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const projectId = req.params.projectId.trim();

      const project = await Project.findOne({ _id: projectId, client: req.user._id });
      if (!project) {
        return res.status(404).json({ error: 'Project not found or unauthorized' });
      }

      const allConsultants = await ConsultantProfile.find().populate('user');

      const results = allConsultants.map((consultant) => {
        const matchedSkills = consultant.skills.filter(skill =>
          project.requiredSkills.includes(skill)
        );
        const matchPercentage = Math.round((matchedSkills.length / project.requiredSkills.length) * 100);

        return {
          consultantId: consultant._id,
          name: consultant.user.name,
          email: consultant.user.email,
          matchPercentage,
          skillsMatched: matchedSkills,
          profile: consultant
        };
      });

      const topMatches = results
        .sort((a, b) => b.matchPercentage - a.matchPercentage)
        .slice(0, 3);

      res.json({
        projectId,
        topMatches
      });
    } catch (err) {
      console.error('Matching error:', err.message);
      res.status(500).json({ error: 'Server error during matching' });
    }
  }
);

module.exports = router;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

// const MatchConsultants = () => {
//   const { projectId } = useParams();
//   const [cookies] = useCookies(["token"]);
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const res = await makeAuthenticatedGETRequest(`/match/${projectId}`, cookies.token);

//         if (res.error) {
//           setError(res.error);
//         } else {
//           setMatches(res.topMatches || []);
//         }
//       } catch (err) {
//         console.error("Error fetching matches:", err);
//         setError("Something went wrong.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatches();
//   }, [projectId, cookies.token]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
//         <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">Top Consultant Matches</h1>

//         {loading && <p className="text-center text-gray-500">Loading matches...</p>}
//         {error && <p className="text-center text-red-500">{error}</p>}

//         <div className="space-y-4">
//           {matches.map((match, idx) => (
//             <div key={match.consultantId} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
//               <h2 className="text-xl font-semibold">{match.name}</h2>
//               <p className="text-sm text-gray-600">{match.email}</p>
//               <p className="mt-1 text-sm text-green-600 font-medium">
//                 Match: {match.matchPercentage}%
//               </p>
//               <p className="mt-1 text-sm">
//                 <span className="font-semibold">Skills Matched:</span>{" "}
//                 {match.skillsMatched.join(", ")}
//               </p>
//             </div>
//           ))}
//         </div>

//         {!loading && matches.length === 0 && (
//           <p className="text-center text-gray-500 mt-6">No consultant matches found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MatchConsultants;