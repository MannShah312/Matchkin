// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import ChatList from "../components/ChatList";
// import ChatWindow from "../components/ChatWindow";

// const ChatPage = ({ role }) => {
//   const [activeTab, setActiveTab] = useState("direct"); // direct | all | group
//   const [selectedChat, setSelectedChat] = useState(null);
//   const navigate = useNavigate();

//   const handleProfileClick = () => {
//     navigate(`/client/profile`);
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

//       {/* Chat List */}
//       <div className="w-80 border-r border-gray-300 p-4 overflow-y-auto">
//         <ChatList
//           activeTab={activeTab}
//           onSelectChat={setSelectedChat}
//           role={role}
//         />
//       </div>

//       {/* Chat Window */}
//       <div className="flex-1 relative flex flex-col">
//         <div className="absolute top-4 right-6">
//           <button
//             onClick={handleProfileClick}
//             className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
//           >
//             Profile
//           </button>
//         </div>
//         <ChatWindow chat={selectedChat} />
//       </div>
//     </div>
//   );
// };

// export default ChatPage;


import { useEffect, useState } from "react";
import ChatSidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import UserList from "../components/ChatList";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    makeAuthenticatedGETRequest("/chat/list").then(setChats);
  }, []);

  return (
    <div className="flex h-screen">
      <ChatSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="w-64 border-r">
        {activeTab === "users" && <UserList setActiveChat={setActiveChat} role={role} />}
        {activeTab === "chats" && chats.map(chat => (
          <div key={chat._id} className="p-3 border-b cursor-pointer" onClick={() => setActiveChat(chat)}>
            <div className="font-semibold">{chat.isGroup ? chat.name : chat.participants.find(p => p._id !== userId)?.name}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 relative">
        <div className="absolute top-2 right-2">
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded-md"
            onClick={() => navigate(`/client/profile`)}>
            Profile
          </button>
        </div>
        {activeChat ? <ChatWindow chat={activeChat} /> : <div className="flex items-center justify-center h-full text-gray-400">Select a chat</div>}
      </div>
    </div>
  );
}