import "./output.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChatProvider } from "./context/ChatProvider";
import LandingPage from "./routes/LandingPage";
import Landing from "./routes/Landing";
import LoginComponent from "./routes/Login";
import SignupComponent from "./routes/Signup";
import OtpComponent from "./routes/OtpComponent";
import HomeClientComponent from "./routes/HomeClient";
import ClientProfilePage from "./routes/ClientProfilePage";
import ChatSection from "./components/ChatSection"; 
import ChatPage from "./routes/ChatPage";
import ChatPage1 from "./routes/ChatPage1";
import UploadProject from "./routes/UploadProjects";
import MatchConsultants from "./routes/MatchConsultants";
import ChatPage2 from "./routes/ChatPage2";
import HomeConsultant from "./routes/HomeConsultant";
import ConsultantProfilePage from "./routes/ConsultantProfilePage";

function App() {
  return (
    <div className="w-screen h-screen">
    <CookiesProvider>
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/Login" element={<LoginComponent />} />
        <Route path="/Signup" element={<SignupComponent/>} />
        <Route path="/Otp" element={<OtpComponent/>} />
        <Route path="/client" element={<HomeClientComponent/>} />
        <Route path="/client/profile" element={<ClientProfilePage/>} />
        <Route path="/client/chat" element={<ChatPage />} />
        <Route path="/client/chat1" element={<ChatPage1 />} />
        <Route path="/uploadproject" element={<UploadProject/>} />
        <Route path="/match/:projectId" element={<MatchConsultants/>} />
        <Route path="/chat" element={<ChatPage2 />} />
        <Route path="/Consultant" element={<HomeConsultant/>} />
        <Route path="/Consultant/profile" element={<ConsultantProfilePage/>} />
        {/* Add more routes here as needed */}
        
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
    </CookiesProvider>
    </div>
  );
}
export default App;