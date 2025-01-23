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
  addChannel: (channel) => {
    const channels = get().channels;
    set({
      channels: [...channels,channel],
    });
    console.log(get().channels);
  },
});
