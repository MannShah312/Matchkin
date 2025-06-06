// // const HomeClient = () => {
// //   const [profile, setProfile] = useState(null);
// //   const [projects, setProjects] = useState([]);
// //   const [skillStats, setSkillStats] = useState([]);
// //   const [domainStats, setDomainStats] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const profileData = await makeAuthenticatedGETRequest('/client/profile');
// //         setProfile(profileData);

// //         const projectData = await makeAuthenticatedGETRequest('/client/projects');
// //         if (Array.isArray(projectData)) {
// //           setProjects(projectData);
// //         } else if (Array.isArray(projectData.data)) {
// //           setProjects(projectData.data);
// //         } else {
// //           setProjects([]);
// //         }
// //       } catch (err) {
// //         console.error('Error fetching data:', err);
// //         navigate('/login');
// //       }
// //     };

// //     fetchData();
// //   }, [navigate]);

// //   useEffect(() => {
// //   const fetchStats = async () => {
// //     try {
// //       const skills = await makeAuthenticatedGETRequest('/stats/skills');
// //       const domains = await makeAuthenticatedGETRequest('/stats/domains');

// //       const formattedSkills = Object.entries(skills).map(([name, count]) => ({
// //         name,
// //         count
// //       }));
// //       const formattedDomains = Object.entries(domains).map(([name, count]) => ({
// //         name,
// //         count
// //       }));

// //       setSkillStats(formattedSkills);
// //       setDomainStats(formattedDomains);
// //     } catch (err) {
// //       console.error("Error fetching stats:", err);
// //     }
// //   };

// //   fetchStats();
// //   }, []);

// //   const handleLogout = () => {
// //     removeCookie('token', { path: '/' });
// //     navigate('/login');
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       {/* Navbar */}
// //       <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
// //         <div className="flex items-center space-x-2">
// //           {/* <img src={logo} alt="Logo" className="h-10 w-10 object-contain" /> */}
// //           <span className="text-xl font-semibold text-blue-700">Client Dashboard</span>
// //         </div>
// //         <div className="flex gap-4">
// //           <button
// //             onClick={() => navigate('/client/profile')}
// //             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
// //           >
// //             Profile
// //           </button>
// //           <button
// //             onClick={() => navigate('/chat')}
// //             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
// //           >
// //             Chat
// //           </button>
// //           <button
// //             onClick={handleLogout}
// //             className="bg-gray-800 hover:bg-gray-900 text-white py-1.5 px-4 rounded-md text-sm"
// //           >
// //             Logout
// //           </button>
// //         </div>
// //       </nav>

// //       {/* Main Layout */}
// //       <main className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto p-6">
// //         {/* Left - Profile (40%) */}
// //         <div className="w-full lg:w-2/5 bg-white p-6 rounded-xl shadow-md">
// //           {profile ? (
// //             <div className="flex flex-col items-center text-center">
// //               {/* Profile Initial Circle */}
// //               <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold mb-4">
// //                 {getInitials(profile.name)}
// //               </div>

// //               {/* Name */}
// //               <h2 className="text-xl font-semibold text-gray-800 mb-1">
// //                 {profile.name}
// //               </h2>

// //               {/* Description / Bio (optional) */}
// //               <p className="text-sm text-gray-500 mb-4 text-center px-2">
// //                 Client registered on our platform
// //               </p>

// //               {/* Client Info List */}
// //               <div className="w-full text-left text-sm text-gray-700 space-y-2">
// //                 {profile.company && (
// //                   <p><span className="font-semibold">Company:</span> {profile.company}</p>
// //                 )}
// //                 {profile.website && (
// //                   <p><span className="font-semibold">Website:</span> {profile.website}</p>
// //                 )}
// //                 {profile.description && (
// //                   <p><span className="font-semibold">Description:</span> {profile.description}</p>
// //                 )}
// //               </div>
// //             </div>
// //           ) : (
// //             <p className="text-center text-gray-500">Loading profile...</p>
// //           )}
// //         </div>

// //         {/* Right - Projects (60%) */}
// //         <div className="w-full lg:w-3/5 bg-white p-6 rounded-xl shadow-md">
// //           <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Posted Projects</h2>

// //           {Array.isArray(projects) && projects.length === 0 ? (
// //             <p className="text-gray-500">You have not posted any projects yet.</p>
// //           ) : (
// //             <div className="grid gap-4">
// //               {Array.isArray(projects) &&
// //                 projects.map((project, index) => (
// //                   <div
// //                     key={index}
// //                     className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
// //                   >
// //                     <h3 className="text-lg font-semibold text-blue-700">
// //                       {project.title || 'Untitled Project'}
// //                     </h3>
// //                     <p className="text-sm text-gray-600 mt-2">
// //                       {project.description || 'No description provided.'}
// //                     </p>
// //                     <p className="text-xs text-gray-400 mt-1">
// //                       Posted on:{' '}
// //                       {project.createdAt
// //                         ? new Date(project.createdAt).toLocaleDateString()
// //                         : 'Unknown'}
// //                     </p>
// //                   </div>
// //                 ))}
// //             </div>
// //           )}
// //           <div className="mt-8">
// //           <h2 className="text-lg font-semibold mb-2 text-gray-800">Consultant Skills Overview</h2>
// //             <div className="h-60">
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <BarChart data={skillStats}>
// //                   <XAxis dataKey="name" />
// //                   <YAxis />
// //                   <Tooltip />
// //                   <Bar dataKey="count" fill="#3B82F6" />
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             </div>

// //             <h2 className="text-lg font-semibold mt-6 mb-2 text-gray-800">Consultant Domain Overview</h2>
// //             <div className="h-60">
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <BarChart data={domainStats}>
// //                   <XAxis dataKey="name" />
// //                   <YAxis />
// //                   <Tooltip />
// //                   <Bar dataKey="count" fill="#10B981" />
// //                 </BarChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };
// // export default HomeClient;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
// import {
//   makeAuthenticatedGETRequest
// } from '../utils/serverHelpers';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer
// } from 'recharts';
// // import logo from '../assets/logo.png';

// const getInitials = (name = '') => {
//   const names = name.trim().split(' ');
//   return names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
// };

// const HomeClient = () => {
//   const [profile, setProfile] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [skillStats, setSkillStats] = useState([]);
//   const [domainStats, setDomainStats] = useState([]);
//   const [cookies, , removeCookie] = useCookies(['token']);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const profileData = await makeAuthenticatedGETRequest('/client/profile');
//         setProfile(profileData);

//         // const projectData = await makeAuthenticatedGETRequest('/client/projects');
//         // if (Array.isArray(projectData)) {
//         //   setProjects(projectData);
//         // } else if (Array.isArray(projectData.data)) {
//         //   setProjects(projectData.data);
//         // } else {
//         //   setProjects([]);
//         // }
//         const projectData = await makeAuthenticatedGETRequest('/client/projects');
//         if (Array.isArray(projectData.projects)) {
//           setProjects(projectData.projects);
//         } else {
//         setProjects([]);
//         }

//       } catch (err) {
//         console.error('Error fetching data:', err);
//         navigate('/login');
//       }
//     };

//     fetchData();
//   }, [navigate]);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const skills = await makeAuthenticatedGETRequest('/stats/skills');
//         const domains = await makeAuthenticatedGETRequest('/stats/domains');

//         const formattedSkills = Object.entries(skills).map(([name, count]) => ({
//           name,
//           count
//         }));
//         const formattedDomains = Object.entries(domains).map(([name, count]) => ({
//           name,
//           count
//         }));

//         setSkillStats(formattedSkills);
//         setDomainStats(formattedDomains);
//       } catch (err) {
//         console.error("Error fetching stats:", err);
//       }
//     };

//     fetchStats();
//   }, []);

//   const handleLogout = () => {
//     removeCookie('token', { path: '/' });
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Navbar */}
//       <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
//         <div className="flex items-center space-x-2">
//           {/* <img src={logo} alt="Logo" className="h-10 w-10 object-contain" /> */}
//           <span className="text-xl font-semibold text-blue-700">Client Dashboard</span>
//         </div>
//         <div className="flex gap-4">
//           <button
//             onClick={() => navigate('/client/profile')}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//           >
//             Profile
//           </button>
//           <button
//             onClick={() => navigate('/chat')}
//             className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
//           >
//             Chat
//           </button>
//           <button
//             onClick={handleLogout}
//             className="bg-gray-800 hover:bg-gray-900 text-white py-1.5 px-4 rounded-md text-sm"
//           >
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* Main Layout */}
//       <main className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto p-6">
//         {/* Left - Profile */}
//         <div className="w-full lg:w-2/5 bg-white p-6 rounded-xl shadow-md">
//           {profile ? (
//             <div className="flex flex-col items-center text-center">
//               <div className="w-24 h-24 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold mb-4">
//                 {getInitials(profile.name)}
//               </div>
//               <h2 className="text-xl font-semibold text-gray-800 mb-1">{profile.name}</h2>
//               <p className="text-sm text-gray-500 mb-4">Client registered on our platform</p>
//               <div className="w-full text-left text-sm text-gray-700 space-y-2">
//                 {profile.company && (
//                   <p><span className="font-semibold">Company:</span> {profile.company}</p>
//                 )}
//                 {profile.website && (
//                   <p><span className="font-semibold">Website:</span> {profile.website}</p>
//                 )}
//                 {profile.description && (
//                   <p><span className="font-semibold">Description:</span> {profile.description}</p>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <p className="text-center text-gray-500">Loading profile...</p>
//           )}
//         </div>

//         {/* Right - Projects + Charts */}
//         <div className="w-full lg:w-3/5 bg-white p-6 rounded-xl shadow-md">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Posted Projects</h2>

//           {Array.isArray(projects) && projects.length === 0 ? (
//             <p className="text-gray-500">You have not posted any projects yet.</p>
//           ) : (
//             <div className="grid gap-4">
//               {projects.map((project, index) => (
//                 <div
//                   key={index}
//                   className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
//                 >
//                   <h3 className="text-lg font-semibold text-blue-700">
//                     {project.title || 'Untitled Project'}
//                   </h3>
//                   <p className="text-sm text-gray-600 mt-2">
//                     {project.description || 'No description provided.'}
//                   </p>
//                   <p className="text-xs text-gray-400 mt-1">
//                     Posted on:{' '}
//                     {project.createdAt
//                       ? new Date(project.createdAt).toLocaleDateString()
//                       : 'Unknown'}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Charts Section */}
//           <div className="mt-8">
//             <h2 className="text-lg font-semibold mb-2 text-gray-800">Consultant Skills Overview</h2>
//             <div className="h-60">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={skillStats}>
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#3B82F6" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>

//             <h2 className="text-lg font-semibold mt-6 mb-2 text-gray-800">Consultant Domain Overview</h2>
//             <div className="h-60">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={domainStats}>
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#10B981" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };
// export default HomeClient;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
  makeAuthenticatedGETRequest
} from '../utils/serverHelpers';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const getInitials = (name = '') => {
  const names = name.trim().split(' ');
  return names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
};

const HomeClient = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skillStats, setSkillStats] = useState([]);
  const [domainStats, setDomainStats] = useState([]);
  const [cookies, , removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await makeAuthenticatedGETRequest('/client/profile');
        setProfile(profileData);

        const projectData = await makeAuthenticatedGETRequest('/client/projects');
        if (Array.isArray(projectData.projects)) {
          setProjects(projectData.projects.reverse()); // newest first
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        navigate('/login');
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const skills = await makeAuthenticatedGETRequest('/stats/skills');
        const domains = await makeAuthenticatedGETRequest('/stats/domains');

        const formattedSkills = Object.entries(skills).map(([name, count]) => ({
          name,
          count
        }));
        const formattedDomains = Object.entries(domains).map(([name, count]) => ({
          name,
          count
        }));

        setSkillStats(formattedSkills);
        setDomainStats(formattedDomains);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    removeCookie('token', { path: '/' });
    navigate('/login');
  };

  const handleCardClick = (projectId) => {
    navigate(`/match/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-blue-700">Client Dashboard</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/client/profile')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Profile
          </button>
          <button
            onClick={() => navigate('/chat')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Chat
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-800 hover:bg-gray-900 text-white py-1.5 px-4 rounded-md text-sm"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto p-6">
        {/* Left - Profile */}
        <div className="w-full lg:w-2/5 bg-white p-6 rounded-xl shadow-md">
          {profile ? (
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-purple-600 text-white flex items-center justify-center text-3xl font-bold mb-4">
                {console.log('PROFILE DATA:', profile)}
                {profile.user?.name ? getInitials(profile.user.name) : ""}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{profile.name}</h2>
              <p className="text-sm text-gray-500 mb-4">Client registered on our platform</p>
              <div className="w-full text-left text-base text-gray-700 space-y-4">
              {profile.company && (
                <p className="text-lg">
                  <span className="font-bold text-xl">Company:</span> {profile.company}
                </p>
              )}
              {profile.website && (
                <p className="text-lg">
                  <span className="font-bold text-xl">Website:</span> {profile.website}
                </p>
              )}
              {profile.description && (
                <p className="text-lg">
                  <span className="font-bold text-xl">Description:</span> {profile.description}
                </p>
              )}
            </div>          
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading profile...</p>
          )}
        </div>

        {/* Right - Projects + Charts */}
        <div className="w-full lg:w-3/5 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Top 3 Projects</h2>

          {/* Top 3 Projects */}
          {/* {projects.slice(0, 3).map((project, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(project._id)}
              className="cursor-pointer border rounded-lg p-4 mb-2 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-blue-700">{project.title || 'Untitled Project'}</h3>
              <p className="text-sm text-gray-600 mt-2">{project.description || 'No description provided.'}</p>
              <p className="text-xs text-gray-400 mt-1">Posted on: {new Date(project.createdAt).toLocaleDateString()}</p>
            </div>
          ))} */}

          {/* Top 3 Latest Projects */}
          {[...projects]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3)
            .map((project, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(project._id)}
                className="cursor-pointer border rounded-lg p-4 mb-2 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-blue-700">
                  {project.title || 'Untitled Project'}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {project.description || 'No description provided.'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Posted on: {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
          ))}

          {/* Toggle All Projects */}
          {projects.length > 3 && (
            <div className="mb-4">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="text-blue-600 underline text-sm mt-2"
              >
                {showAllProjects ? 'Hide all projects' : 'View all projects'}
              </button>
            </div>
          )}

          {/* Full Project List */}
          {showAllProjects && (
            <div className="grid gap-4 mb-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(project._id)}
                  className="cursor-pointer border rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-blue-700">{project.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{project.description}</p>
                  <p className="text-xs text-gray-400 mt-1">Posted on: {new Date(project.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}

          {/* Upload Project Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/uploadproject')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              + Upload New Project
            </button>
          </div>

          {/* Charts */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Consultant Skills Overview</h2>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillStats}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <h2 className="text-lg font-semibold mt-6 mb-2 text-gray-800">Consultant Domain Overview</h2>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={domainStats}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeClient;