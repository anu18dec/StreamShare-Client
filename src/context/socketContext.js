import { createContext, useContext } from "react";

const SocketContext = createContext(null);

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export default SocketContext;
