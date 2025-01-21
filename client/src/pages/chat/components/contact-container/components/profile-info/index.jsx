import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { getColor } from '@/lib/utils';
import { useAppStore } from '@/store';
import { HOST } from '@/utils/constant';
import React from 'react'

const ProfileInfo = () => {
    const  {userInfo} = useAppStore();
  return (
    <div className='absolute bottom-0 h-15 flex items-center justify-between  px-10 w-full bg-[#282b33]'>

        <div className='flex gap-3 items-center justify-center'>
            <div className='w-12 h-12 relative'>
                  <Avatar className="w-12 h-12  rounded-full overflow-hidden">
                            
                            {
                              userInfo.image ? <AvatarImage  src={`${HOST}/${userInfo.image}}`} alt="pro file" className="object-cover w-full h-full bg-black"/> : <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(userInfo.color)}`}>
                                { 
                                  userInfo.firstname ?
                                   userInfo.firstname.split("").shift() : userInfo.email?.split("").shift()
                                }
                              </div>
                            }
                          </Avatar>
                          </div>

                          <div>
                            {
                                userInfo.firstname && userInfo.lastname ? `${
                                               userInfo.firstname + " " + userInfo.lastname 
                                }`: ""
                            }
                          </div>
            


        </div>
        <div className='flex gap-5'>


        </div>
      
    </div>
  )
}

export default ProfileInfo;
