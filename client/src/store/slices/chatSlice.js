export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  directMessagesContacts: [],
  isUploading: false,
  isDownloading: false,
  fileUploadProgress: 0,
  fileDownloadProgress: 0,
  channels: [],
  setChannels: (channels) => set({ channels }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setIsDownloading: (isDownloading) => set({ isDownloading }),
  setFileUploadProgress: (fileUploadProgress) => set({ fileUploadProgress }),
  setFileDownloadProgress: (fileDownloadProgress) =>
    set({ fileDownloadProgress }),
  setDirectMessagesContacts: (directMessagesContacts) =>
    set({ directMessagesContacts }),
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages) =>
    set({ selectedChatMessages }),
  closeChat: () =>
    set({
      selectedChatMessages: [],
      selectedChatType: undefined,
      selectedChatData: undefined,
    }),
  addMessages: (message) => {
    const selectedChatMessages = get().selectedChatMessages;
    console.log(message);

    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          sender: message.sender._id || message.sender,
          recipient: message?.recipient?._id || message?.recipient ,
        },
      ],
    });

    console.log(get().selectedChatMessages);
  },
  addChannelMessages: (message) => {
    const selectedChatMessages = get().selectedChatMessages;
    

    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          message
        //   sender: message.sender._id || message.sender,
        //   recipient: message?.recipient?._id || message?.recipient ,
        },
      ],
    });

    console.log("this is the channel message ",get().selectedChatMessages);
  },
  addChannel: (channel) => {
    const channels = get().channels;
    set({
      channels: [...channels,channel],
    });
    console.log(get().channels);
  },
  addChannelInChannelList:(message)=>{
    const channels = get().channels;

    const data = channels.find(channel=>channel._id === message.channelId)

    const index = channels.findIndex(
        channel=>channel._id === message.channelId
    );
    if(index !== -1 && index !== undefined){
        channels.splice(index,1);
        channels.unshift(data);
    }
  },

  addContactsInDMContacts:(message)=>{
    const userId = get().userInfo.id;

    const fromId = message.sender._id === userId ? message.recipient._id : message.sender._id;

    const fromData = message.sender._id === userId ? message.recipient : message.sender;
    const dmContacts = get().directMessagesContacts;
    const data = dmContacts.find((contact)=> contact._id === fromId)
    const index = dmContacts.findIndex((contact)=> contact._id === fromId);
    console.log({data, index, dmContacts, userId, message, fromData});

    if(index !== -1 && index !==undefined){
        console.log("in if condition")
        dmContacts.splice(index, 1);
        dmContacts.unshift(data);
    } else{
        console.log("in else condition")
        dmContacts.unshift(fromData);
    }

    set({directMessagesContacts: dmContacts})

  }
});
