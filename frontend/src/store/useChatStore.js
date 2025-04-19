

import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios"; // Your axiosInstance import
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  hasFetchedUsers: false,

  // Fetch users for sidebar
  getUsers: async () => {
    const { hasFetchedUsers } = get();
    if (hasFetchedUsers) return;

    set({ isUsersLoading: true });
    try {
      // Use the correct API endpoint without /api
      const res = await axiosInstance.get("/messages/users");  // Use /messages here, no /api
      set({ users: res.data, hasFetchedUsers: true });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      // Use the correct API endpoint without /api
      const res = await axiosInstance.get(`/messages/${userId}`);  // Use /messages here, no /api
      set({ messages: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

 
  sendMessages: async (messageData) => {
    const { selectedUser, messages } = get();

    try {
      // Use the correct API endpoint without /api
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, {  
        text: messageData.text,
        image: messageData.image,
      });

      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  },

  //to-do
  setSelectedUser: (selectedUser) => set({ selectedUser }),

//subs.
subscribeToMessages: () => {
  const { selectedUser, messages } = get(); // Get selectedUser and messages

  if (!selectedUser) return;

  const socket = useAuthStore.getState().socket;

  socket.on("newMessage", (newMessage) => {
    const isMessageSentFromSelectedUser=newMessage.senderId===selectedUser._id
    // Only update if the message is for the selected user
    if (!isMessageSentFromSelectedUser) return;

    set({
       messages: [...messages, newMessage] });
  });
},

  // Unsubscribe from socket events
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) {
      console.warn("Socket not initialized yet");
      return;
    }

    socket.off("newMessage");
  },
}));


