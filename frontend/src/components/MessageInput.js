import { useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";

export default function MessageInput({ chatId, setMessages }) {
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (!text.trim()) return;

    const message = await makeAuthenticatedPOSTRequest("/chat/send", {
      chatId,
      content: text,
    });

    setMessages(prev => [...prev, message]);
    setText("");
  };

  return (
    <div className="border-t p-3 flex gap-2">
      <input
        type="text"
        className="flex-1 border p-2 rounded-md"
        placeholder="Type a message..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === "Enter" && sendMessage()}
      />
      <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded-md">
        Send
      </button>
    </div>
  );
}