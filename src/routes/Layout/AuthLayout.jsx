import { useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

import Header from "../../components/Navbar/Header";
import SideBar from "../../components/Sidebar/SideBar";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";

function AuthLayout({ IsAuth }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const userName = useSelector((state) => state.auth.userName);
    const roomDetails = useSelector((state) => state.room);
    const params = useParams();
    let unique_id = "";
    let IsCreatingRoom = false;

    if (params.roomId) {
        unique_id = params.roomId;
    } else {
        unique_id = nanoid().toString();
        IsCreatingRoom = true;
    }

    return (userName && roomDetails.roomId) || IsAuth ? (
        <div className="flex h-screen w-screen overflow-hidden ">
            <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex h-full flex-col flex-1 w-full overflow-y-auto">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div
                    className="overflow-y-auto h-full"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right top, #ecb2d3, #e2b3db, #d5b5e2, #c8b8e7, #b9baea, #adc0ef, #a2c5f1, #98caf1, #92d3f2, #92dcf0, #97e4ec, #a2ebe6)",
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    ) : (
        <Navigate to="/login" state={{ roomId: unique_id, IsCreatingRoom: IsCreatingRoom }} replace={true} />
    );
}

export default AuthLayout;
