
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // Fallback in case selectedUser is null
  const profilePic = selectedUser?.profilePic || "/avatar.png";
  const fullName = selectedUser?.fullName || "Select a user";

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={profilePic} alt={fullName} />
            </div>
          </div>

          <div>
            <h3 className="font-medium">{fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)} aria-label="Close chat">
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
