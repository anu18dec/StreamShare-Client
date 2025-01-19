import SocketContext from "./socketContext.js";
import { useState } from "react";
import socketInit from "../socket.js";

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState({ socket: socketInit });

    return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
};

export default SocketContextProvider;
