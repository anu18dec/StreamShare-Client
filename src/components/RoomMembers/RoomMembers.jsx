function RoomMembers({ username, socketId, isOwner }) {
    return (
        <div className="flex items-center gap-2">
            <img src="/avatar.png" alt="user" className="w-10 h-10 rounded-full" />
            <div className="flex justify-between items-center w-full">
                <span className="text-base font-medium text-black">{username}</span>

                <button className="flex w-fit justify-center rounded bg-red-500 hover:bg-red-400 p-2 font-medium text-white cursor-pointer">
                    Remove
                </button>
            </div>
        </div>
    );
}

export default RoomMembers;
