
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import "../styles/dashboard.css";

function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed((previous) => !previous);
  };

  return (
    <div
      className={`dashboard-layout ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <Sidebar collapsed={sidebarCollapsed} />

      <div className="dashboard-main">
        <Header onToggleSidebar={toggleSidebar} />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
