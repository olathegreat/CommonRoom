import {createContext, useContext, useEffect, useRef}  from 'react';
import { useAppStore } from '@/store';
import { io } from 'socket.io-client';
import { HOST } from '@/utils/constant';

const SocketContext = createContext(null);

export const useSocket = () =>{
    return useContext(SocketContext);
}

export const SocketProvider = ({children}) =>{
    const socket = useRef(null);
    const {userInfo} = useAppStore();

    useEffect(()=>{

        if(userInfo){
            socket.current = io(HOST, {
                withCredentials: true,
                query: {
                    userId: userInfo._id
                }
            })
        }

        socket.current.on("connect", ()=>{
            console.log("connected to socket server")
        })

        return ()=>{
            socket.current.disconnect();
        }

    },[userInfo])


    return(
        <SocketContext.Provider value={socket.current}>
            {children}
            </SocketContext.Provider>
    )

}