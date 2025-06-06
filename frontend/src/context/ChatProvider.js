// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import io from "socket.io-client";

// const ChatContext = createContext();
// const ENDPOINT = "http://localhost:8080"; // Change to your backend URL if deployed
// let socket;

// export const ChatProvider = ({ children }) => {
//   const [user, setUser] = useState();
//   const [chats, setChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [socketConnected, setSocketConnected] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     setUser(userInfo);

//     if (!userInfo) {
//       navigate("/login");
//       return;
//     }

//     socket = io(ENDPOINT, {
//       auth: { token: userInfo.token }
//     });

//     socket.on("connect", () => {
//       setSocketConnected(true);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [navigate]);

//   return (
//     <ChatContext.Provider
//       value={{
//         user,
//         setUser,
//         chats,
//         setChats,
//         selectedChat,
//         setSelectedChat,
//         socket,
//         socketConnected,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };
// export const ChatState = () => {
//   return useContext(ChatContext);
// };


// import React, { createContext, useContext, useState } from "react";

// const ChatContext = createContext();

// export const ChatProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [socket, setSocket] = useState(null);
//   const [socketConnected, setSocketConnected] = useState(false);

//   return (
//     <ChatContext.Provider
//       value={{
//         user,
//         setUser,
//         chats,
//         setChats,
//         selectedChat,
//         setSelectedChat,
//         socket,
//         setSocket,
//         socketConnected,
//         setSocketConnected,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const ChatState = () => useContext(ChatContext);


import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  // 👇 This useEffect ensures user is fetched on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        socket,
        setSocket,
        socketConnected,
        setSocketConnected,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => useContext(ChatContext);