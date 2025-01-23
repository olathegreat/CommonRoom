import { useEffect } from "react"
import NewDm from "./components/newDm"
import ProfileInfo from "./components/profile-info"
import { apiClient } from "@/lib/api-client"
import { GET_DM_ROUTES } from "@/utils/constant"
import { useAppStore } from "@/store"
import ContactList from "@/components/contact-list"
import CreateChannel from "./components/createChannel"


const ContactContainer = () => {

    const { setDirectMessagesContacts, directMessagesContacts} = useAppStore();

    useEffect(()=>{
        const getContact = async()=>{
            const response = await apiClient.get(GET_DM_ROUTES, {
                withCredentials: true
            })
            console.log(response)

            if(response.data.contacts){
                setDirectMessagesContacts(response.data.contacts)
            }
        }
        getContact();
    },[])
  return (
    <div className="relative  md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
        <h1>Common<span className="text-purple-500">Room</span></h1>


        <div className="my-5">
            <div className=" flex items-center justify-between pr-10">
                <Title text="Direct Messages"/>
                <NewDm/>

            </div>

            <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
                <ContactList contacts={directMessagesContacts}/>
                </div>

        </div>

        <div className="my-5">
            <div className=" flex items-center justify-between pr-10">
                <Title text="Channels"/>
                <CreateChannel/>

            </div>

        </div>
        <ProfileInfo/>
      
    </div>
  )
}

const Title = ({text}) =>{
    return(
        <h6 className="uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm"> {text}</h6>
    )
}

export default ContactContainer
