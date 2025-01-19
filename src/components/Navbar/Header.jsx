import { Link, NavLink } from "react-router-dom";
import ProfileDropdown from "../PorfileDropdown/ProfileDropdown";
import NotificationDropdown from "../NotificationDropdown/NotificationDropdown";

function Header({ sidebarOpen, setSidebarOpen }) {
    return (
        <header className="sticky w-full min-h-20 bg-white drop-shadow-sm z-999">
            <div className="w-full h-full flex items-center">
                <div className="flex-1 flex items-center gap-3 px-5">
                    <div>
                        <button
                            aria-controls="sidebar"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSidebarOpen((prev) => !prev);
                            }}
                            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm md:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 hover:text-blue-400"
                            >
                                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex justify-center items-center">
                        <img src="/logo.png" className="w-7 h-7" alt="logo" />
                        <span className="font-bold xl:text-2xl lg:text-xl md:text-lg invisible md:visible text-gray-700">
                            Stream Share
                        </span>
                    </div>
                    {/* <div className="flex justify-start gap-1 items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 text-gray-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>
                        <input
                            type="text"
                            name="price"
                            id="price"
                            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                            placeholder="Type to find user...."
                        />
                    </div> */}
                </div>
                <div className="flex md:gap-12 gap-6 hidden md:flex">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${isActive ? "text-[#007bff]" : ""}  hover:text-[#007bff]  block font-semibold text-[15px]`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/room"
                        className={({ isActive }) =>
                            `${isActive ? "text-[#007bff]" : ""}  hover:text-[#007bff]  block font-semibold text-[15px]`
                        }
                    >
                        Room
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `${isActive ? "text-[#007bff]" : ""}  hover:text-[#007bff]  block font-semibold text-[15px]`
                        }
                    >
                        About
                    </NavLink>
                </div>
                <div className="flex-1 flex justify-end items-center gap-4 px-5">
                    <NotificationDropdown />
                    <ProfileDropdown />
                </div>
            </div>
        </header>
    );
}

export default Header;
