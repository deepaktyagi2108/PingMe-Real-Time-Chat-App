import React from 'react'

import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer'

const HomePage = () => {
 
  return (
   <div className='h-screen bg-base-200'>
  <div className='flex items-center pt-20 px-4'>
      <div className='bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-3rem)]'>
        <div className='flex h-full rounded-lg overflow-hidden'>
          <Sidebar/>
        <NoChatSelected />
        </div>
      </div>
    </div>

   </div>
  )
}

export default HomePage

