import React from "react";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";

export const ChatPage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex h-full rounded-lg overflow-hidden">
      <Sidebar />
      {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
    </div>
  );
};
