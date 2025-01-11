import { useState } from "react";
import { useSocketContext } from "../../context/socketContext";

function Home() {
    const [roomId, setRoomId] = useState("");
    const [username, setUsername] = useState("");

    const socket = useSocketContext().socket.socket;

    console.log(socket);

    const handleJoinRoom = () => {
        socket.emit("join-room", { username, roomId });
    };

    const handleGetData = () => {
        setUsername(window.prompt("Enter Username"));

        setRoomId(window.prompt("Enter RoomId"));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Chunk size (64 KB)
        const chunkSize = 64 * 1024;
        let offset = 0;

        const readChunk = () => {
            const slice = file.slice(offset, offset + chunkSize);
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                socket.emit("send-chunk", {
                    chunk: e.target.result,
                    filename: file.name,
                    roomId: roomId,
                    isLastChunk: offset + chunkSize >= file.size,
                });

                offset += chunkSize;
                if (offset < file.size) {
                    readChunk(); // Read the next chunk
                } else {
                    console.log("File upload complete!");
                }
            };

            fileReader.readAsArrayBuffer(slice);
        };

        readChunk();
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <button
                onClick={handleJoinRoom}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
                Join Room
            </button>

            <button
                onClick={handleGetData}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
                Get Data
            </button>

            <input type="file" onChange={handleFileChange} />
        </div>
    );
}

export default Home;
