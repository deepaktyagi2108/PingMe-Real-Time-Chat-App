// import React from 'react'

// import Sidebar from '../components/Sidebar';
// import NoChatSelected from '../components/NoChatSelected';
// import ChatContainer from '../components/ChatContainer'

// const HomePage = () => {
 
//   return (
//    <div className='h-screen bg-base-200'>
//   <div className='flex items-center pt-20 px-4'>
//       <div className='bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-3rem)]'>
//         <div className='flex h-full rounded-lg overflow-hidden'>
//           <Sidebar/>
//         <NoChatSelected />
//         </div>
//       </div>
//     </div>

//    </div>
//   )
// }

// export default HomePage

import { useAuthStore } from "../store/useAuthStore";

import React from "react";

import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {
  const { selectedUser } = useAuthStore();
  return (
    <div className="h-screen w-full p-2">
      <div className="flex flex-col sm:flex-row h-full rounded-lg overflow-hidden">
        <Sidebar />
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </div>
    </div>
  );
};

export default HomePage;