import { NavLink } from "react-router-dom";

function SideBar({ sidebarOpen, setSidebarOpen }) {
    return (
        <aside
            className={`absolute left-0 z-9999 top-0 flex flex-col h-screen w-72.5 md:62.5 lg: 72.5  duration-300 overflow-y-hidden ease-linear sm:static sm:translate-x-0 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{ backgroundColor: "#1C2434" }}
        >
            <div className="flex justify-between items-center gap-1 m-2 mb-10">
                <div className="flex justify-center items-center">
                    <img src="/logo.png" className="w-7 h-7" alt="logo" />
                    <span className="text-white font-bold xl:text-2xl lg:text-xl md:text-lg">Stream Share</span>
                </div>
                <div className="flex justify-end sm:hidden">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="block ">
                        <svg
                            className="fill-current hover:text-white text-gray-400"
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                                fill=""
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex flex-col h-full p-4 pt-10">
                <span className="lg:text-xl md:text-lg  text-sky-100">MENU</span>
                <nav>
                    <ul className="flex flex-col  gap-2 mt-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `${
                                    isActive ? "bg-gray-600" : ""
                                }  flex items-center gap-2 p-2 rounded-lg text-white hover:bg-gray-600 hover:text-white`
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="icon icon-tabler icons-tabler-filled icon-tabler-home text-white"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12.707 2.293l9 9c.63 .63 .184 1.707 -.707 1.707h-1v6a3 3 0 0 1 -3 3h-1v-7a3 3 0 0 0 -2.824 -2.995l-.176 -.005h-2a3 3 0 0 0 -3 3v7h-1a3 3 0 0 1 -3 -3v-6h-1c-.89 0 -1.337 -1.077 -.707 -1.707l9 -9a1 1 0 0 1 1.414 0m.293 11.707a1 1 0 0 1 1 1v7h-4v-7a1 1 0 0 1 .883 -.993l.117 -.007z" />
                            </svg>
                            Home
                        </NavLink>
                        <NavLink
                            to="/friends"
                            className={({ isActive }) =>
                                `${
                                    isActive ? "bg-gray-600" : ""
                                }  flex items-center gap-2 p-2 rounded-lg text-white hover:bg-gray-600 hover:text-white`
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-friends text-white"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M7 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M5 22v-5l-1 -1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5" />
                                <path d="M17 5m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M15 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4" />
                            </svg>
                            Friends
                        </NavLink>
                        <NavLink
                            to="/history"
                            className={({ isActive }) =>
                                `${
                                    isActive ? "bg-gray-600" : ""
                                }  flex items-center gap-2 p-2 rounded-lg text-white hover:bg-gray-600 hover:text-white`
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            History
                        </NavLink>
                        <NavLink
                            to="/room"
                            className={({ isActive }) =>
                                `${
                                    isActive ? "bg-gray-600" : ""
                                }  flex items-center gap-2 p-2 rounded-lg text-white hover:bg-gray-600 hover:text-white`
                            }
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            Room
                        </NavLink>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default SideBar;
