// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
// import TextInput from "../components/TextInput";
// import PasswordInput from "../components/PasswordInput";
// import Lottie from "lottie-react";
// import signupAnimation from "../assets/animations/Signup.json";

// const SignupComponent = () => {
//   const [username, setUsername] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("client");
//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     const data = { username, phone, email, password, role };
//     console.log("Signup data being sent:", data); // ✅ check the payload
 
//     const response = await makeUnauthenticatedPOSTRequest("/auth/signup", data);
//     console.log("Signup response:", response); // ✅ check response from backend
    
// try{
//     if (response && !response.error) {
//       localStorage.setItem("userRole", role);
//       alert("Signup successful! Please verify OTP.");
//       navigate("/otp");
//     } else {
//       console.log("Signup failed with error:", response?.error); // ✅ error info from backend
//       alert(response?.error || "Signup failed");
//     }
//     } catch (err) {
//     console.error("Signup request crashed:", err); // ✅ catch unexpected crash
//     alert("An unexpected error occurred during signup");
//   }
//   };

//   return (
//     <div className="min-h-screen flex font-poppins">
//       <div className="w-3/5 bg-gradient-to-br from-blue-500 to-blue-900 flex items-center justify-center p-12">
//         <Lottie animationData={signupAnimation} className="w-full max-w-3xl" loop />
//       </div>

//       <div className="w-2/5 flex flex-col justify-center px-12">
//         <h2 className="text-4xl font-bold text-blue-700 mb-6">Create Your Account</h2>
//         <p className="text-sm text-gray-500 mb-8">Signup to continue</p>

//         <TextInput label="Username" value={username} setValue={setUsername} placeholder="Enter your name" />
//         <TextInput label="Phone Number" value={phone} setValue={setPhone} placeholder="Enter your phone" />
//         <TextInput label="Email" value={email} setValue={setEmail} placeholder="Enter your email" />
//         <PasswordInput label="Password" value={password} setValue={setPassword} placeholder="Enter your password" />

//         <div className="mt-4 mb-6">
//           <label className="block mb-1 text-sm font-medium text-gray-700">Select Role</label>
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="w-full border px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
//           >
//             <option value="client">Client</option>
//             <option value="consultant">Consultant</option>
//           </select>
//         </div>

//         <button
//           onClick={handleSignup}
//           className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
//         >
//           Sign Up
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SignupComponent;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import signupAnimation from "../assets/animations/Signup.json";

const SignupComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const data = { name, email, mobile, password, role };
    console.log("Signup data being sent:", data);

    const response = await makeUnauthenticatedPOSTRequest("/auth/signup", data);

    console.log("Signup response:", response);

    if (response && !response.error) {
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", email);

      alert("Signup successful! Please verify OTP.");
      navigate("/otp");
    } else {
      alert(response?.error || "Signup failed");
      console.error("Signup failed with error:", response?.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-poppins">
      {/* Left animation section */}
      <div className="md:w-3/5 w-full bg-gradient-to-br from-blue-500 to-blue-900 flex items-center justify-center p-6 md:p-12">
        <Lottie animationData={signupAnimation} className="w-full max-w-3xl" loop />
      </div>

      {/* Right form section */}
      <div className="md:w-2/5 w-full flex flex-col justify-center px-6 md:px-12 py-8">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">Create Your Account</h2>
        <p className="text-sm text-gray-500 mb-6">Signup to continue</p>

        <TextInput label="Full Name" value={name} setValue={setName} placeholder="Enter your name" />
        <TextInput label="Email" value={email} setValue={setEmail} placeholder="Enter your email" />
        <TextInput label="Phone Number" value={mobile} setValue={setMobile} placeholder="Enter your phone number" />
        <PasswordInput label="Password" value={password} setValue={setPassword} placeholder="Enter your password" />

        <div className="mt-4 mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700">Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="client">Client</option>
            <option value="consultant">Consultant</option>
          </select>
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-sm sm:text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupComponent;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie"; // 👈 Import cookies
// import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
// import TextInput from "../components/TextInput";
// import PasswordInput from "../components/PasswordInput";
// import Lottie from "lottie-react";
// import { Link } from "react-router-dom";
// import signupAnimation from "../assets/animations/Signup.json";

// const SignupComponent = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("client");
//   const [cookies, setCookie] = useCookies(["token", "userRole", "userEmail"]); // 👈 Set up cookies

//   const navigate = useNavigate();

//   const handleSignup = async () => {
//     const data = { name, email, mobile, password, role };
//     console.log("Signup data being sent:", data);

//     const response = await makeUnauthenticatedPOSTRequest("/auth/signup", data);

//     console.log("Signup response:", response);

//     if (response && !response.error) {
//       // ✅ Set cookies (optional: set an expiration)
//       setCookie("userRole", role, { path: "/" });
//       setCookie("userEmail", email, { path: "/" });

//       // If your backend returns a token during signup (common case):
//       if (response.token) {
//         setCookie("token", response.token, { path: "/" });
//       }

//       alert("Signup successful! Please verify OTP.");
//       navigate("/otp");
//     } else {
//       alert(response?.error || "Signup failed");
//       console.error("Signup failed with error:", response?.error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row font-poppins">
//       {/* Left animation section */}
//       <div className="md:w-3/5 w-full bg-gradient-to-br from-blue-500 to-blue-900 flex items-center justify-center p-6 md:p-12">
//         <Lottie animationData={signupAnimation} className="w-full max-w-3xl" loop />
//       </div>

//       {/* Right form section */}
//       <div className="md:w-2/5 w-full flex flex-col justify-center px-6 md:px-12 py-8">
//         <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">Create Your Account</h2>
//         <p className="text-sm text-gray-500 mb-6">Signup to continue</p>

//         <TextInput label="Full Name" value={name} setValue={setName} placeholder="Enter your name" />
//         <TextInput label="Email" value={email} setValue={setEmail} placeholder="Enter your email" />
//         <TextInput label="Phone Number" value={mobile} setValue={setMobile} placeholder="Enter your phone number" />
//         <PasswordInput label="Password" value={password} setValue={setPassword} placeholder="Enter your password" />

//         <div className="mt-4 mb-6">
//           <label className="block mb-1 text-sm font-medium text-gray-700">Select Role</label>
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="w-full border px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
//           >
//             <option value="client">Client</option>
//             <option value="consultant">Consultant</option>
//           </select>
//         </div>

//         <button
//           onClick={handleSignup}
//           className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
//         >
//           Sign Up
//         </button>
//         <p className="mt-4 text-center text-sm sm:text-base">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600 font-semibold">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignupComponent;
