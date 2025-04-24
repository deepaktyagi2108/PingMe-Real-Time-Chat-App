import React from "react";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import { useAuthStore } from "../store/useAuthStore";
export const ChatPage = () => {
  const { selectedUser } = useChatStore()

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl overflow-scroll h-[calc(100vh-3rem)]">
          <div className="flex h-full rounded-lg overflow-scroll">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
 };

 export default ChatPage;
