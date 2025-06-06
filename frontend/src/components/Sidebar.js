// import { FaComments, FaUserFriends, FaUsers } from "react-icons/fa";

// const Sidebar = ({ activeTab, setActiveTab }) => {
//   const icons = [
//     { key: "direct", icon: <FaComments />, label: "1-on-1" },
//     { key: "all", icon: <FaUserFriends />, label: "Users" },
//     { key: "group", icon: <FaUsers />, label: "Groups" },
//   ];

//   return (
//     <div className="w-16 bg-gray-100 flex flex-col items-center py-4 space-y-6">
//       {icons.map(({ key, icon }) => (
//         <button
//           key={key}
//           onClick={() => setActiveTab(key)}
//           className={`text-xl p-3 rounded-xl ${
//             activeTab === key ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-200"
//           }`}
//           title={key}
//         >
//           {icon}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Sidebar;

import { FaComments, FaUserFriends, FaUsers } from "react-icons/fa";

export default function Sidebar({ activeTab, setActiveTab }) {
  const iconClass = (tab) => `text-2xl p-3 ${activeTab === tab ? "text-blue-600 bg-blue-100 rounded-xl" : "text-gray-500 hover:text-blue-600"}`;

  return (
    <div className="flex flex-col items-center bg-gray-50 w-16 h-full border-r">
      <button onClick={() => setActiveTab("chats")}>
        <FaComments className={iconClass("chats")} />
      </button>
      <button onClick={() => setActiveTab("users")}>
        <FaUserFriends className={iconClass("users")} />
      </button>
      <button onClick={() => setActiveTab("groups")}>
        <FaUsers className={iconClass("groups")} />
      </button>
    </div>
  );
}