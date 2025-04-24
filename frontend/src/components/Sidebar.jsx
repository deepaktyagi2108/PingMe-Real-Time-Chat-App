import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Menu } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // closed by default on mobile
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  const handleUserClick = (user) => {
    setSelectedUser(user);
    navigate(`/messages/${user._id}`);
    if (window.innerWidth < 768) setSidebarOpen(false); // auto-close on mobile
  };

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <>
      <div className="lg:hidden h-full p-2 border-b border-base-300 bg-base-100 flex   sticky top-0 z-20">
        <div className="flex h-full  items-start gap-2">
          <Users className="size-5" />
          <span className="text-lg font-semibold">Contacts</span>
        </div>
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="p-2 h-fit ml-2 rounded-md bg-primary text-white"
        >
          <Menu className="size-5" />
        </button>
      </div>

      <aside
        className={`z-30 bg-base-100 border-r border-base-300 h-full flex flex-col fixed lg:static top-0 left-0 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-72`}
      >
        <div className="p-5 border-b border-base-300">
          <div className="flex items-center gap-2">
            <Users className="size-6" />
            <span className="font-medium text-lg">Contacts</span>
          </div>

          <div className="mt-3 flex items-center gap-2">
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

        <div className="overflow-y-auto w-full py-3 flex-1">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => handleUserClick(user)}
              className={`w-full p-3 px-5 flex items-center gap-4 hover:bg-base-300 transition-colors ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-300"
                  : ""
              }`}
            >
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-10 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100" />
                )}
              </div>

              <div className="text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center text-zinc-500 py-4">
              No online users
            </div>
          )}
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
