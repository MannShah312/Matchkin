// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
// // import TextInput from "../components/TextInput";

// // const OtpComponent = () => {
// //   const [otp, setOtp] = useState("");
// //   const navigate = useNavigate();

// //   const handleVerifyOtp = async () => {
// //     const response = await makeUnauthenticatedPOSTRequest("/auth/verify-otp", { otp });

// //     if (response && !response.error) {
// //       const role = localStorage.getItem("userRole");
// //       localStorage.removeItem("userRole");
// //       alert("OTP Verified!");

// //       if (role === "client") navigate("/homeClient");
// //       else if (role === "consultant") navigate("/homeConsultant");
// //       else navigate("/"); // fallback
// //     } else {
// //       alert(response?.error || "OTP verification failed");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
// //       <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
// //         <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">Enter OTP</h2>
// //         <TextInput label="OTP" placeholder="Enter OTP" value={otp} setValue={setOtp} />
// //         <button
// //           onClick={handleVerifyOtp}
// //           className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
// //         >
// //           Verify OTP
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default OtpComponent;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
// import TextInput from "../components/TextInput";

// const OtpComponent = () => {
//   const [otp, setOtp] = useState("");
//   const navigate = useNavigate();

//   const handleVerifyOtp = async () => {
//     const email = localStorage.getItem("userEmail"); // ⬅️ Get stored email
//     console.log("Email sent for OTP verification:", email);

//     if (!email) {
//       alert("Email not found. Please signup again.");
//       return navigate("/signup");
//     }

//     const response = await makeUnauthenticatedPOSTRequest("/auth/verify-otp", {
//       otp,
//       email,
//     });

//     if (response && !response.error) {
//       const role = localStorage.getItem("userRole");
//       localStorage.removeItem("userRole");
//       localStorage.removeItem("userEmail");
//       alert("OTP Verified!");

//       if (role === "client") navigate("/homeClient");
//       else if (role === "consultant") navigate("/homeConsultant");
//       else navigate("/"); // fallback
//     } else {
//       alert(response?.error || "OTP verification failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">
//           Enter OTP
//         </h2>
//         <TextInput
//           label="OTP"
//           placeholder="Enter OTP"
//           value={otp}
//           setValue={setOtp}
//         />
//         <button
//           onClick={handleVerifyOtp}
//           className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
//         >
//           Verify OTP
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OtpComponent;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";
import TextInput from "../components/TextInput";

const OtpComponent = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    const email = localStorage.getItem("userEmail");
    const role = localStorage.getItem("userRole");

    console.log("📦 LocalStorage - email:", email);
    console.log("📦 LocalStorage - role:", role);
    console.log("📨 Sending OTP verification request with:", { email, otp });

    if (!email) {
      alert("Email not found. Please signup again.");
      console.error("❌ Email not found in localStorage.");
      return navigate("/signup");
    }

    try {
      const response = await makeUnauthenticatedPOSTRequest("/auth/verify-otp", {
        otp,
        email,
      });

      console.log("✅ Response from backend:", response);

      if (response && !response.error) {
        alert("✅ OTP Verified!");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userEmail");

      if (role === "client") {
        navigate("/client");
      } else if (role === "consultant") {
        navigate("/consultant");
      } else {  
        navigate("/");
      }  
      } else {
        console.warn("⚠️ OTP verification failed:", response?.error);
        alert(response?.error || "OTP verification failed");
      }
    } catch (err) {
      console.error("🚨 Error during OTP verification:", err);
      alert("Something went wrong during OTP verification.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-4">
          Enter OTP
        </h2>
        <TextInput
          label="OTP"
          placeholder="Enter OTP"
          value={otp}
          setValue={setOtp}
        />
        <button
          onClick={handleVerifyOtp}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};
export default OtpComponent;