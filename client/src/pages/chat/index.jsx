import { useAppStore } from "@/store"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactContainer from "./components/contact-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";

const Chat= () => {
  const {userInfo, selectedChatType} = useAppStore();
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(userInfo)
    if(!userInfo.profileSetup){
      toast('please setup profile to continue');
      navigate('/profile')
    }

  },[userInfo, navigate])
  return (
    <div className="flex h-[100vh] bg-red-500 text-white overflow-hidden">
        <ContactContainer/>
         {
          selectedChatType === undefined ? <EmptyChatContainer/> : <ChatContainer/>
         }
        {/* <EmptyChatContainer/> */}
        {/* <ChatContainer/> */}
      
    </div>
  )
}

export default Chat

