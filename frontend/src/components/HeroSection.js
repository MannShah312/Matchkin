// import React from "react";
// import Lottie from "lottie-react";
// import animationData from "../assets/animations/hero.json"; // Replace with actual path

// const HeroSection = () => {
//   return (
//     <section className="bg-blue-600 bg-radial text-white min-h-screen flex items-center justify-center px-6">
//       <div className="max-w-7xl w-full grid md:grid-cols-2 items-center gap-12 py-20">

//         {/* Left Side */}
//         <div>
//           {/* <h1 className="text-xl font-bold leading-tight mb-6">
//             Smart Consultant <br /> Matching For Your Next Project
//           </h1> */}
//           <h1 className="text-6xl font-bold leading-tight mb-6 flex flex-wrap gap-2">
//             {[
//               "Smart",
//               "Consultant",
//               "Matching",
//               "For",
//               "Your",
//               "Next",
//               "Project",
//             ].map((word, index) => (
//               <span
//                 key={index}
//                 className="inline-block transition-transform duration-300 hover:-translate-y-1"
//               >
//                 {word}
//               </span>
//             ))}
//           </h1>
//           <p className="text-2xl text-blue-100 mb-8">
//             Our platform matches experts with projects based on skills, experience, and domain expertise.
//           </p>
//           <div className="flex items-center gap-4 mt-32">
//             <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-5 rounded-lg shadow">
//               Explore our services
//             </button>
//           </div>
//           {/* <div className="flex items-center space-x-2">
//             <img src="/user1.png" alt="user1" className="w-10 h-10 rounded-full border-2 border-white" />
//             <img src="/user2.png" alt="user2" className="w-10 h-10 rounded-full border-2 border-white -ml-3" />
//             <img src="/user3.png" alt="user3" className="w-10 h-10 rounded-full border-2 border-white -ml-3" />
//             <span className="text-sm text-blue-100 ml-2">From 2000+ ratings ⭐⭐⭐⭐⭐</span>
//           </div> */}
//         </div>

//         {/* Right Side */}
//         <div className="bg-yellow-300 rounded-3xl flex justify-center items-center p-16">
//           <div className="w-full max-w-3xl">
//             <Lottie animationData={animationData} loop />
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import React from "react";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import animationData from "../assets/animations/hero.json";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const headlineWords = [
    "Smart",
    "Consultant",
    "Matching",
    "For",
    "Your",
    "Next",
    "Project",
  ];

  const navigate = useNavigate();

  return (
    <section className="bg-blue-600 text-white min-h-screen flex items-center justify-center px-6">
      <div className="max-w-7xl w-full grid md:grid-cols-2 items-center gap-12 py-20">

        {/* Left Side */}
        <div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 flex flex-wrap gap-3">
            {headlineWords.map((word, index) => (
              <motion.span
                key={index}
                className="inline-block cursor-default"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <p className="text-2xl text-blue-100 mb-8">
            Our platform matches experts with projects based on skills, experience, and domain expertise.
          </p>
          <div className="flex items-center gap-4 mt-32">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-5 rounded-lg shadow"
            onClick={() => navigate('/signup')}>
              Explore our services
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-yellow-300 rounded-3xl flex justify-center items-center p-16">
          <div className="w-full max-w-3xl">
            <Lottie animationData={animationData} loop />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;