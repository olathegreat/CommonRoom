import { createContext, useContext, useEffect, useRef } from "react";
import { useAppStore } from "@/store";
import { io } from "socket.io-client";
import { HOST } from "@/utils/constant";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef(null);
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: {
          userId: userInfo.id,
        },
      });

      socket.current.on("connect", () => {
        console.log("connected to socket server");
      });

      const handleReceiveMessage = (message) => {
        
    
        const { selectedChatData, selectedChatType, addMessages } =
          useAppStore.getState();

        if (
          (selectedChatType !== undefined &&
            selectedChatData._id === message.sender._id) ||
          selectedChatData._id === message.recipient._id
        ) {
          console.log("message received", message);

          addMessages(message);
        }
      };

      const handleReceiveChannelMessage = (message) =>{
        const {selectedChatData, selectedChatType, addChannelMessages} = useAppStore.getState();
        console.log("this is message received on the channel", message)

        if(selectedChatType !==undefined && selectedChatData._id=== message.channelId){
            addChannelMessages(message)
        }
      }

      socket.current.on("receive-message", handleReceiveMessage);
      socket.current.on("sent-message", handleReceiveMessage);
      socket.current.on("receive-channel-message",handleReceiveChannelMessage)

      

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>


  );
};
