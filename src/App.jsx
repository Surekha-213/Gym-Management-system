
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layout/DashboardLayout";
import { menuItems } from "./data/menuItems";

// Protected route for logged-in users
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/" replace />;
}

// Role-based route protection
function RoleRoute({ children, roles }) {
  const { user } = useAuth();

  return roles.includes(user?.role) ? (
    children
  ) : (
    <Navigate to="/dashboard" replace />
  );
}

// Submodule configuration
const subModules = {
  branches: [
    "Gym Profile",
    "Branch List",
    "Add Branch",
  ],
  users: [
    "User List",
    "Add User",
    "Roles and Permissions",
  ],
  members: [
    "Member List",
    "Add Member",
    "Member Profile",
  ],
  plans: [
    "Plan List",
    "Add Membership Plan",
  ],
  subscriptions: [
    "Subscription List",
    "Assign Membership",
    "Renew Membership",
  ],
  billing: [
    "Invoice List",
    "Record Payment",
    "Receipt Details",
  ],
  refunds: [
    "Refund List",
    "Create Refund",
    "Adjustments",
  ],
  attendance: [
    "Attendance Console",
    "Attendance History",
    "Attendance Exceptions",
  ],
  devices: [
    "Device List",
    "Add Device",
    "Device Sync Logs",
  ],
  "device-mapping": [
    "Mapping List",
    "Create Mapping",
  ],
  trainers: [
    "Trainer List",
    "Add Trainer",
    "Assign Members",
  ],
  workouts: [
    "Workout List",
    "Create Workout",
  ],
  notifications: [
    "Notification List",
    "Notification Settings",
  ],
  reports: [
    "Member Reports",
    "Membership Reports",
    "Attendance Reports",
    "Collection Reports",
    "Dues Reports",
    "Refund Reports",
  ],
  "audit-log": [
    "Audit Log List",
    "Activity Details",
  ],
  "import-export": [
    "Import Members",
    "Export Data",
  ],
  "subscription-admin": [
    "Current Package",
    "Package Details",
    "Usage Limits",
    "Feature Entitlements",
  ],
  settings: [
    "Gym Profile Settings",
    "Operating Hours",
    "Receipt Settings",
    "Notification Settings",
  ],
};

// Convert text into URL-friendly paths
function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Main module layout
function ModuleLayout({ item }) {
  const location = useLocation();

  const moduleKey = item.path.split("/").pop();
  const pages = subModules[moduleKey] || [];

  return (
    <div className="module-page" style={{ padding: "25px" }}>
      <h1>{item.title}</h1>
      <p>Manage {item.title.toLowerCase()}.</p>

      <div
        className="module-submenu"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginTop: "25px",
          marginBottom: "25px",
        }}
      >
        {pages.map((page) => (
          <Link
            key={page}
            to={`${location.pathname}/${createSlug(page)}`}
            style={{
              padding: "12px 18px",
              border: "1px solid #dce5df",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#167a5b",
              background: "#ffffff",
            }}
          >
            {page}
          </Link>
        ))}
      </div>

      <Outlet />
    </div>
  );
}

// Generic submodule page
function SubModulePage() {
  const { subPage } = useParams();

  const pageTitle = subPage
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div
      style={{
        padding: "22px",
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
      }}
    >
      <h2>{pageTitle}</h2>
      <p>This submodule page is ready for frontend development.</p>
    </div>
  );
}

// Application routes
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Main modules and nested submodules */}
        {menuItems
          .filter((item) => item.title !== "Dashboard")
          .map((item) => {
            const routePath = item.path.replace("/dashboard/", "");

            return (
              <Route
                key={item.path}
                path={routePath}
                element={
                  <RoleRoute roles={item.roles}>
                    <ModuleLayout item={item} />
                  </RoleRoute>
                }
              >
                <Route index element={null} />
                <Route
                  path=":subPage"
                  element={<SubModulePage />}
                />
              </Route>
            );
          })}

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
