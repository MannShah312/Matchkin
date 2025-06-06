import { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";

export default function ChatList({ setActiveChat, role }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const endpoint = role === "client" ? "/consultant/all" : "/client/all";
    makeAuthenticatedGETRequest(endpoint).then(setUsers);
  }, [role]);

  const handleStartChat = async (userId) => {
    const chat = await makeAuthenticatedPOSTRequest("/chat/start", { userId });
    setActiveChat(chat);
  };

  return (
    <div className="p-2 overflow-y-auto w-full">
      {users.map(user => (
        <div key={user._id} className="p-3 border-b cursor-pointer hover:bg-gray-100" onClick={() => handleStartChat(user._id)}>
          <div className="font-semibold">{user.name}</div>
          <div className="text-sm text-gray-500">{user.skill}</div>
        </div>
      ))}
    </div>
  );
}