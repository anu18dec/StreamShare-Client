import SocketContext from "./socketContext.js";
import { io } from "socket.io-client";
import { useState } from "react";

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState({ socket: null });

    return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
};

export default SocketContextProvider;
