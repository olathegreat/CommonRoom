import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Victory from "../../assets/victory.svg";
import background from "@/assets/login2.png"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleLogin = async()=>{

    }

    const handleSignup = async()=>{

    }
  return (
    <div className="h-[100vh]  flex items-center justify-center">
      <div className="h-[80vh]  bg-white w-[80vw] border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center ">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the best chat app
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <Tabs className="w-3/4">
            <TabsList className="bg-transparent rounded-none w-full">
              <TabsTrigger
                className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300"
                value="login"
              >
                Login
              </TabsTrigger>
              <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input type="email" placeholder="Email" className="rounded-full p-6" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <Input type="password" 
                placeholder="passsword" className="rounded-full p-6"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                
                />
                <Button onClick={handleLogin} className="rounded-full p-6">Log in</Button>
            </TabsContent>
            <TabsContent className="flex flex-col gap-5"  value="signup">
            <Input type="email" placeholder="Email" className="rounded-full p-6" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <Input type="password" 
                placeholder="Password" className="rounded-full p-6"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                
                />
                   <Input type="password" 
                placeholder=" Confirm Password" className="rounded-full p-6"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                
                />
                 <Button onClick={handleSignup} className="rounded-full p-6">Sign Up</Button>
            </TabsContent>
          </Tabs>

          
        </div>
        <div className="hidden xl:flex justify-center items-center">
            <img src={background} alt="background login" className="h-[700px]"/>

          </div>
      </div>

     
    </div>
  );
};

export default Auth;
