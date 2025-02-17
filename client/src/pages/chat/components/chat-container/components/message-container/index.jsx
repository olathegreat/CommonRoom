import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import {
  GET_ALL_MESSAGES_ROUTE,
  GET_CHANNEL_MESSAGES,
  HOST,
} from "@/utils/constant";
import moment from "moment";
import { MdFolderZip } from "react-icons/md";
import { IoMdArrowRoundDown, IoMdClose } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";

const MessageContainer = () => {
  const {
    selectedChatType,
    selectedChatData,
    selectedChatMessages,
    setSelectedChatMessages,
    setFileDownloadProgress,
    userInfo,
    setIsDownloading,
  } = useAppStore();

  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const getMessages = async () => {
      try {
        console.log(selectedChatData._id);

        const response = await apiClient.post(
          GET_ALL_MESSAGES_ROUTE,
          { id: selectedChatData._id },
          {
            withCredentials: true,
          }
        );
        console.log(response);

        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const getChannelMessages = async () => {
      try {
        console.log(selectedChatData._id);

        const response = await apiClient.get(
          `${GET_CHANNEL_MESSAGES}/${selectedChatData._id}`,

          {
            withCredentials: true,
          }
        );
        console.log(response);

        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (selectedChatData._id) {
      if (selectedChatType === "contact") {
        getMessages();
      } else if (selectedChatType === "channel") {
        getChannelMessages();
      }
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log(selectedChatMessages);
  }, [selectedChatMessages]);

  const scrollRef = useRef();

  const checkIfImage = (filePath) => {
    const ImageRegex =
      /\.(png|jpg|jpeg|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return ImageRegex.test(filePath);
  };

  const downloadFile = (fileUrl) => {
    console.log("Downloading:", fileUrl);
  
    // Modify URL to force Cloudinary to download instead of open
    const modifiedUrl = fileUrl.replace("/upload/", "/upload/fl_attachment/");
  
    // Create an <a> tag and trigger download
    const link = document.createElement("a");
    link.href = modifiedUrl;
    link.setAttribute("download", ""); 
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  
  

  const renderMessages = () => {
    let lastDate = null;

    const renderDMMesage = (message) => {
      return (
        <div
          className={`${
            message.sender === selectedChatData._id ? "text-left" : "text-right"
          }`}
        >
          {message.messageType === "text" && (
            <div
              className={`${
                message.sender === selectedChatData._id
                  ? " bg-[#8417ff]/5   text-[#8417ff]/90 border-[#8417ff]/50 "
                  : "bg-[#2a2b33]/5   text-white/80 border-white/20"
              } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
            >
              {message.content}
            </div>
          )}

          {message.messageType === "file" && (
            <div>
              <div
                className={`${
                  message.sender === selectedChatData._id
                    ? " bg-[#8417ff]/5   text-[#8417ff]/90 border-[#8417ff]/50 "
                    : "bg-[#2a2b33]/5   text-white/80 border-white/20"
                } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
              >
                {checkIfImage(message.fileUrl) ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setShowImage(true);
                      setImageUrl(message.fileUrl);
                    }}
                  >
                    <img
                      src={message.fileUrl}
                      height={300}
                      width={300}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-white/80  text-3xl bg-black/20 rounded-full p-3">
                      <MdFolderZip />
                    </span>

                    <span>{message.fileUrl.split("/").pop()}</span>
                    <span
                      className=" bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
                      onClick={() => downloadFile(message.fileUrl)}
                    >
                      <IoMdArrowRoundDown />
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="text-xs text-gray-600">
            {moment(message.timeStamp).format("LT")}
          </div>
        </div>
      );
    };

    const renderChannelMessage = (message) => {
      {
        console.log("rederedChannel meessage", message);
      }
      return (
        <div
          className={`mt-5 ${
            message.sender._id !== userInfo.id ? "text-left" : "text-right"
          }`}
        >
          {message.messageType === "text" && (
            <div
              className={`${
                message.sender._id === userInfo.id
                  ? " bg-[#8417ff]/5   text-[#8417ff]/90 border-[#8417ff]/50 "
                  : "bg-[#2a2b33]/5   text-white/80 border-white/20"
              } border inline-block p-4 rounded my-1 max-w-[50%] ml-9 break-words`}
            >
              {message.content}
            </div>
          )}
          {message.messageType === "file" && (
            <div>
              <div
                className={`${
                  message.sender._id === userInfo.id
                    ? " bg-[#8417ff]/5   text-[#8417ff]/90 border-[#8417ff]/50 "
                    : "bg-[#2a2b33]/5   text-white/80 border-white/20"
                } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
              >
                {checkIfImage(message.fileUrl) ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setShowImage(true);
                      setImageUrl(message.fileUrl);
                    }}
                  >
                    <img
                      src={`${HOST}/${message.fileUrl}`}
                      height={300}
                      width={300}
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-white/80  text-3xl bg-black/20 rounded-full p-3">
                      <MdFolderZip />
                    </span>

                    <span>{message.fileUrl.split("/").pop()}</span>
                    <span
                      className=" bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
                      onClick={() => downloadFile(message.fileUrl)}
                    >
                      <IoMdArrowRoundDown />
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          {message.sender._id !== userInfo.id ? (
            <div className="flex items-center justify-start gap-3">
              <Avatar className="w-8 h-8 rounded-full overflow-hidden">
                {message.sender.image && (
                  <AvatarImage
                    src={`${HOST}/${selectedChatData.image}`}
                    alt="profile"
                    className="object-cover w-full h-full bg-black"
                  />
                )}
                <AvatarFallback
                  className={`uppercase h-8 w-8  text-lg  flex items-center justify-center rounded-full ${getColor(
                    message.sender.color
                  )}`}
                >
                  {message.sender.firstname
                    ? message.sender.firstname?.split("").shift()
                    : message.sender.email?.split("").shift()}
                </AvatarFallback>
              </Avatar>

              <span className="text-sm text-white/60">
                {`${message.sender.firstname} ${message.sender.lastname}`}
              </span>
              <span className="text-xs mt-1 text-white/60">
                {moment(message.timestamp).format("LT")}
              </span>
            </div>
          ) : (
            <div>{moment(message.timestamp).format("LT")}</div>
          )}
        </div>
      );
    };

    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timeStamp).format("YYYY-MM-DD");

      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={message._id}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timeStamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMesage(message)}
          {selectedChatType === "channel" && renderChannelMessage(message)}
        </div>
      );
    });
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}

      <div ref={scrollRef}></div>

      {showImage && (
        <div className="fixed z-[1000] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-lg flex-col">
          <div>
            <img src={imageUrl} className="h-[80vh] w-full bg-cover" />
          </div>

          <div className="flex gap-5 fixed top-0 mt-5">
            <button
              className=" bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
              onClick={() => {
                downloadFile(imageUrl);
              }}
            >
              <IoMdArrowRoundDown />
            </button>

            <button
              className=" bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
              onClick={() => {
                setShowImage(false);
                setImageUrl(null);
              }}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
