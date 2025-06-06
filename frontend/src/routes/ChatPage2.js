// // // import React, { useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import MyChats from "../components/MyChats";
// // // import ChatBox from "../components/ChatBox";
// // // import { ChatState } from "../context/ChatProvider";

// // // const ChatPage = () => {
// // //   const navigate = useNavigate();
// // //   const { user } = ChatState();

// // //   useEffect(() => {
// // //     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
// // //     if (!userInfo) {
// // //       navigate("/login");
// // //     }
// // //   }, [navigate]);

// // //   return (
// // //     <div className="w-full h-[91.5vh] p-4">
// // //       <div className="flex justify-between h-full">
// // //         <div className="w-1/3">
// // //           <MyChats />
// // //         </div>
// // //         <div className="w-2/3">
// // //           <ChatBox />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ChatPage;


// // import React, { useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { ChatState } from "../context/ChatProvider";
// // import io from "socket.io-client";
// // import { jwtDecode } from "jwt-decode";

// // const ENDPOINT = "http://localhost:8080";

// // const ChatPage = () => {
// //   const {
// //     setUser,
// //     socket,
// //     setSocket,
// //     setSocketConnected,
// //   } = ChatState();

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       navigate("/login");
// //       return;
// //     }

// //     const decoded = jwtDecode(token);
// //     setUser(decoded);

// //     const socketInstance = io(ENDPOINT, {
// //       auth: { token },
// //     });

// //     setSocket(socketInstance);

// //     socketInstance.on("connect", () => {
// //       setSocketConnected(true);
// //       console.log("✅ Socket connected");
// //     });

// //     return () => {
// //       socketInstance.disconnect();
// //     };
// //   }, [navigate, setUser, setSocket, setSocketConnected]);

// //   return (
// //     <div className="w-full h-screen flex">
// //       {/* Add your chat layout here */}
// //       <div className="w-full text-center pt-20 text-2xl font-semibold">Welcome to the chat page</div>
// //     </div>
// //   );
// // };
// // export default ChatPage;



// // // routes/ChatPage.js
// // import React from "react";
// // import SideDrawer from "../components/SideDrawer";
// // import MyChats from "../components/MyChats";
// // import ChatBox from "../components/ChatBox";

// // const ChatPage = () => {
// //   return (
// //     <div className="h-screen w-full">
// //       <SideDrawer />
// //       <div className="flex h-[calc(100%-60px)]">
// //         <MyChats />
// //         <ChatBox />
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatPage;


// import { useState } from "react";
// import SideDrawer from "../components/SideDrawer";
// import MyChats from "../components/MyChats";
// import ChatBox from "../components/ChatBox";

// const ChatPage = () => {
//   const [selectedChat, setSelectedChat] = useState(null);

//   return (
//     <div className="h-screen flex flex-col">
//       <SideDrawer />
//       <div className="flex flex-1">
//         <MyChats selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
//         <ChatBox selectedChat={selectedChat} />
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

import React, { useState } from "react";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import SideDrawer from "../components/SideDrawer";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Top bar */}
      <SideDrawer />

      {/* Body section */}
      <div className="flex flex-1">
        {/* Left: Sidebar */}
        <MyChats selectedChat={selectedChat} setSelectedChat={setSelectedChat} />

        {/* Right: Chat Window */}
        <div className="w-3/4">
          {selectedChat ? (
            <ChatBox chat={selectedChat} />
          ) : (
            <div className="flex justify-center items-center h-full text-gray-500">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ChatPage;