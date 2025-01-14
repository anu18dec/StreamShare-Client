import { useEffect, useRef, useState } from "react";
import FileBar from "../../components/FIleBar/FileBar";
import RoomIDComponent from "../../components/RoomIDComponent/RoomIDComponent";
import { useParams } from "react-router-dom";
import { useSocketContext } from "../../context/socketContext";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { setRoom, setOwner, deleteRoom } from "../../store/auth/roomSlice";
import { useDispatch } from "react-redux";
import RoomMembers from "../../components/RoomMembers/RoomMembers";

function Room() {
    const param = useParams();
    const [roomId, setRoomId] = useState(null);
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef();
    const socketState = useSocketContext().socket.socket;
    const unique_id = uuid().slice(0, 10);
    const userName = useSelector((state) => state.auth.userName);
    const dispatch = useDispatch();
    const roomDetails = useSelector((state) => state.room);

    console.log(roomDetails);

    useEffect(() => {
        const roomId = param.roomId || unique_id;

        setRoomId(roomId);
        dispatch(setRoom(roomId));
        dispatch(setOwner(true));

        socketState.emit("join-room", {
            username: userName,
            roomId: roomId,
            socketId: socketState.id,
        });

        socketState.emit("req-members", roomId);

        return () => {
            socketState.emit("leave-room", {
                username: userName,
                roomId: roomId,
                socketId: socketState.id,
            });

            dispatch(deleteRoom());
        };
    }, []);

    const handleFileSelect = (event) => {
        const selectedFiles = Array.from(event.target.files).map((file) => ({
            file,
            progress: -1,
            status: "pending",
        }));

        if (!selectedFiles) return;

        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

        fileInputRef.current.value = null;

        console.log(files);
    };

    const handleSubmit = (index) => {
        console.log(index);
    };

    const handleDelete = (index) => {
        console.log(index);
    };

    return (
        <div className="w-full h-full flex flex-col items-center p-4 overflow-auto">
            <div className="w-full flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Room</h1>
                <RoomIDComponent roomId={roomId} />
            </div>
            <div className="flex flex-col h-full lg:flex-row gap-4 w-full overflow-hidden">
                <div className="flex-5 flex flex-col gap-4">
                    <div
                        className="flex-1 bg-white border border-gray-200 shadow-default p-4 overflow-auto"
                        style={{ aspectRatio: "2/1" }}
                    >
                        <div className="flex items-center justify-center w-full h-full">
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        MAX. 500 MB allowed for each file
                                    </p>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileSelect}
                                    multiple
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2 bg-white border border-gray-200 shadow-default p-4 overflow-auto">
                        {files.map((fileObj, index) => (
                            <FileBar
                                key={index}
                                file={fileObj.file}
                                progress={fileObj.progress}
                                status={fileObj.status}
                                index={index}
                                handleSubmit={handleSubmit}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex-2 h-full bg-white border border-gray-200 shadow-default overflow-hidden">
                    <div className="flex justify-between p-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-black 2xl:text-xl">Members</h3>
                        <span className="text-gray-400">7</span>
                    </div>
                    <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto pb-20">
                        {roomDetails.roomMembers.map((member) => (
                            <RoomMembers
                                key={member.username}
                                username={member.username}
                                socketId={member.socketId}
                                isOwner={roomDetails.isOwner}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Room;
