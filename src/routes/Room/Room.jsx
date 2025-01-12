import FileBar from "../../components/FIleBar/FileBar";
import RoomIDComponent from "../../components/RoomIDComponent/RoomIDComponent";

function Room() {
    return (
        <div className="w-full h-full flex flex-col items-center p-4 overflow-auto">
            <div className="w-full flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Room</h1>
                <RoomIDComponent />
            </div>
            <div className="flex flex-col h-full lg:flex-row gap-4 w-full overflow-hidden">
                <div className="flex-5 flex flex-col gap-4">
                    <div className="flex-1 bg-white border border-gray-200 shadow-default p-4 overflow-auto">
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
                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div>
                    </div>
                    <div className="flex-1 bg-white border border-gray-200 shadow-default p-4 overflow-auto">
                        <FileBar file={{ name: "" }} progress={0} />
                    </div>
                </div>
                <div className="flex-2 h-full bg-white border border-gray-200 shadow-default overflow-hidden">
                    <div className="flex justify-between p-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-black 2xl:text-xl">Members</h3>
                        <span className="text-gray-400">7</span>
                    </div>
                    <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto pb-20">
                        <div className="flex items-center gap-2">
                            <img src="/avatar.png" alt="user" className="w-10 h-10 rounded-full" />
                            <div className="flex justify-between items-center w-full">
                                <span className="text-base font-medium text-black">John Doe</span>

                                <button className="flex w-fit justify-center rounded bg-red-500 hover:bg-red-400 p-2 font-medium text-white cursor-pointer">
                                    Remove
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src="/avatar.png" alt="user" className="w-10 h-10 rounded-full" />
                            <div className="flex justify-between items-center w-full">
                                <span className="text-base font-medium text-black">John Doe</span>

                                <button className="flex w-fit justify-center rounded bg-red-500 hover:bg-red-400 p-2 font-medium text-white cursor-pointer">
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Room;
