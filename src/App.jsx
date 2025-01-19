import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import AuthLayout from "./routes/Layout/AuthLayout.jsx";
import Home from "./routes/Home/Home.jsx";
import { useEffect } from "react";
import { useSocketContext } from "./context/socketContext.js";
import io from "socket.io-client";
import Login from "./routes/Login/Login.jsx";
import Room from "./routes/Room/Room.jsx";
import { setRoom } from "./store/room/roomSlice.js";
import { replaceMembers, setOwner } from "./store/room/roomMembersSlice.js";
import { useDispatch } from "react-redux";
import receiveChunks from "./utils/receiveChunks.js";
import { addIncomingFile } from "./store/room/incomingFilesSlice.js";
import { setErrorState } from "./store/error/errorSlice.js";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<AuthLayout IsAuth={true} />}>
                <Route path="/" element={<Home />} />
            </Route>

            <Route path="/" element={<AuthLayout IsAuth={false} />}>
                <Route path="room/:roomId" element={<Room />} />
                <Route path="room" element={<Room />} />
            </Route>
        </>
    )
);

function App() {
    const socket = useSocketContext().socket.socket;
    const dispatch = useDispatch();
    const chunkSize = 64 * 1024;

    useEffect(() => {
        // const socket = io(import.meta.env.VITE_SERVER_URL);
        // socketState.setSocket({ socket: socket });

        socket.on("auth-success", (roomId) => {
            console.log(`Auth successful for room: ${roomId}`);
            dispatch(setRoom(roomId));
            router.navigate(`/room/${roomId}`);
        });

        socket.on("auth-failure", (message) => {
            dispatch(setErrorState(message));
        });

        socket.on("error", (message) => {
            dispatch(setErrorState(message));
        });

        socket.on("join-notification", (data) => {
            console.log("Join notification", data);
            data.forEach((member) => {
                if (member.isOwner && member.socketId === socket.id) {
                    dispatch(setOwner(true));
                }
            });

            dispatch(replaceMembers(data));
        });

        socket.on("left-notification", (data) => {
            console.log("Left notification", data);
            dispatch(replaceMembers(data));
        });

        socket.on("res-members", (data) => {
            data.forEach((member) => {
                if (member.isOwner && member.socketId === socket.id) {
                    dispatch(setOwner(true));
                }
            });
            dispatch(replaceMembers(data));
        });

        socket.on("receive-chunk", (data) => {
            dispatch(
                addIncomingFile({
                    id: data.id,
                    filename: data.filename,
                    size: data.size,
                    offset: data.offset,
                    progress: data.offset + chunkSize < data.size ? Math.floor((data.offset / data.size) * 100) : 100,
                    sender: data.sender,
                })
            );

            receiveChunks(data, chunkSize);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return <RouterProvider router={router} />;
}

export default App;
