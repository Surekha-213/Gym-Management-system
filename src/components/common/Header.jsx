
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  LogOut,
  UserCircle,
  Search,
  Bell,
  X,
  CheckCheck,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { menuItems } from "../../data/menuItems";

function Header({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Find current module, including its nested pages
  const currentMenu = menuItems.find(
    (item) =>
      location.pathname === item.path ||
      location.pathname.startsWith(item.path + "/")
  );

  const pageTitle = currentMenu?.title || "Dashboard";

  // Generate user initials
  const initials = user?.name
    ?.split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Sample notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Member Registered",
      message: "Rahul Kumar has been registered successfully.",
      time: "10 minutes ago",
      read: false,
      path: "/dashboard/members",
    },
    {
      id: 2,
      title: "Membership Expiring Soon",
      message: "Priya Sharma's membership is expiring soon.",
      time: "30 minutes ago",
      read: false,
      path: "/dashboard/subscriptions",
    },
    {
      id: 3,
      title: "Payment Received",
      message: "A payment of ₹2,500 has been received.",
      time: "1 hour ago",
      read: false,
      path: "/dashboard/billing",
    },
    {
      id: 4,
      title: "Attendance Updated",
      message: "Today's attendance has been updated.",
      time: "2 hours ago",
      read: true,
      path: "/dashboard/attendance",
    },
  ]);

  // Search accessible modules
  const searchResults = menuItems.filter(
    (item) =>
      item.roles.includes(user?.role) &&
      item.title.toLowerCase().includes(searchText.trim().toLowerCase())
  );

  const handleSearchNavigate = (path) => {
    navigate(path);
    setSearchText("");
    setShowSearch(false);
  };

  // Notification count
  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  // Mark one notification as read
  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  // Open notification
  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    navigate(notification.path);
    setShowNotifications(false);
  };

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="dashboard-header">

      {/* LEFT SECTION: COLLAPSE + PAGE TITLE */}
      <div className="header-left">

        <button
          type="button"
          className="header-sidebar-toggle"
          onClick={onToggleSidebar}
          title="Collapse / Expand Sidebar"
        >
          <PanelLeftClose size={21} />
        </button>

        <div className="header-page-info">
          <h2>FITZONE</h2>
          <p>Welcome back, {user?.name}!</p>
        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="header-right">

        {/* GLOBAL SEARCH */}
        <div className="header-search-wrapper">

          <div className="header-search">
            <Search size={19} />

            <input
              type="text"
              placeholder="Search modules..."
              value={searchText}
              onFocus={() => {
                setShowSearch(true);
                setShowNotifications(false);
              }}
              onChange={(e) => {
                setSearchText(e.target.value);
                setShowSearch(true);
              }}
            />

            {searchText && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearchText("")}
                title="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {showSearch && searchText.trim() && (
            <div className="header-search-results">

              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <button
                    type="button"
                    key={item.path}
                    onClick={() =>
                      handleSearchNavigate(item.path)
                    }
                  >
                    <Search size={15} />
                    <span>{item.title}</span>
                  </button>
                ))
              ) : (
                <p className="search-no-results">
                  No matching modules found.
                </p>
              )}

            </div>
          )}

        </div>

        {/* NOTIFICATIONS */}
        <div className="header-notification-wrapper">

          <button
            type="button"
            className="header-notification"
            title="Notifications"
            onClick={() => {
              setShowNotifications((previous) => !previous);
              setShowSearch(false);
            }}
          >
            <Bell size={21} />

            {unreadCount > 0 && (
              <span className="notification-count">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">

              <div className="notification-heading">
                <div>
                  <h3>Notifications</h3>
                  <span>
                    {unreadCount} unread notifications
                  </span>
                </div>

                <button
                  type="button"
                  onClick={markAllAsRead}
                  title="Mark all as read"
                >
                  <CheckCheck size={18} />
                </button>
              </div>

              <div className="notification-list">

                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <button
                      type="button"
                      key={notification.id}
                      className={`notification-item ${
                        !notification.read ? "unread" : ""
                      }`}
                      onClick={() =>
                        handleNotificationClick(notification)
                      }
                    >
                      <div className="notification-dot"></div>

                      <div className="notification-content">
                        <h4>{notification.title}</h4>
                        <p>{notification.message}</p>
                        <span>{notification.time}</span>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="notification-empty">
                    No notifications available.
                  </p>
                )}

              </div>

            </div>
          )}

        </div>

        {/* USER PROFILE */}
        <div className="header-user">

          <div className="header-avatar">
            {initials || <UserCircle size={23} />}
          </div>

          <div className="header-user-details">
            <h4>{user?.name}</h4>
            <span>{user?.role}</span>
          </div>

        </div>

        {/* LOGOUT */}
        <button
          type="button"
          className="header-logout"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

      </div>

    </header>
  );
}

export default Header;
