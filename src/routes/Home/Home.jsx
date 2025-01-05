import { useState } from "react";

import Header from "../../components/Navbar/Header";
import SideBar from "../../components/Sidebar/SideBar";

function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-" style={{ backgroundColor: "#F1F5F9" }}>
            <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
    );
}

export default Home;
