    // import React, { useEffect, useState } from "react";
    // import io from "socket.io-client";
    // import axios from "axios";

    // const socket = io(process.env.REACT_APP_SOCKET_URL, {
    // auth: {
    //     token: localStorage.getItem("token")
    // }
    // });
    // // const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
    // //   auth: {
    // //     token: localStorage.getItem("token")
    // //   }
    // // });

    // const ChatSection = () => {
    // const [chats, setChats] = useState([]);
    // const [selected, setSelected] = useState(null);
    // const [messages, setMessages] = useState([]);
    // const [newMsg, setNewMsg] = useState("");

    // //   useEffect(() => {
    // //     axios.get("/chat/list", {
    // //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    // //     }).then((res) => {
    // //       setChats(res.data);
    // //     });
    // //   }, []);

    // //   useEffect(() => {
    // //     if (selected) {
    // //       axios.get(`/chat/${selected._id}/messages`, {
    // //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    // //       }).then((res) => {
    // //         setMessages(res.data);
    // //       });
    // //     }
    // //   }, [selected]);

    // useEffect(() => {
    // axios.get(`${process.env.REACT_APP_BACKEND_URL}/chat/list`, {
    //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    // }).then((res) => {
    //     setChats(res.data);
    // });
    // }, []);

    // useEffect(() => {
    // if (selected) {
    //     axios.get(`${process.env.REACT_APP_BACKEND_URL}/chat/${selected._id}/messages`, {
    //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    //     }).then((res) => {
    //     setMessages(res.data);
    //     });
    // }
    // }, [selected]);

    // useEffect(() => {
    //     socket.on("new-message", (msg) => {
    //     if (msg.chatId === selected?._id) {
    //         setMessages((prev) => [...prev, msg]);
    //     }
    //     });

    //     return () => socket.off("new-message");
    // }, [selected]);

    // const sendMessage = () => {
    //     socket.emit("send-message", {
    //     chatId: selected._id,
    //     content: newMsg
    //     });
    //     setNewMsg("");
    // };

    // return (
    //     <div className="h-full flex flex-col">
    //     <div className="flex overflow-x-auto gap-2 mb-4">
    //         {chats.map((chat) => (
    //         <button
    //             key={chat._id}
    //             className={`px-3 py-2 border rounded ${selected?._id === chat._id ? "bg-blue-200" : ""}`}
    //             onClick={() => setSelected(chat)}
    //         >
    //             {chat.isGroup ? chat.name : chat.participants.find(p => p._id !== chat.createdBy)._id}
    //         </button>
    //         ))}
    //     </div>

    //     <div className="flex-1 border rounded p-4 overflow-y-auto bg-gray-100 mb-4">
    //         {messages.map((msg, i) => (
    //         <div key={i} className="mb-2">
    //             <span className="font-bold">{msg.sender.name}:</span> {msg.content}
    //         </div>
    //         ))}
    //     </div>

    //     <div className="flex gap-2">
    //         <input
    //         className="flex-1 p-2 border rounded"
    //         placeholder="Type a message..."
    //         value={newMsg}
    //         onChange={(e) => setNewMsg(e.target.value)}
    //         />
    //         <button
    //         onClick={sendMessage}
    //         className="bg-blue-600 text-white px-4 rounded"
    //         >
    //         Send
    //         </button>
    //     </div>
    //     </div>
    // );
    // };
    // export default ChatSection;
    
    // src/components/ChatSection.js

import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:8080", {
  auth: {
    token: localStorage.getItem("token"),
  },
});

const ChatSection = () => {
  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/chat/list", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setChats(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selected) {
      axios
        .get(`http://localhost:8080/chat/${selected._id}/messages`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => setMessages(res.data))
        .catch(console.error);
    }
  }, [selected]);

  useEffect(() => {
    socket.on("new-message", (msg) => {
      if (msg.chatId === selected?._id) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    return () => socket.off("new-message");
  }, [selected]);

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    socket.emit("send-message", {
      chatId: selected._id,
      content: newMsg,
    });
    setNewMsg("");
  };

  return (
    <div className="h-screen flex">
      {/* Chat List */}
      <div className="w-1/3 border-r overflow-y-auto bg-white">
        <div className="p-4 text-xl font-semibold border-b">Chats</div>
        {chats.map((chat) => (
          <div
            key={chat._id}
            className={`p-4 cursor-pointer border-b hover:bg-gray-100 ${
              selected?._id === chat._id ? "bg-blue-100" : ""
            }`}
            onClick={() => setSelected(chat)}
          >
            <div className="font-medium">
              {chat.isGroup ? chat.name : chat.participants.find((p) => p._id !== chat.createdBy)?.name || "Chat"}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col justify-between bg-gray-50">
        <div className="p-4 border-b text-lg font-medium h-16 flex items-center">
          {selected
            ? selected.isGroup
              ? selected.name
              : selected.participants.find((p) => p._id !== selected.createdBy)?.name
            : "Select a chat"}
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className="mb-3">
              <span className="font-semibold">{msg.sender.name}: </span>
              <span>{msg.content}</span>
            </div>
          ))}
        </div>

        {selected && (
          <div className="flex p-4 border-t gap-2">
            <input
              className="flex-1 border rounded px-4 py-2"
              placeholder="Type a message..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSection;
