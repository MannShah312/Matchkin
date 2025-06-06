// // import React, { useEffect } from "react";
// // import { ChatState } from "../context/ChatProvider";
// // import { makeAuthenticatedGETRequest } from "../utils/serverHelpers"; // ✅ Use your helper

// // const MyChats = () => {
// //   const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();

// //   const fetchChats = async () => {
// //     try {
// //       const data = await makeAuthenticatedGETRequest("/chat/list"); // ✅ Correct endpoint
// //       setChats(data);
// //     } catch (error) {
// //       console.error("Failed to load the chats", error);
// //     }
// //   };

// //   useEffect(() => {
// //     if (user) fetchChats();
// //   }, [user]);

// //   return (
// //     <div className="bg-white rounded p-4 shadow h-full overflow-y-auto">
// //       <h2 className="text-xl font-bold mb-4">My Chats</h2>
// //       {chats.map((chat) => (
// //         <div
// //           key={chat._id}
// //           className={`p-3 mb-2 rounded cursor-pointer ${
// //             selectedChat?._id === chat._id ? "bg-blue-500 text-white" : "bg-gray-100"
// //           }`}
// //           onClick={() => setSelectedChat(chat)}
// //         >
// //           {chat.isGroupChat
// //             ? chat.chatName
// //             : chat.users.find((u) => u._id !== user._id)?.name}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };
// // export default MyChats;

// // components/MyChats.js
// // import React, { useEffect } from "react";
// // import { ChatState } from "../context/ChatProvider";
// // import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

// // const MyChats = () => {
// //   const { chats, setChats, selectedChat, setSelectedChat } = ChatState();

// //   useEffect(() => {
// //     const fetchChats = async () => {
// //       try {
// //         const data = await makeAuthenticatedGETRequest("/chat");
// //         setChats(data);
// //       } catch (error) {
// //         console.error("Error fetching chats", error);
// //       }
// //     };
// //     fetchChats();
// //   }, [setChats]);

// //   return (
// //     <div className="w-1/3 bg-gray-800 text-white p-4">
// //       <h2 className="text-lg font-semibold mb-4">My Chats</h2>
// //       {chats.map((chat) => (
// //         <div
// //           key={chat._id}
// //           onClick={() => setSelectedChat(chat)}
// //           className={`p-3 rounded mb-2 cursor-pointer ${selectedChat?._id === chat._id ? "bg-blue-600" : "bg-gray-700"}`}
// //         >
// //           {chat.isGroupChat ? chat.chatName : chat.users.find(u => u.name !== localStorage.getItem("userName"))?.name}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default MyChats;
// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // const MyChats = ({ selectedChat, setSelectedChat }) => {
// //   const [chats, setChats] = useState([]);

// //   const fetchChats = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       const config = {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       };
// //       const { data } = await axios.get("/chat", config);
// //       setChats(data);
// //     } catch (error) {
// //       console.error("Failed to load chats", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchChats();
// //   }, []);

// //   const getChatName = (chat) => {
// //     // Only show the *other* user's name
// //     const userId = JSON.parse(localStorage.getItem("user"))._id;
// //     return chat.users.find((u) => u._id !== userId)?.name || "Chat";
// //   };

// //   return (
// //     <div className="w-1/3 bg-gray-800 text-white p-4">
// //       <h2 className="text-xl font-bold mb-4">My Chats</h2>
// //       {chats.map((chat) => (
// //         <div
// //           key={chat._id}
// //           onClick={() => setSelectedChat(chat)}
// //           className={`p-3 mb-2 rounded cursor-pointer ${
// //             selectedChat?._id === chat._id
// //               ? "bg-blue-500"
// //               : "bg-gray-700 hover:bg-gray-600"
// //           }`}
// //         >
// //           {chat.isGroupChat ? chat.chatName : getChatName(chat)}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default MyChats;

// import { useEffect, useState } from "react";
// import { makeAuthenticatedGETRequest } from "../utils/serverHelpers"; // Update path if needed

// const MyChats = ({ selectedChat, setSelectedChat }) => {
//   const [chats, setChats] = useState([]);

//   const fetchChats = async () => {
//     try {
//       const data = await makeAuthenticatedGETRequest("/chat/list");
//       if (Array.isArray(data)) {
//         setChats(data);
//       } else {
//         console.error("Unexpected response:", data);
//       }
//     } catch (error) {
//       console.error("Failed to load chats:", error);
//     }
//   };

//   useEffect(() => {
//     fetchChats();
//   }, []);

//   const getChatName = (chat) => {
//   try {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (!storedUser || !storedUser._id) return "Unknown Chat";

//     const otherUser = chat.users.find((u) => u._id !== storedUser._id);
//     console.log("Stored User ID:", storedUser._id);
//     return otherUser?.name || "Unknown Chat";
//   } catch (err) {
//     console.error("Error getting chat name:", err);
//     console.log("Chat Users:", chat.users);

//     return "Unknown Chat";
//   }
//   };


//   // const getChatName = (chat) => {
//   //   const user = JSON.parse(localStorage.getItem("user"));
//   //   const userId = user?._id;
//   //   if (!userId) return "Unknown Chat";

//   //   // Return the name of the *other* user
//   //   return chat.users.find((u) => u._id !== userId)?.name || "Chat";
//   // };

//   return (
//     <div className="w-1/3 bg-gray-800 text-white p-4 overflow-y-auto">
//       <h2 className="text-xl font-bold mb-4">My Chats</h2>
//       {chats.map((chat) => (
//         <div
//           key={chat._id}
//           onClick={() => setSelectedChat(chat)}
//           className={`p-3 mb-2 rounded cursor-pointer transition-all ${
//             selectedChat?._id === chat._id
//               ? "bg-blue-500"
//               : "bg-gray-700 hover:bg-gray-600"
//           }`}
//         >
//           {chat.isGroupChat ? chat.chatName : getChatName(chat)}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyChats;

import React, { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import { getChatName } from "../utils/chatUtils";

const MyChats = ({ selectedChat, setSelectedChat }) => {
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("one2one");

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  useEffect(() => {
    fetchChats();
    fetchUsers();
  }, []);

  const fetchChats = async () => {
    const res = await makeAuthenticatedGETRequest("/chat/list");
    setChats(res || []);
  };

  const fetchUsers = async () => {
    const endpoint = role === "client" ? "/consultants/all" : "/client/all";
    const res = await makeAuthenticatedGETRequest(endpoint);
    setUsers(res || []);
  };

  const startChat = async (userId) => {
    const res = await makeAuthenticatedPOSTRequest("/chat/start", { userId });
    if (res && res._id) {
      setSelectedChat(res);
      fetchChats();
    }
  };

  const filteredChats = chats.filter(chat =>
    activeTab === "group" ? chat.isGroupChat : !chat.isGroupChat
  );

  return (
    <div className="w-1/4 bg-gray-800 text-white p-4 flex flex-col">
      <h2 className="text-lg font-bold mb-4">My Chats</h2>

      <div className="flex gap-2 mb-4 text-sm">
        <button
          className={`px-2 py-1 rounded ${activeTab === "all" ? "bg-blue-600" : "bg-gray-700"}`}
          onClick={() => setActiveTab("all")}
        >
          All Users
        </button>
        <button
          className={`px-2 py-1 rounded ${activeTab === "group" ? "bg-blue-600" : "bg-gray-700"}`}
          onClick={() => setActiveTab("group")}
        >
          Groups
        </button>
        <button
          className={`px-2 py-1 rounded ${activeTab === "one2one" ? "bg-blue-600" : "bg-gray-700"}`}
          onClick={() => setActiveTab("one2one")}
        >
          1-on-1
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {activeTab === "all"
          ? users.map((user) => (
              <div
                key={user._id}
                onClick={() => startChat(user._id)}
                className="bg-gray-700 p-2 rounded hover:bg-blue-500 cursor-pointer"
              >
                {user.name}
              </div>
            ))
          : filteredChats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`p-2 rounded cursor-pointer ${
                  selectedChat?._id === chat._id ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                {chat.isGroupChat ? chat.chatName : getChatName(chat)}
              </div>
            ))}
      </div>
    </div>
  );
};
export default MyChats;