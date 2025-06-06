// components/SideDrawer.js
import React from "react";
import { ChatState } from "../context/ChatProvider";

const SideDrawer = () => {
  const { user } = ChatState();

  return (
    <div className="w-full p-4 bg-gray-900 text-white flex justify-between">
      <span className="text-xl font-bold">Chat App</span>
      <span>{user?.name}</span>
    </div>
  );
};

export default SideDrawer;