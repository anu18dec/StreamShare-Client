import { useState } from "react";
import { NavLink } from "react-router-dom";

function SideBar({ sidebarOpen, setSidebarOpen }) {
    return (
        <aside
            className={`absolute left-0 top-0 flex flex-col h-screen w-62.5 duration-300 overflow-y-hidden ease-linear md:static md:translate-x-0 ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{ backgroundColor: "#1C2434" }}
        >
            <div className="flex justify-center items-center gap-1 m-2">
                <img src="/logo.png" className="w-5 h-5" alt="logo" />
                <span className="text-white font-bold xl:text-2xl lg:text-xl md:text-lg">Stream Share</span>
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
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default SideBar;
