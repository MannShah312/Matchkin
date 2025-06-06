// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useCookies } from "react-cookie";
// // import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
// // import TextInput from "../components/TextInput";
// // import PasswordInput from "../components/PasswordInput";
// // import Lottie from "lottie-react";
// // import loginAnimation from "../assets/animations/Signup.json"; // Replace with your animation file
// // import { Link } from "react-router-dom";
// // import {jwtDecode} from "jwt-decode";

// // console.log("Helper function:", makeUnauthenticatedPOSTRequest);

// // const LoginComponent = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [cookies, setCookie] = useCookies(["token"]);
// //   const navigate = useNavigate();

// //   // const login = async () => {
// //   //   const data = { email, password };
// //   //   const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);
// //   //   if (response && !response.error) {
// //   //     const token = response.token;
// //   //     const date = new Date();
// //   //     date.setDate(date.getDate() + 30);
// //   //     setCookie("token", token, { path: "/", expires: date });
// //   //     alert("Login successful!");
// //   //     navigate("/"); // Navigate to OTP screen if required
// //   //   } else {
// //   //     alert(response?.error || "Login failed");
// //   //   }
// //   // };

// //   const login = async () => {
// //   const data = { email, password };
// //   const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);

// //     console.log("Login response:", response); 

// //   if (response && !response.error) {
// //     const token = response.token;
// //     const user = response.user;
// //     const decoded = jwtDecode(token); // decode to extract role
// //     const role = decoded.role;

// //     console.log("User from response:", user); // ✅ confirm user exists

// //     const date = new Date();
// //     date.setDate(date.getDate() + 30);
// //     // setCookie("token", token, { path: "/", expires: date });
// //     localStorage.setItem("token", token);
// //     localStorage.setItem("user", JSON.stringify(user)); // ← store user object too


// //     alert("Login successful!");

// //     if (role === "client") {
// //       navigate("/client/chat");
// //     } else if (role === "consultant") {
// //       navigate("/consultant/chat");
// //     } else {
// //       navigate("/"); // fallback
// //     }
// //   } else {
// //     alert(response?.error || "Login failed");
// //   }
// // };

// //   return (
// //     <div className="min-h-screen flex font-poppins">
// //       {/* Left: Animation */}
// //       <div className="w-3/5 bg-[radial-gradient(circle_at_center,_#3B82F6,_#2563EB,_#1E40AF)] flex items-center justify-center p-12">
// //         <Lottie animationData={loginAnimation} className="w-full max-w-3xl" loop />
// //       </div>

// //       {/* Right: Login Form */}
// //       <div className="w-2/5 flex flex-col justify-center px-12">
// //         <h2 className="text-5xl font-bold text-blue-700 mb-6">Login to Your Account</h2>
// //         <p className="text-lg  text-gray-500 mb-8">Access your dashboard with secure login</p>

// //         <TextInput
// //           label="Email"
// //           placeholder="Enter your email"
// //           value={email}
// //           setValue={setEmail}
// //         />
// //         <PasswordInput
// //           label="Password"
// //           placeholder="Enter your password"
// //           value={password}
// //           setValue={setPassword}
// //         />

// //         <button
// //           onClick={(e) => {
// //             e.preventDefault();
// //             login();
// //           }}
// //           className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
// //         >
// //           Login
// //         </button>

// //         <p className="mt-4 text-xl text-center">
// //           Don’t have an account?{" "}
// //           <Link to="/signup" className="text-blue-600 font-semibold">
// //             Sign up
// //           </Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginComponent;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
// import TextInput from "../components/TextInput";
// import PasswordInput from "../components/PasswordInput";
// import Lottie from "lottie-react";
// import loginAnimation from "../assets/animations/Signup.json";
// import { Link } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const LoginComponent = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [, setCookie] = useCookies(["token"]);
//   const navigate = useNavigate();

//   const login = async () => {
//     const data = { email, password };
//     const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);

//     if (response && !response.error) {
//       const token = response.token;
//       console.log("Token from server:", token); // <-- Add this
//       const user = response.user;
//       const decoded = jwtDecode(token);
//       const role = decoded.role;

//       const date = new Date();
//       date.setDate(date.getDate() + 30);

//       localStorage.setItem("token", token);
//       console.log("Token saved:", localStorage.getItem("token"));
//       localStorage.setItem("user", JSON.stringify(user));

//       alert("Login successful!");

//       if (role === "client") {
//         navigate("/client");
//       } else if (role === "consultant") {
//         navigate("/consultant");
//       } else {
//         navigate("/");
//       }
//     } else {
//       alert(response?.error || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row font-poppins">
//       {/* Left: Animation */}
//       <div className="w-full lg:w-3/5 bg-[radial-gradient(circle_at_center,_#3B82F6,_#2563EB,_#1E40AF)] flex items-center justify-center p-6 lg:p-12">
//         <Lottie animationData={loginAnimation} className="w-full max-w-md sm:max-w-xl lg:max-w-3xl" loop />
//       </div>

//       {/* Right: Login Form */}
//       <div className="w-full lg:w-2/5 flex flex-col justify-center px-6 sm:px-10 lg:px-12 py-10">
//         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-700 mb-4">Login to Your Account</h2>
//         <p className="text-base sm:text-lg text-gray-500 mb-6">
//           Access your dashboard with secure login
//         </p>

//         <TextInput
//           label="Email"
//           placeholder="Enter your email"
//           value={email}
//           setValue={setEmail}
//         />
//         <PasswordInput
//           label="Password"
//           placeholder="Enter your password"
//           value={password}
//           setValue={setPassword}
//         />

//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             login();
//           }}
//           className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
//         >
//           Login
//         </button>

//         <p className="mt-4 text-center text-sm sm:text-base">
//           Don’t have an account?{" "}
//           <Link to="/signup" className="text-blue-600 font-semibold">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginComponent;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import Lottie from "lottie-react";
import loginAnimation from "../assets/animations/Signup.json";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    const data = { email, password };
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);

    if (response && !response.error) {
      const token = response.token;
      const user = response.user;

      const decoded = jwtDecode(token);
      const role = decoded.role;

      const date = new Date();
      date.setDate(date.getDate() + 30);

      // ✅ Set token as cookie
      setCookie("token", token, { path: "/", expires: date });

      // Optionally store user data in localStorage (not token)
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful!");

      // Role-based navigation
      if (role === "client") {
        navigate("/client");
      } else if (role === "consultant") {
        navigate("/consultant");
      } else {
        navigate("/");
      }
    } else {
      alert(response?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-poppins">
      {/* Left: Animation */}
      <div className="w-full lg:w-3/5 bg-[radial-gradient(circle_at_center,_#3B82F6,_#2563EB,_#1E40AF)] flex items-center justify-center p-6 lg:p-12">
        <Lottie animationData={loginAnimation} className="w-full max-w-md sm:max-w-xl lg:max-w-3xl" loop />
      </div>

      {/* Right: Login Form */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center px-6 sm:px-10 lg:px-12 py-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-700 mb-4">Login to Your Account</h2>
        <p className="text-base sm:text-lg text-gray-500 mb-6">
          Access your dashboard with secure login
        </p>

        <TextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          setValue={setEmail}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          setValue={setPassword}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm sm:text-base">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LoginComponent;