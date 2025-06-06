import { Icon } from "@iconify/react";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full bg-blue-500 px-8 py-4 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <div className="bg-yellow-300 w-8 h-8 flex items-center justify-center rounded-full">
          <Icon icon="mdi:tools" className="text-black w-4 h-4" /> {/* Use your desired icon */}
        </div>
        <span className="text-white font-bold text-2xl">Matchkin</span>
      </div>

      {/* Center: Menu */}
      <div className="hidden md:flex bg-gray-500 bg-opacity-30 px-6 py-2 rounded-xl space-x-8 text-white text-sm font-medium">
        {/* <a href="#home" className="hover:text-yellow-300">Home</a>
        <a href="#about" className="hover:text-yellow-300">About</a>
        <a href="#services" className="hover:text-yellow-300">Services</a> */}
        <a href="#home" className="hover:text-yellow-300">Home</a>
        <a href="#about" className="hover:text-yellow-300">About</a>
        <a href="#services" className="hover:text-yellow-300">Services</a>
      </div>

      {/* Right: Phone + Contact Button */}
      <div className="flex items-center space-x-4">
        <button className="bg-yellow-300 text-black font-semibold px-4 py-2 rounded-lg hover:bg-yellow-400 transition"
        onClick={() => navigate('/login')}>
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;