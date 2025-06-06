import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

const socket = io(process.env.REACT_APP_SOCKET_URL, {
  auth: {
    token: localStorage.getItem("token"),
  },
});

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    const fetchChats = async () => {
      const res = await makeAuthenticatedGETRequest("/chat/list");
      if (res.success) setChats(res.data);
    };
    fetchChats();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selected) return;
      const res = await makeAuthenticatedGETRequest(`/chat/${selected._id}/messages`);
      if (res.success) setMessages(res.data);
    };
    fetchMessages();
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
        {chats.map((chat) => (
          <div
            key={chat._id}
            className={`p-4 cursor-pointer hover:bg-gray-100 ${
              selected?._id === chat._id ? "bg-blue-100" : ""
            }`}
            onClick={() => setSelected(chat)}
          >
            {chat.isGroup
              ? chat.name
              : chat.participants.find((p) => p._id !== chat.createdBy)?.name}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col bg-gray-50">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((msg, i) => (
            <div key={i} className="mb-2">
              <span className="font-semibold text-sm">{msg.sender.name}:</span>{" "}
              {msg.content}
            </div>
          ))}
        </div>
        {selected && (
          <div className="p-4 border-t flex gap-2 bg-white">
            <input
              type="text"
              className="flex-1 border p-2 rounded"
              placeholder="Type your message..."
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

export default ChatPage;