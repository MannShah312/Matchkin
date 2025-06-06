// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   makeAuthenticatedGETRequest,
// //   makeAuthenticatedPUTRequest,
// //   makeAuthenticatedDELETERequest,
// // } from '../utils/serverHelpers';

// // const ConsultantProfilePage = () => {
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     skills: '',
// //     domain: '',
// //     experience: '',
// //     bio: '',
// //     availability: '',
// //   });
// //   const [profile, setProfile] = useState(null); // <-- Add this
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       try {
// //         const profile = await makeAuthenticatedGETRequest('/consultants/profile/me');
// //         setProfile(profile); // <-- Store full profile
// //         setFormData({
// //           name: profile.name || '',
// //           skills: profile.skills || '',
// //           domain: profile.domain || '',
// //           experience: profile.experience || '',
// //           bio: profile.bio || '',
// //           availability: profile.availability || '',
// //         });
// //       } catch (err) {
// //         console.error('Failed to load profile', err);
// //         navigate('/login');
// //       }
// //     };

// //     fetchProfile();
// //   }, [navigate]);

// //   const handleChange = (e) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await makeAuthenticatedPUTRequest('/consultants/profile', formData);
// //       alert('Profile updated successfully!');
// //     } catch (err) {
// //       console.error('Update failed', err);
// //       alert('Failed to update profile.');
// //     }
// //   };

// //   const handleDelete = async () => {
// //     if (!window.confirm('Are you sure you want to delete your profile? This cannot be undone.')) {
// //       return;
// //     }

// //     try {
// //       await makeAuthenticatedDELETERequest('/consultants/profile');
// //       alert('Profile deleted successfully.');
// //       localStorage.clear();
// //       navigate('/signup');
// //     } catch (err) {
// //       console.error('Delete failed', err);
// //       alert('Failed to delete profile.');
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-8 lg:px-16">
// //       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
// //         <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
// //           Consultant Profile{formData.name ? ` - ${formData.name}` : ''}
// //         </h2>
// //         {profile && profile.user?.email && (
// //           <p className="text-sm text-gray-500 mb-4">{profile.user.email}</p>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           {['name', 'skills', 'domain', 'experience', 'bio', 'availability'].map((field) => (
// //             <div key={field}>
// //               <label className="block font-medium capitalize text-gray-700 mb-1">
// //                 {field}
// //               </label>
// //               <input
// //                 type="text"
// //                 name={field}
// //                 value={formData[field]}
// //                 onChange={handleChange}
// //                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
// //                 placeholder={`Enter ${field}`}
// //               />
// //             </div>
// //           ))}

// //           <button
// //             type="submit"
// //             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
// //           >
// //             Update Profile
// //           </button>
// //         </form>

// //         <hr className="my-6" />

// //         <button
// //           onClick={handleDelete}
// //           className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition"
// //         >
// //           Delete Profile
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ConsultantProfilePage;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   makeAuthenticatedGETRequest,
//   makeAuthenticatedPUTRequest,
//   makeAuthenticatedDELETERequest,
// } from '../utils/serverHelpers';

// const ConsultantProfilePage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     skills: '',
//     domain: '',
//     experience: '',
//     bio: '',
//     availability: '',
//   });

//   const [profile, setProfile] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const profile = await makeAuthenticatedGETRequest('/consultants/profile/me');
//         setProfile(profile);
//         setFormData({
//           name: profile.user?.name || '',
//           phone: profile.user?.phone || '',
//           skills: profile.skills || '',
//           domain: profile.domain || '',
//           experience: profile.experience || '',
//           bio: profile.bio || '',
//           availability: profile.availability || '',
//         });
//       } catch (err) {
//         console.error('Failed to load profile', err);
//         navigate('/login');
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await makeAuthenticatedPUTRequest('/consultants/profile', formData);
//       alert('Profile updated successfully!');
//     } catch (err) {
//       console.error('Update failed', err);
//       alert('Failed to update profile.');
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm('Are you sure you want to delete your profile? This cannot be undone.')) {
//       return;
//     }

//     try {
//       await makeAuthenticatedDELETERequest('/consultants/profile');
//       alert('Profile deleted successfully.');
//       localStorage.clear();
//       navigate('/signup');
//     } catch (err) {
//       console.error('Delete failed', err);
//       alert('Failed to delete profile.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-8 lg:px-16">
//       <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8">
//         <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 text-center">
//           Consultant Profile{formData.name ? ` - ${formData.name}` : ''}
//         </h2>

//         {profile?.user?.email && (
//           <p className="text-sm text-gray-500 mb-4 text-center">{profile.user.email}</p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {['name', 'phone', 'skills', 'domain', 'experience', 'bio', 'availability'].map((field) => (
//             <div key={field}>
//               <label className="block font-medium capitalize text-gray-700 mb-1">
//                 {field}
//               </label>
//               <input
//                 type="text"
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder={`Enter ${field}`}
//               />
//             </div>
//           ))}

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
//           >
//             Update Profile
//           </button>
//         </form>

//         <hr className="my-6 border-gray-300" />

//         <button
//           onClick={handleDelete}
//           className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition"
//         >
//           Delete Profile
//         </button>
//       </div>
//     </div>
//   );
// };


// export default ConsultantProfilePage;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPUTRequest,
  makeAuthenticatedDELETERequest,
} from '../utils/serverHelpers';

const ConsultantProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    skills: '',
    domain: '',
    experience: '',
    bio: '',
    availability: '',
  });

  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await makeAuthenticatedGETRequest('/consultants/profile/me');
        setProfile(profile);
        setFormData({
          name: profile.user?.name || '',
          phone: profile.user?.phone || '',
          skills: profile.skills || '',
          domain: profile.domain || '',
          experience: profile.experience || '',
          bio: profile.bio || '',
          availability: profile.availability || '',
        });
      } catch (err) {
        console.error('Failed to load profile', err);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await makeAuthenticatedPUTRequest('/consultants/profile', formData);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update profile.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your profile? This cannot be undone.')) {
      return;
    }

    try {
      await makeAuthenticatedDELETERequest('/consultants/profile');
      alert('Profile deleted successfully.');
      localStorage.clear();
      navigate('/signup');
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete profile.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
        <div
          className="text-xl font-bold text-blue-700 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Matchkin
        </div>
        <button
          onClick={() => navigate("/consultant")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          Back to Home
        </button>
      </nav>

      {/* Profile Form */}
      <div className="py-8 px-4 sm:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 text-center">
            Consultant Profile{formData.name ? ` - ${formData.name}` : ''}
          </h2>

          {profile?.user?.email && (
            <p className="text-sm text-gray-500 mb-4 text-center">{profile.user.email}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {['name', 'phone', 'skills', 'domain', 'experience', 'bio', 'availability'].map((field) => (
              <div key={field}>
                <label className="block font-medium capitalize text-gray-700 mb-1">
                  {field}
                </label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
            >
              Update Profile
            </button>
          </form>

          <hr className="my-6 border-gray-300" />

          <button
            onClick={handleDelete}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition"
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultantProfilePage;