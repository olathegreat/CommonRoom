export const createChatSlice = (set, get) => (
  {
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessages: [],
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
    setSlectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),
    closeChat: ()=>set({selectedChatMessages:[],selectedChatType: undefined, selectedChatData: undefined}),
    addMessages: (message) => {
        const selectedChatMessages = get().selectedChatMessages;
      
        set({
          selectedChatMessages: [
            ...selectedChatMessages,
            {
              ...message,
              sender: message.sender._id || message.sender,
              recipient: message.recipient._id || message.recipient,
            },
          ],
        });
      
        console.log(get().selectedChatMessages);
      }
      
}
);