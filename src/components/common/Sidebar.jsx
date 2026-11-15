
import { NavLink } from "react-router-dom";
import { Dumbbell } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { menuItems } from "../../data/menuItems";

function Sidebar({ collapsed }) {
  const { user } = useAuth();

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* BRAND */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <Dumbbell size={24} />
        </div>

        {!collapsed && (
          <span>
            FIT<span>ZONE</span>
          </span>
        )}
      </div>

      {/* NAVIGATION */}
      <nav className="sidebar-navigation">

        {!collapsed && (
          <p className="sidebar-section-title">
            MAIN MENU
          </p>
        )}

        <div className="sidebar-menu">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                title={collapsed ? item.title : ""}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Icon size={19} />

                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            );
          })}
        </div>

      </nav>

      {/* SIDEBAR FOOTER */}
      {!collapsed && (
        <div className="sidebar-footer">
          <div className="sidebar-footer-icon">
            <Dumbbell size={18} />
          </div>

          <div>
            <p>FITZONE</p>
            <span>Gym Management System</span>
          </div>
        </div>
      )}

    </aside>
  );
}

export default Sidebar;
