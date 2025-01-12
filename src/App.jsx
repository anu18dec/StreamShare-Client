import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import AuthLayout from "./routes/Layout/AuthLayout.jsx";
import Home from "./routes/Home/Home.jsx";
import { useEffect } from "react";
import { useSocketContext } from "./context/socketContext.js";
import io from "socket.io-client";
import Login from "./routes/Login/Login.jsx";
import Room from "./routes/Room/Room.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<AuthLayout />}>
                <Route path="" element={<Home />} />
                <Route path="room" element={<Room />} />
            </Route>
        </>
    )
);

function App() {
    const socketState = useSocketContext();
    const fileBuffers = {};

    useEffect(() => {
        const socket = io(import.meta.env.VITE_SERVER_URL);
        socketState.setSocket({ socket: socket });

        socket.on("join-notification", (data) => {
            console.log(data);
        });

        socket.on("left-notification", (data) => {
            console.log(data);
        });

        socket.on("receive-chunk", (data) => {
            const { chunk, filename, isLastChunk } = data;

            if (!fileBuffers[filename]) {
                fileBuffers[filename] = [];
            }

            fileBuffers[filename].push(new Uint8Array(chunk));

            if (isLastChunk) {
                // Reconstruct file
                const blob = new Blob(fileBuffers[filename]);
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                link.click();

                console.log(`File "${filename}" received and downloaded!`);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    console.log(socketState);

    return <RouterProvider router={router} />;
}

export default App;
