import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">KIDE</div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/admin/dashboard" className="flex items-center">
            <BsGrid1X2Fill className="icon" /> <span>Dashboard</span>
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/admin/game" className="flex items-center">
            <BsFillArchiveFill className="icon" /> Games
          </Link>
        </li>
        <li className="sidebar-list-item">
          <a href="" className="flex items-center">
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="" className="flex items-center">
            <BsPeopleFill className="icon" /> Customers
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="" className="flex items-center">
            <BsListCheck className="icon" /> Inventory
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="" className="flex items-center">
            <BsMenuButtonWideFill className="icon" /> Reports
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="" className="flex items-center">
            <BsFillGearFill className="icon" /> Setting
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
