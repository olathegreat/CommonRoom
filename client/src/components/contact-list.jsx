import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "./ui/avatar";
import { getColor } from "@/lib/utils";
import { HOST } from "@/utils/constant";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    selectedChatType,
    setSelectedMessages,
  } = useAppStore();
  console.log(contacts);    

  const handleClick = (contact) => {
    if (isChannel) {
      setSelectedChatType("channel");
    } else {
      setSelectedChatType("contact");
    }
    setSelectedChatData(contact);

    if (selectedChatData && selectedChatData._id === contact._id) {
      setSelectedMessages([]);
    }
  };
  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-5 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f1]"
          }`}
          onClick={() => handleClick(contact)}
        >
            {console.log(contact)}
          <div className="flex gap-3 items-center justify-start text-neutral-300">
            {!isChannel && (
              <Avatar className="w-10 h-10 rounded-full overflow-hidden">
                {contact.image ? (
                  <AvatarImage
                    src={contact.image}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                  />
                ) : (
                  <div
                    className={`${selectedChatData && selectedChatData._id === contact._id ? "bg-[#ffffff22] border-2 border-white/70" : getColor(
                        contact.color
                      )}uppercase h-10 w-10  text-lg border-[1px] flex items-center justify-center rounded-full `}
                  >
                    {contact.firstname
                      ? contact.firstname[0]
                      : contact.email[0]}
                  </div>
                )}
              </Avatar>
            )}
            {
                isChannel && <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
                    #
                    </div>
            }
            {
                isChannel ? <span>{contact.name}</span> : <span>
                    { contact.firstname ? `${contact.firstname} ${contact.lastname}` : contact.email } 
                </span>
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
