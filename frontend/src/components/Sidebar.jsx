import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import navigate
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // State for mobile sidebar visibility
  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  // Function to handle user click and navigate to chat
  const handleUserClick = (user) => {
    setSelectedUser(user);  // Set selected user
    navigate(`/messages/${user._id}`);  // Navigate to the chat page with the user's ID
  };

  return (
    <aside className={`transition-all duration-200 h-full ${sidebarOpen ? 'w-72' : 'w-20'} sm:w-72 border-r border-base-300 flex flex-col`}>
      {/* Toggle Sidebar Button for Mobile */}
      <button
        className="lg:hidden p-3 text-white bg-blue-500 rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "Close" : "Open"} Sidebar
      </button>

      {/* Sidebar Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className={`font-medium ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>Contacts</span>
        </div>

        {/* "Show online only" checkbox */}
        <div className={`mt-3 ${sidebarOpen ? 'flex' : 'hidden'} lg:flex items-center gap-2`}>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({Math.max((onlineUsers?.length || 0) - 1, 0)} online)
          </span>
        </div>
      </div>

      {/* User list */}
      <div className="overflow-y-auto w-full py-3 flex-1">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => handleUserClick(user)} // Use handleUserClick to set selected user and navigate
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>

            <div className={`hidden lg:block text-left min-w-0 ${sidebarOpen ? '' : 'lg:hidden'}`}>
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
