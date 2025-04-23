// import React from "react";
// import ChatContainer from "../components/ChatContainer";
// import { useChatStore } from "../store/useChatStore";
// import Sidebar from "../components/Sidebar";
// import NoChatSelected from "../components/NoChatSelected";
// import { useAuthStore } from "../store/useAuthStore";
// export const ChatPage = () => {
//   const { selectedUser } = useChatStore()

//   return (
//     <div className="h-screen bg-base-200">
//       <div className="flex items-center pt-20 px-4">
//         <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl overflow-scroll h-[calc(100vh-3rem)]">
//           <div className="flex h-full rounded-lg overflow-scroll">
//             <Sidebar />
//             {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
import React from "react";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";

export const ChatPage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center pt-20 px-2 sm:px-4">
        <div className="bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-5rem)] sm:h-[calc(100vh-3rem)] overflow-hidden">
          {/* Desktop layout: side-by-side */}
          <div className="hidden md:flex h-full">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>

          {/* Mobile layout: stacked views */}
          <div className="flex flex-col md:hidden h-full">
            {!selectedUser ? (
              <Sidebar />
            ) : (
              <ChatContainer />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
