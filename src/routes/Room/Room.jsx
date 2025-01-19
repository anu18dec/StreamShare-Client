import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import FileBar from "../../components/FIleBar/FileBar";
import RoomIDComponent from "../../components/RoomIDComponent/RoomIDComponent";
import { useSocketContext } from "../../context/socketContext";
import { deleteRoom } from "../../store/room/roomSlice";
import { deleteRoomMembers } from "../../store/room/roomMembersSlice";
import RoomMembers from "../../components/RoomMembers/RoomMembers";
import sendChunks from "../../utils/sendChunks";
import IncomingFileBar from "../../components/FIleBar/IncomingFileBar";

function Room() {
    const socketState = useSocketContext().socket.socket;
    const userName = useSelector((state) => state.auth.userName);
    const roomId = useSelector((state) => state.room.roomId);
    const roomMem = useSelector((state) => state.roomMembers);
    const incomingFiles = useSelector((state) => state.incomingFiles.files);

    const [isCancelled, setIsCancelled] = useState(false);
    const fileInputRef = useRef();
    const dispatch = useDispatch();
    const [filesList, setFilesList] = useState(new Map());

    console.log(roomMem);
    console.log("Socket state: ", socketState);

    // Set state reset and warning
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = "Data will be lost if you leave the page, are you sure?";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        socketState.emit("req-members", roomId);

        return () => {
            socketState.emit("leave-room", {
                username: userName,
                roomId: roomId,
                socketId: socketState.id,
            });

            window.removeEventListener("beforeunload", handleBeforeUnload);

            dispatch(deleteRoom());
            dispatch(deleteRoomMembers());
        };
    }, []);

    // Handle file select
    const handleFileSelect = (event) => {
        const existingList = new Map(filesList);

        Array.from(event.target.files).map((file) => {
            existingList.set(nanoid().toString(), {
                file,
                progress: -1,
                status: "pending",
            });
        });

        if (!existingList) return;

        setFilesList(existingList);

        fileInputRef.current.value = null;
    };

    const handleSubmit = (key) => {
        setIsCancelled(false);
        sendChunks(
            socketState,
            roomId,
            key,
            filesList.get(key).file,
            (offset) => {
                setFilesList((prev) => {
                    const file = prev.get(key).file;
                    let progress = 0;
                    let status = "";
                    if (offset < file.size) {
                        progress = Math.floor((offset / file.size) * 100);
                        status = "InProgress";
                    } else {
                        progress = 100;
                        status = "Completed";
                    }
                    prev.set(key, {
                        ...prev.get(key),
                        progress,
                        status,
                    });

                    return new Map(prev);
                });
            },
            isCancelled
        );
        setIsCancelled(false);
    };

    const handleDelete = (key) => {
        const existingList = new Map(filesList);
        existingList.delete(key);

        setFilesList(existingList);
    };

    return (
        <div className="flex-1 w-full flex flex-col items-center p-4">
            <div className="w-full flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Room</h1>
                <RoomIDComponent roomId={roomId} />
            </div>
            <div className="w-full min-h-96 flex flex-col lg:flex-row justify-between items-start mb-4">
                <div className="w-full lg:flex-1 min-h-96 lg:h-screen overflow-y-hidden">
                    <div className="flex justify-between items-baseline p-4">
                        <span className="text-gray-400"></span>
                        <h3 className="text-2xl font-bold tracking-tight text-gray-600 ">Members</h3>
                        <span className="text-green-600">{roomMem.memberList.length}</span>
                    </div>
                    <div className="flex flex-col gap-4 p-4  overflow-y-auto pb-20">
                        {roomMem.memberList.map((member) => (
                            <RoomMembers
                                key={member.socketId}
                                roomMembers={member}
                                isOwner={roomMem.isOwner}
                                curSocketId={socketState.id}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-full h-screen lg:flex-2 flex items-center border border-gray-200 rounded-lg shadow flex-col justify-start overflow-y-auto">
                    <div className="flex-1 bg-white p-4 w-full flex justify-center items-center">
                        <div className="flex items-center justify-center w-2/3 h-full">
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full rounded-lg cursor-pointer text-blue-500 hover:text-blue-600 h-full"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-inherit"
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
                                        <span className="pe-1 font-medium text-black ">Drop your file here or</span>
                                        <span className="bg-white font-semibold text-blue-600 hover:text-blue-700 rounded-lg decoration-2 hover:underline focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2">
                                            browse
                                        </span>
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

                    <div className="flex-2 min-h-96 w-full h-full flex flex-col gap-2 bg-white p-4 overflow-auto">
                        {[...filesList.entries()].map(([key, value]) => (
                            <FileBar
                                key={key}
                                file={value.file}
                                progress={value.progress}
                                status={value.status}
                                index={key}
                                handleSubmit={handleSubmit}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-full lg:flex-1 min-h-96 lg:h-screen overflow-y-hidden">
                    <div className="flex p-4 justify-center">
                        <h3 className="text-2xl font-bold tracking-tight text-gray-600 ">Files Recieved</h3>
                        <span className="text-gray-400"></span>
                    </div>
                    <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto pb-20 ">
                        {Object.entries(incomingFiles).map(([key, value]) => (
                            <IncomingFileBar
                                key={key}
                                filename={value.filename}
                                size={value.size}
                                progress={value.progress}
                                sender={value.sender}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {/* <div className="flex flex-col  lg:flex-row gap-4 w-full">
                <div className="flex-5 flex flex-col gap-4">
                    <div className="flex-1 bg-white p-4 overflow-auto min-h-96" style={{ aspectRatio: "2/1" }}>
                        <div className="flex items-center justify-center w-full h-full">
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full  rounded-lg cursor-pointer  h-full"
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
                                        <span className="pe-1 font-medium text-gray-800 dark:text-neutral-200">
                                            Drop your file here or
                                        </span>
                                        <span className="bg-white font-semibold text-blue-600 hover:text-blue-700 rounded-lg decoration-2 hover:underline focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2">
                                            browse
                                        </span>
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
                    <div className="flex-1 flex flex-col gap-2 bg-white border min-h-96 border-gray-200 shadow-default p-4 overflow-auto">
                        {filesDetails.map((fileObj, index) => (
                            <FileBar
                                key={index}
                                file={fileObj}
                                progress={fileObj.progress}
                                status={fileObj.status}
                                index={index}
                                handleSubmit={handleSubmit}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex-2  flex flex-col gap-4">
                    <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow overflow-hidden min-h-96">
                        <div className="flex justify-between p-4 ">
                            <h3 className="text-lg font-medium text-black 2xl:text-xl">Members</h3>
                            <span className="text-gray-400">{roomDetails.roomMembers.length}</span>
                        </div>
                        <div className="flex flex-col gap-4 p-4  overflow-y-auto pb-20">
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
                    <div className="flex-1 bg-white border border-gray-200 rounded-lg shadow overflow-hidden min-h-96">
                        <div className="flex justify-between p-4 ">
                            <h3 className="text-lg font-medium text-black 2xl:text-xl">Files Recieved</h3>
                            <span className="text-gray-400"></span>
                        </div>
                        <div className="flex flex-col gap-4 p-4  overflow-y-auto pb-20">
                            {Object.entries(incomingFiles).map(([key, value]) => (
                                <IncomingFileBar
                                    key={key}
                                    filename={value.filename}
                                    size={value.size}
                                    progress={value.progress}
                                    sender={value.sender}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default Room;
