// import React from 'react';

// const Landing = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Navbar */}
//       <nav className="w-full h-16 bg-gray-800 text-white flex items-center px-6">
//         <h1 className="text-xl font-bold">MySite</h1>
//       </nav>

//       {/* Hero Section - split 60/40 horizontally */}
//       <section className="flex flex-row w-full h-screen">
//         {/* Left 60% */}
//         <div className="w-3/5 bg-blue-100 flex items-center justify-center">
//           <p className="text-lg font-semibold">Left 60%</p>
//         </div>

//         {/* Right 40% */}
//         <div className="w-2/5 bg-blue-300 flex items-center justify-center">
//           <p className="text-lg font-semibold">Right 40%</p>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="w-full h-screen bg-green-100 flex items-center justify-center">
//         <p className="text-lg font-semibold">How It Works Section</p>
//       </section>

//       {/* Section Three */}
//       <section className="w-full h-screen bg-yellow-100 flex items-center justify-center">
//         <p className="text-lg font-semibold">Section Three</p>
//       </section>

//       {/* Section Four */}
//       <section className="w-full h-screen bg-pink-100 flex items-center justify-center">
//         <p className="text-lg font-semibold">Section Four</p>
//       </section>
//     </div>
//   );
// };

// export default Landing;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      {/* Navbar */}
      <nav className="w-full h-16 bg-gray-800 dark:bg-gray-950 text-white flex items-center justify-between px-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-sm bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <h1 className="text-xl font-bold">MySite</h1>
        <Link to="/login">
          <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 text-sm">
            Login
          </button>
        </Link>
      </nav>

      {/* Hero Section - split 60/40 horizontally */}
      <section className="flex flex-row w-full h-screen">
        {/* Left 60% */}
        <div className="w-3/5 bg-blue-100 dark:bg-blue-900 flex flex-col items-center justify-center gap-4">
          <p className="text-lg font-semibold">Left 60%</p>
          <Link to="/services">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">
              Explore Our Services
            </button>
          </Link>
        </div>

        {/* Right 40% */}
        <div className="w-2/5 bg-blue-300 dark:bg-blue-700 flex items-center justify-center">
          <p className="text-lg font-semibold">Right 40%</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full h-screen bg-green-100 dark:bg-green-900 flex items-center justify-center">
        <p className="text-lg font-semibold">How It Works Section</p>
      </section>

      {/* Section Three */}
      <section className="w-full h-screen bg-yellow-100 dark:bg-yellow-800 flex items-center justify-center">
        <p className="text-lg font-semibold">Section Three</p>
      </section>

      {/* Section Four */}
      <section className="w-full h-screen bg-pink-100 dark:bg-pink-800 flex items-center justify-center">
        <p className="text-lg font-semibold">Section Four</p>
      </section>
    </div>
  );
};

export default Landing;