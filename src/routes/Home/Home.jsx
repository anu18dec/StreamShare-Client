import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import SideBar from "../../components/Sidebar/SideBar";

function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen w-screen overflow-hidden">
            <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Navbar />
        </div>
    );
}

export default Home;
