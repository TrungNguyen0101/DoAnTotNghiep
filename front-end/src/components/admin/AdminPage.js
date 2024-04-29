import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import { Outlet } from "react-router-dom";

function AdminPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className=" grid-container">
      <Header OpenSidebar={OpenSidebar} openSidebarToggle={openSidebarToggle} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <Outlet />
      {/* <Home /> */}
    </div>
  );
}

export default AdminPage;
