// import { useEffect, useState, useRef } from "react";
// import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
// import MessageInput from "./MessageInput";

// export default function ChatWindow({ chat }) {
//   const [messages, setMessages] = useState([]);
//   const bottomRef = useRef(null);

//   useEffect(() => {
//     if (chat?._id) {
//       makeAuthenticatedGETRequest(`/chat/${chat._id}/messages`).then(setMessages);
//     }
//   }, [chat]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="flex flex-col h-full w-full">
//       <div className="p-4 border-b font-bold text-lg">
//         Chat with: {chat?.isGroup ? chat.name : chat?.participants?.find(p => p._id !== localStorage.getItem("userId"))?.name}
//       </div>
//       <div className="flex-1 p-4 overflow-y-auto space-y-2">
//         {/* {messages.map(msg => (
//           <div key={msg._id} className="bg-gray-100 p-2 rounded-md w-fit max-w-[60%]">
//             <div className="text-sm font-semibold">{msg.sender.name || "Unknown"}</div>
//             <div>{msg.content}</div>
//           </div>
//         ))} */}
//         {messages.map(msg => (
//             <div key={msg._id || Math.random()} className="bg-gray-100 p-2 rounded-md w-fit max-w-[60%]">
//             <div className="text-sm font-semibold">
//             {console.log("MSG SENDER:", msg.sender)}
//             {msg?.sender?.name || "Unknown"}
//             </div>
//             <div>{msg.content}</div>
//             </div>
//         ))}

        
//         <div ref={bottomRef}></div>
//       </div>
//       {chat && <MessageInput chatId={chat._id} setMessages={setMessages} />}
//     </div>
//   );
// }

import { useEffect, useState, useRef } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import MessageInput from "./MessageInput";

export default function ChatWindow({ chat }) {
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (chat?._id) {
      makeAuthenticatedGETRequest(`/chat/${chat._id}/messages`).then((data) => {
        setMessages(data || []);
      });
    }
  }, [chat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const currentUserId = localStorage.getItem("userId");

  const getChatName = () => {
    if (!chat) return "";
    if (chat.isGroup) return chat.name;
    const other = chat.participants?.find((p) => p._id !== currentUserId);
    return other?.name || "Chat";
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-4 border-b font-bold text-lg">
        Chat with: {getChatName()}
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages
          .filter((msg) => msg?._id)
          .map((msg) => (
            <div
              key={msg._id}
              className={`p-2 rounded-md max-w-[60%] ${
                msg.sender?._id === currentUserId
                  ? "bg-green-100 self-end"
                  : "bg-gray-100 self-start"
              }`}
            >
              <div className="text-sm font-semibold">
                {msg?.sender?.name || "Unknown"}
              </div>
              <div>{msg.content}</div>
            </div>
          ))}
        <div ref={bottomRef}></div>
      </div>

      {chat && (
        <div className="border-t p-4">
          <MessageInput chatId={chat._id} setMessages={setMessages} />
        </div>
      )}
    </div>
  );
}