import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST, LOGOUT_ROUTE } from "@/utils/constant";
import { FaEdit } from "react-icons/fa";
import { IoLogOut, IoPowerSharp } from "react-icons/io5";
import React from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api-client";

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        setUserInfo(null);
        navigate("/auth");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="absolute bottom-0 h-15 flex items-center gap-3 justify-between px-3   w-full bg-[#282b33]">
       
      <div className="flex    items-center pt-2 ">
        <div className="w-12 h-12 relative">
        
          <Avatar className="w-10 h-10  rounded-full overflow-hidden">
            

            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="pro file"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-12 w-12 md:w-48 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstname
                  ? userInfo.firstname.split("").shift()
                  : userInfo.email?.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>

        <div className="text-xs text-nowrap">
          {userInfo.firstname && userInfo.lastname
            ? `${userInfo.firstname + " " + userInfo.lastname}`
            : userInfo.email}
        </div>
      </div>
      <div className="flex gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FaEdit
                className=" text-xl font-medium text-purple-500"
                onClick={() => navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp
                className=" text-xl font-medium text-red-500"
                onClick={logout}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none text-white">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
