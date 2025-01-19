import { useEffect, useState } from "react";
import { setUserName } from "../../store/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useSocketContext } from "../../context/socketContext.js";
import { clearErrorState } from "../../store/error/errorSlice.js";

function Login() {
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const loacation = useLocation();
    const socketState = useSocketContext().socket.socket;
    const errorState = useSelector((state) => state.error.error);

    useEffect(() => {
        if (errorState) {
            setError(errorState);
        }
    }, [errorState]);

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(clearErrorState());

        const username = event.target.username.value;
        const roomId = event.target.roomId.value;
        const roomPassword = event.target.roomPassword.value;

        if (!username) {
            setError("Username is required");
            return;
        }

        if (username.length > 20) {
            setError("Username must be less than 20 characters");
            return;
        }

        if (!roomId) {
            setError("Something went wrong, unable to find room Id!");
            return;
        }

        if (!roomPassword) {
            setError("Password is required");
            return;
        }

        if (!roomPassword) {
            setError("Password is required");
            return;
        }

        if (!socketState || !socketState.connected) {
            setError("Something went wrong, unable to connect to server");
            return;
        }

        socketState.emit("join-room", {
            username: username,
            roomId: roomId,
            roomPassword: roomPassword,
        });

        dispatch(setUserName(username));
    };

    return (
        <>
            <div
                className="flex h-screen flex-col justify-center items-center px-6 py-12 lg:px-8"
                style={{
                    backgroundImage:
                        "linear-gradient(to right top, #ecb2d3, #e2b3db, #d5b5e2, #c8b8e7, #b9baea, #adc0ef, #a2c5f1, #98caf1, #92d3f2, #92dcf0, #97e4ec, #a2ebe6)",
                }}
            >
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img alt="Logo" src="/logo.png" className="mx-auto h-10 w-auto" />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Welcome to Stream Share
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="roomId" className="block text-sm/6 font-medium text-gray-900">
                                Room Id
                            </label>
                            <div className="mt-2">
                                <input
                                    id="roomId"
                                    name="roomId"
                                    type="text"
                                    disabled={true}
                                    value={loacation.state.roomId}
                                    className="block w-full rounded-md bg-gray-300 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                User Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    maxLength={20}
                                    placeholder="Enter username"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="roomPassword" className="block text-sm/6 font-medium text-gray-900">
                                Room Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="roomPassword"
                                    name="roomPassword"
                                    type="text"
                                    maxLength={20}
                                    placeholder={
                                        loacation.state.IsCreatingRoom
                                            ? "Type here to create room password"
                                            : "Type room password here to join"
                                    }
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition
                            duration-300"
                            >
                                Sign in as guest
                            </button>

                            {error && <p className="mt-2 text-center text-red-500">{error}</p>}
                        </div>
                    </form>
                </div>
                <div className="h-40 mt-10 sm:mx-auto sm:w-full sm:max-w-sm"></div>
            </div>
        </>
    );
}

export default Login;
