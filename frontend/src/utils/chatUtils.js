export const getChatName = (chat) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const other = chat.users.find((u) => u._id !== user._id);
  return other?.name || "Unknown";
};
