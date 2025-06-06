  import React, { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { makeAuthenticatedGETRequest } from '../utils/serverHelpers';
  // import logo from '../assets/logo.png';

  const getInitials = (name = '') => {
    const names = name.trim().split(' ');
    return names.length > 1
      ? names[0][0] + names[1][0]
      : names[0][0];
  };

  const HomeConsultant = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const profileData = await makeAuthenticatedGETRequest('/consultants/profile/me');
          setProfile(profileData);
        } catch (err) {
          console.error('Error fetching consultant profile:', err);
          navigate('/login');
        }
      };

      fetchProfile();
    }, [navigate]);

    return (
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
          <div className="flex items-center space-x-2">
            {/* <img src={logo} alt="Logo" className="h-10 w-10 object-contain" /> */}
            <span className="text-xl font-semibold text-blue-700">Consultant Dashboard</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/consultant/profile')}
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
              onClick={() => {
                localStorage.removeItem("Token");
                navigate('/login');
                window.location.reload(); // <-- Optional force reload        
              }}
              className="bg-gray-800 hover:bg-gray-900 text-white py-1.5 px-4 rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Layout */}
        <main className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto p-6">
          {/* Left - Consultant Profile (40%) */}
          <div className="w-full lg:w-2/5 bg-white p-6 rounded-xl shadow-md">
            {profile ? (
              <div className="flex flex-col items-center text-center">
                {/* Profile Initials */}
                <div className="w-24 h-24 rounded-full bg-purple-600 text-white flex items-center justify-center text-3xl font-bold mb-4">
                  {getInitials(profile.user?.name)}
                </div>

                {/* Name */}
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {profile.user?.name}
                </h2>

                <p className="text-sm text-gray-500 mb-4">Verified Consultant</p>

                {/* Details */}
                <div className="w-full text-left text-sm text-gray-700 space-y-2">
                  {profile.skills && (
                    <p><span className="font-semibold">Skills:</span> {profile.skills}</p>
                  )}
                  {profile.domain && (
                    <p><span className="font-semibold">Domain:</span> {profile.domain}</p>
                  )}
                  {profile.experience && (
                    <p><span className="font-semibold">Experience:</span> {profile.experience}</p>
                  )}
                  {profile.bio && (
                    <p><span className="font-semibold">Bio:</span> {profile.bio}</p>
                  )}
                  {profile.availability && (
                    <p><span className="font-semibold">Availability:</span> {profile.availability}</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">Loading consultant profile...</p>
            )}
          </div>

          {/* Right - Placeholder for future content */}
          <div className="w-full lg:w-3/5 bg-white p-6 rounded-xl shadow-md flex items-center justify-center text-gray-400 text-center text-xl">
            <p>Right-side content will go here...</p>
          </div>
        </main>
      </div>
    );
  };

  export default HomeConsultant;