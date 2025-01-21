import { useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import {FaTrash, FaPlus} from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { HOST, PROFILE_IMAGE_ROUTE, REMOVE_PROFILE_IMAGE_ROUTE, UPDATE_PROFILE_ROUTE } from "@/utils/constant";

const Profile = () => {
  const {userInfo, setUserInfo} = useAppStore();
  const navigate = useNavigate()
  const [firstname, setFirstname] = useState("");
  const [ lastname, setLastname] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(()=>{
    if(userInfo.profileSetup){
      setFirstname(userInfo.firstname);
      setLastname(userInfo.lastname);
      setSelectedColor(userInfo.color);
    }
    if(userInfo.image){
      setImage(`${HOST}/${userInfo.image}`);
    }else{
      setImage(null)
    }

  },[userInfo])


  const validator = () =>{
    if(!firstname){
      toast.error("Firstname is required");
      return false;
    }
    if(!lastname){
      toast.error("Lastname is required");
      return false;
    }
    return true;
  }


  const saveChanges = async() =>{
       if(!validator()){
      return;
    }
   try{
    const response = await apiClient.post(UPDATE_PROFILE_ROUTE, {firstname,lastname, image, color: selectedColor}, {withCredentials: true});
   if(response.status===200){
    setUserInfo({...response.data})
    toast.success("Profile updated successfully");
    navigate('/chat')
   }
   }catch(err){
    console.error(err);
    toast.error("Failed to update profile");
  
   }

  }

  const handleNavigate = () =>{
    if(userInfo.profileSetup){
      navigate('/chat')
    }else{
      toast.error("Please setup profile to continue");
    }
  }

  const fileInputClick = () => {
    fileInputRef.current.click();
  };  

  const handleImageChange = async(e)=>{
     const file = e.target.files[0];
     if(file){
      const formdata = new FormData();
      formdata.append("profile-image", file);
      const response = await apiClient.post(PROFILE_IMAGE_ROUTE, formdata, {withCredentials: true});  

      if(response.status === 200 && response.data.image){
        setUserInfo({...userInfo, image: response.data.image});
        toast.success("Image updated successfully");
      }
      
     }
  }
 const handleDeleteImage = async(e)=>{
  try{
    const response = await apiClient.delete(REMOVE_PROFILE_IMAGE_ROUTE,{
      withCredentials: true
    })

    if(response.status === 200){
      setUserInfo({...userInfo, image: null});
      toast.success("Image deleted successfully");
    }

  }catch(err){
    console.log(err)
  }

 }
  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack onClick={handleNavigate} className="text-4xl lg:text-6xl text-white/90 cursor-pointer"/>
          <div className="grid grid-cols-2">
            <div className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}
            
            >
              <Avatar className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden">
                {console.log(image)}
                {
                  image ? <AvatarImage  src={image} alt="profile" className="object-cover w-full h-full bg-black"/> : <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                    { 
                      firstname ? firstname?.split("").shift() : userInfo.email?.split("").shift()
                    }
                  </div>
                }
              </Avatar>

              {
                hovered && (
                  <div  onClick={image ? handleDeleteImage : fileInputClick} className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer ring-fuchsia-50">
                    {
                      image ? <FaTrash className="text-white text-3xl cursor-pointer"/> : <FaPlus className="text-white text-3xl cursor-pointer"/>
                    }

                  </div>
                )
              }

              <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} name="profile-image" accept=".png ,.jpg, .jpeg, .svg, .webp"/> 




            </div>


          
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input placeholder="Email" type="email" disabled value={userInfo.email} className="rounded-lg p-6 bg-[#2c2e3b] border-none"/>

            </div>

            <div className="w-full">
              <Input placeholder="First Name"
              
              type="text" 
              value={firstname} 
              className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              onChange={(e)=>setFirstname(e.target.value)}
              
              />

            </div>

            <div className="w-full">
              <Input
               placeholder="Last Name"
                type="text" value={lastname} 
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
                onChange={(e)=>setLastname(e.target.value)}
                />

            </div>

            <div className="w-full flex gap-5">
              {
                colors.map((color, index)=> <div className={
                  `${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${selectedColor === index ? "outline outline-white/50 outline-1" : ""}`
                } 
                onClick={()=>setSelectedColor(index)}
                key={index}>

                </div>)
              }

            </div>

          </div>
          </div>
         
        </div>
        <div className="w-full">
            <Button
             onClick={saveChanges}
            className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300">
              Save Changes
            </Button>

          </div>

      </div>
      
    </div>
  )
}

export default Profile
