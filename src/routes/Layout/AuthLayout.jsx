import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import Header from "../../components/Navbar/Header";
import SideBar from "../../components/Sidebar/SideBar";
import { useSelector } from "react-redux";

function AuthLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const userName = useSelector((state) => state.auth.userName);

    console.log(userName);

    useEffect(() => {
        window.onbeforeunload = function () {
            return "Data will be lost if you leave the page, are you sure?";
        };
    }, []);

    return userName ? (
        <div className="flex h-screen w-screen overflow-hidden bg-" style={{ backgroundColor: "#F1F5F9" }}>
            <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex flex-col flex-1 w-full overflow-y-scroll">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <Outlet />
            </div>
        </div>
    ) : (
        <Navigate to="/login" />
    );
}

export default AuthLayout;
