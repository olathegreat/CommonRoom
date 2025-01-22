export const createChatSlice = (set, get) => (
  {
    selectedChatType: undefined,
    selectedChatData: undefined,
    selectedChatMessages: [],
    setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
    setSlectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),
    closeChat: ()=>set({selectedChatMessages:[],selectedChatType: undefined, selectedChatData: undefined}),
}
);