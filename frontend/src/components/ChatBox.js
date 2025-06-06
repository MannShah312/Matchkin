// // // // // import React, { useEffect, useState } from "react";
// // // // // import { ChatState } from "../context/ChatProvider";
// // // // // import {
// // // // //   makeAuthenticatedGETRequest,
// // // // //   makeAuthenticatedPOSTRequest,
// // // // // } from "../utils/serverHelpers"

// // // // // const ChatBox = () => {
// // // // //   const { selectedChat, user, socket } = ChatState();
// // // // //   const [messages, setMessages] = useState([]);
// // // // //   const [newMessage, setNewMessage] = useState("");

// // // // //   const fetchMessages = async () => {
// // // // //     if (!selectedChat) return;

// // // // //     try {
// // // // //       const data = await makeAuthenticatedGETRequest(`/chat/${selectedChat._id}/messages`);
// // // // //       setMessages(data);

// // // // //       socket.emit("join-chat", selectedChat._id);
// // // // //     } catch (error) {
// // // // //       console.error("Failed to load messages", error);
// // // // //     }
// // // // //   };

// // // // //   const sendMessage = async (e) => {
// // // // //     e.preventDefault();
// // // // //     if (!newMessage.trim()) return;

// // // // //     try {
// // // // //       const data = await makeAuthenticatedPOSTRequest(
// // // // //         `/chat/${selectedChat._id}/message`,
// // // // //         { content: newMessage }
// // // // //       );

// // // // //       setMessages((prev) => [...prev, data]);

// // // // //       socket.emit("send-message", {
// // // // //         chatId: selectedChat._id,
// // // // //         content: newMessage,
// // // // //       });

// // // // //       setNewMessage("");
// // // // //     } catch (error) {
// // // // //       console.error("Error sending message", error);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchMessages();

// // // // //     if (socket) {
// // // // //       socket.on("receive-message", (newMsg) => {
// // // // //         if (newMsg.chatId === selectedChat?._id) {
// // // // //           setMessages((prev) => [...prev, newMsg]);
// // // // //         }
// // // // //       });
// // // // //     }

// // // // //     return () => {
// // // // //       if (socket) socket.off("receive-message");
// // // // //     };
// // // // //   }, [selectedChat]);

// // // // //   if (!selectedChat)
// // // // //     return (
// // // // //       <div className="h-full flex items-center justify-center">
// // // // //         Select a chat
// // // // //       </div>
// // // // //     );

// // // // //   return (
// // // // //     <div className="bg-white rounded p-4 shadow h-full flex flex-col">
// // // // //       <div className="flex-grow overflow-y-auto mb-4">
// // // // //         {messages.map((msg) => (
// // // // //           <div key={msg._id} className="mb-2">
// // // // //             <strong>{msg.sender.name}:</strong> {msg.content}
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>

// // // // //       <form onSubmit={sendMessage} className="flex gap-2">
// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder="Type your message..."
// // // // //           value={newMessage}
// // // // //           onChange={(e) => setNewMessage(e.target.value)}
// // // // //           className="flex-grow px-4 py-2 border rounded"
// // // // //         />
// // // // //         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
// // // // //           Send
// // // // //         </button>
// // // // //       </form>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default ChatBox;


// // // // // components/ChatBox.js
// // // // import React, { useEffect, useState } from "react";
// // // // import { ChatState } from "../context/ChatProvider";
// // // // import {makeAuthenticatedGETRequest,  makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";

// // // // const ChatBox = () => {
// // // //   const { selectedChat, socket } = ChatState();
// // // //   const [messages, setMessages] = useState([]);
// // // //   const [newMessage, setNewMessage] = useState("");

// // // //   useEffect(() => {
// // // //     if (!selectedChat) return;

// // // //     const fetchMessages = async () => {
// // // //       try {
// // // //         const data = await makeAuthenticatedGETRequest(`/message/${selectedChat._id}`);
// // // //         setMessages(data);
// // // //         socket.emit("join chat", selectedChat._id);
// // // //       } catch (error) {
// // // //         console.error("Error loading messages", error);
// // // //       }
// // // //     };

// // // //     fetchMessages();
// // // //   }, [selectedChat, socket]);

// // // //   useEffect(() => {
// // // //     if (!socket) return;
// // // //     socket.on("message received", (newMsg) => {
// // // //       if (selectedChat && newMsg.chat._id === selectedChat._id) {
// // // //         setMessages((prev) => [...prev, newMsg]);
// // // //       }
// // // //     });
// // // //   }, [socket, selectedChat]);

// // // //   const sendMessage = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!newMessage.trim()) return;

// // // //     try {
// // // //       const data = await makeAuthenticatedPOSTRequest("/message", {
// // // //         content: newMessage,
// // // //         chatId: selectedChat._id,
// // // //       });
// // // //       socket.emit("new message", data);
// // // //       setMessages([...messages, data]);
// // // //       setNewMessage("");
// // // //     } catch (error) {
// // // //       console.error("Send message error", error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="w-2/3 bg-gray-100 p-4 overflow-y-auto h-full">
// // // //       {selectedChat ? (
// // // //         <>
// // // //           <h2 className="font-bold mb-4">{selectedChat.chatName || "Chat"}</h2>
// // // //           <div className="space-y-2 h-96 overflow-y-scroll">
// // // //             {messages.map((msg) => (
// // // //               <div key={msg._id} className="bg-blue-200 p-2 rounded">
// // // //                 <strong>{msg.sender.name}</strong>: {msg.content}
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //           <form onSubmit={sendMessage} className="mt-4 flex">
// // // //             <input
// // // //               type="text"
// // // //               value={newMessage}
// // // //               onChange={(e) => setNewMessage(e.target.value)}
// // // //               placeholder="Type a message..."
// // // //               className="flex-grow p-2 border border-gray-300 rounded-l"
// // // //             />
// // // //             <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">
// // // //               Send
// // // //             </button>
// // // //           </form>
// // // //         </>
// // // //       ) : (
// // // //         <p>Select a chat to start messaging</p>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };


// // // // export default ChatBox;
// // // import React, { useEffect, useState } from "react";
// // // import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
// // // import { getChatName } from "../utils/chatUtils";

// // // const ChatBox = ({ chat }) => {
// // //   const [messages, setMessages] = useState([]);
// // //   const [newMsg, setNewMsg] = useState("");

// // //   const fetchMessages = async () => {
// // //     const res = await makeAuthenticatedGETRequest(`/chat/${chat._id}/messages`);
// // //     setMessages(res || []);
// // //   };

// // //   const handleSend = async (e) => {
// // //     e.preventDefault();
// // //     if (!newMsg.trim()) return;

// // //     const res = await makeAuthenticatedPOSTRequest(`/chat/message`, {
// // //       chatId: chat._id,
// // //       content: newMsg,
// // //     });


// // //     // const res = await makeAuthenticatedPOSTRequest(`/chat/${chat._id}/message`, {
// // //     //   content: newMsg,
// // //     // });

// // //     if (res && res._id) {
// // //       setMessages([...messages, res]);
// // //       setNewMsg("");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchMessages();
// // //   }, [chat]);

// // //   return (
// // //     <div className="flex flex-col h-full">
// // //       {/* Header */}
// // //       <div className="bg-white p-4 border-b font-bold shadow">
// // //         {chat.isGroupChat ? chat.chatName : getChatName(chat)}
// // //       </div>

// // //       {/* Messages */}
// // //       <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-2">
// // //         {messages.map((m) => (
// // //           <div key={m._id} className="bg-white p-2 rounded shadow max-w-md">
// // //             {m.content}
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Input */}
// // //       <form onSubmit={handleSend} className="p-4 border-t bg-white flex">
// // //         <input
// // //           type="text"
// // //           value={newMsg}
// // //           onChange={(e) => setNewMsg(e.target.value)}
// // //           placeholder="Type your message..."
// // //           className="flex-1 border px-4 py-2 rounded-l"
// // //         />
// // //         <button className="bg-blue-600 text-white px-4 py-2 rounded-r" type="submit">
// // //           Send
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // };
// // // export default ChatBox;


// // import React, { useEffect, useState } from "react";
// // import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
// // import { getChatName } from "../utils/chatUtils";
// // import { ChatState } from "../context/ChatProvider";
// // import background from "../assets/image/background.jpg";

// // const ChatBox = ({ chat }) => {
// //   const [messages, setMessages] = useState([]);
// //   const [newMsg, setNewMsg] = useState("");
// //   const { user } = ChatState(); // Needed to align messages

// //   const fetchMessages = async () => {
// //     const res = await makeAuthenticatedGETRequest(`/chat/${chat._id}/messages`);
// //     setMessages(res || []);
// //   };

// //   const handleSend = async (e) => {
// //     e.preventDefault();
// //     if (!newMsg.trim()) return;

// //     const res = await makeAuthenticatedPOSTRequest(`/chat/message`, {
// //       chatId: chat._id,
// //       content: newMsg,
// //     });

// //     if (res && res._id) {
// //       setMessages([...messages, res]);
// //       setNewMsg("");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchMessages();
// //   }, [chat]);

// //   return (
// //     <div className="flex flex-col h-full">
// //       {/* Header */}
// //       <div className="bg-white p-4 border-b font-bold shadow">
// //         {chat.isGroupChat ? chat.chatName : getChatName(chat)}
// //       </div>

// //       {/* Messages */}
// //       {/* <div
// //         className="flex-1 overflow-y-auto p-4 space-y-2"
// //         style={{
// //           backgroundImage: {background}, // Put your image in /public/chat-bg.jpg
// //           backgroundSize: "cover",
// //           backgroundPosition: "center",
// //         }}
// //       >
// //         {messages.map((m) => (
// //           <div
// //             key={m._id}
// //             className={`p-3 rounded-lg shadow max-w-xs md:max-w-md break-words ${
// //               user && m.sender._id === user._id
// //                 ? "bg-blue-500 text-white self-end ml-auto"
// //                 : "bg-white text-black self-start mr-auto"
// //             }`}
// //           >
// //             {m.content}
// //           </div>
// //         ))}
// //       </div> */}

// //       <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-2">
// //   {messages.map((m) => {
// //     const isMyMessage = m.sender && user && m.sender._id === user._id;

// //     return (
// //       <div
// //         key={m._id}
// //         className={`flex ${isMyMessage ? "justify-end" : "justify-start"}`}
// //       >
// //         <div
// //           className={`p-3 rounded-lg shadow max-w-xs md:max-w-md break-words ${
// //             isMyMessage
// //               ? "bg-blue-500 text-white"
// //               : "bg-white text-gray-900"
// //           }`}
// //         >
// //           {m.content}
// //         </div>
// //       </div>
// //     );
// //   })}
// // </div>

// //       {/* Input */}
// //       <form onSubmit={handleSend} className="p-4 border-t bg-white flex">
// //         <input
// //           type="text"
// //           value={newMsg}
// //           onChange={(e) => setNewMsg(e.target.value)}
// //           placeholder="Type your message..."
// //           className="flex-1 border px-4 py-2 rounded-l"
// //         />
// //         <button className="bg-blue-600 text-white px-4 py-2 rounded-r" type="submit">
// //           Send
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default ChatBox;


// import React, { useEffect, useState } from "react";
// import {
//   makeAuthenticatedGETRequest,
//   makeAuthenticatedPOSTRequest,
// } from "../utils/serverHelpers";
// import { getChatName } from "../utils/chatUtils";
// import { ChatState } from "../context/ChatProvider";

// const ChatBox = ({ chat }) => {
//   const { user } = ChatState(); // ✅ get logged-in user here
//   const [messages, setMessages] = useState([]);
//   const [newMsg, setNewMsg] = useState("");
//   console.log("Current logged-in user:", user);

//   const fetchMessages = async () => {
//     if (!chat?._id) return;
//     try {
//       const res = await makeAuthenticatedGETRequest(`/chat/${chat._id}/messages`);
//       setMessages(res || []);
//     } catch (error) {
//       console.error("Fetch message error:", error);
//     }
//   };

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!newMsg.trim()) return;

//     const res = await makeAuthenticatedPOSTRequest(`/chat/message`, {
//       chatId: chat._id,
//       content: newMsg,
//     });

//     if (res && res._id) {
//       setMessages((prev) => [...prev, res]);
//       setNewMsg("");
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, [chat]);

//   return (
//     <div className="relative flex flex-col h-full bg-[url('/chat-bg.png')] bg-cover bg-center">
//       {/* Chat header */}
//       <div className="bg-white p-4 border-b font-bold shadow">
//         {chat?.isGroupChat ? chat.chatName : getChatName(chat)}
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-2">
//         {messages.map((m) => {
//           const isMine = m.sender?._id === user?._id;
//           console.log("Msg sender:", m.sender?._id, "Logged in user:", user?._id);
//           return (
//             <div
//               key={m._id}
//               className={`flex ${isMine ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`p-3 rounded-lg shadow max-w-xs md:max-w-md break-words ${
//                   isMine
//                     ? "bg-blue-500 text-white rounded-br-none"
//                     : "bg-gray-200 text-gray-900 rounded-bl-none"
//                 }`}
//               >
//                 {!isMine && (
//                   <div className="text-xs text-gray-500 mb-1">
//                     {m.sender?.name}
//                   </div>
//                 )}
//                 {m.content}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Input */}
//       <form onSubmit={handleSend} className="p-4 border-t bg-white flex">
//         <input
//           type="text"
//           value={newMsg}
//           onChange={(e) => setNewMsg(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 border px-4 py-2 rounded-l"
//         />
//         <button className="bg-blue-600 text-white px-4 py-2 rounded-r" type="submit">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatBox;

import React, { useEffect, useState } from "react";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from "../utils/serverHelpers";
import { getChatName } from "../utils/chatUtils";
import { ChatState } from "../context/ChatProvider";

const ChatBox = ({ chat }) => {
  const { user } = ChatState();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  const fetchMessages = async () => {
    if (!chat?._id) return;
    try {
      const res = await makeAuthenticatedGETRequest(`/chat/${chat._id}/messages`);
      setMessages(res || []);
    } catch (error) {
      console.error("Fetch message error:", error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    const res = await makeAuthenticatedPOSTRequest(`/chat/message`, {
      chatId: chat._id,
      content: newMsg,
    });

    if (res && res._id) {
      setMessages((prev) => [...prev, res]);
      setNewMsg("");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [chat]);

  return (
    <div className="flex flex-col h-full bg-white md:rounded-lg shadow relative w-full">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white px-4 py-3 font-semibold text-lg">
        {chat?.isGroupChat ? chat.chatName : getChatName(chat)}
      </div>

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
        {messages.map((m) => {
          const isMine = m.sender?._id === user?._id;
          return (
            <div
              key={m._id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-xl max-w-[80%] text-sm shadow ${
                  isMine
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {!isMine && (
                  <div className="text-xs text-gray-500 mb-1">
                    {m.sender?.name}
                  </div>
                )}
                {m.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Section */}
      <form
        onSubmit={handleSend}
        className="p-3 border-t flex items-center gap-2 bg-white"
      >
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};
export default ChatBox;