import ProfileInfo from "./components/profile-info"


const ContactContainer = () => {
  return (
    <div className="relative  md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
        <h1>Common<span className="text-purple-500">Room</span></h1>


        <div className="my-5">
            <div className=" flex items-center justify-between pr-10">
                <Title text="Direct Messages"/>

            </div>

        </div>

        <div className="my-5">
            <div className=" flex items-center justify-between pr-10">
                <Title text="Channels"/>

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
