
import {
  LayoutDashboard,
  Building2,
  Users,
  ClipboardList,
  CreditCard,
  Receipt,
  RotateCcw,
  CalendarCheck,
  Fingerprint,
  Link,
  Dumbbell,
  Activity,
  Bell,
  BarChart3,
  FileClock,
  Database,
  Settings,
  PackageCheck,
} from "lucide-react";

export const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: [
      "Owner / Super Admin",
      "Branch Manager",
      "Front Desk",
      "Trainer",
      "Accounts",
      "System Support",
    ],
  },
  {
    title: "Gym & Branch Setup",
    path: "/dashboard/branches",
    icon: Building2,
    roles: ["Owner / Super Admin"],
  },
  {
    title: "Subscription Administration",
    path: "/dashboard/subscription-admin",
    icon: PackageCheck,
    roles: ["Owner / Super Admin"],
  },
  {
    title: "User & Role Management",
    path: "/dashboard/users",
    icon: Users,
    roles: ["Owner / Super Admin"],
  },
  {
    title: "Member Management",
    path: "/dashboard/members",
    icon: Users,
    roles: [
      "Owner / Super Admin",
      "Branch Manager",
      "Front Desk",
      "Trainer",
    ],
  },
  {
    title: "Membership Plans",
    path: "/dashboard/plans",
    icon: ClipboardList,
    roles: [
      "Owner / Super Admin",
      "Branch Manager",
      "Front Desk",
    ],
  },
  {
    title: "Member Subscriptions",
    path: "/dashboard/subscriptions",
    icon: CreditCard,
    roles: [
      "Owner / Super Admin",
      "Branch Manager",
      "Front Desk",
    ],
  },
  {
    title: "Billing & Receipts",
    path: "/dashboard/billing",
    icon: Receipt,
    roles: [
      "Owner / Super Admin",
      "Branch Manager",
      "Front Desk",
      "Accounts",
    ],
  },
  {
    title: "Refunds & Adjustments",
    path: "/dashboard/refunds",
    icon: RotateCcw,
    roles: [
      "Owner / Super Admin",
      "Accounts",
    ],
  },
  {
    title: "Attendance",
    path: "/dashboard/attendance",
    icon: CalendarCheck,
    roles: [
      "Owner / Super Admin",
      "Branch Manager",
      "Front Desk",
      "Trainer",
    ],
  },
  {
    title: "Biometric Devices",
    path: "/dashboard/devices",
    icon: Fingerprint,
    roles: [
      "Owner / Super Admin",
      "System Support",
    ],
  },
  {
    title: "Device User Mapping",
    path: "/dashboard/device-mapping",
    icon: Link,
    roles: [
      "Owner / Super Admin",
      "System Support",
    ],
  },
  {
    title: "Trainer Management",
    path: "/dashboard/trainers",
    icon: Dumbbell,
    roles: [
      "Owner / Super Admin",
      "Branch Manager",
    ],
  },
  {
    title: "Workout Plans",
    path: "/dashboard/workouts",
    icon: Activity,
    roles: [
      "Owner / Super Admin",
      "Branch Manager",
      "Trainer",
    ],
  },
  {
    title: "Notifications",
    path: "/dashboard/notifications",
    icon: Bell,
    roles: [
      "Owner / Super Admin",
      "Branch Manager",
      "Front Desk",
      "Trainer",
      "Accounts",
    ],
  },
  {
    title: "Reports",
    path: "/dashboard/reports",
    icon: BarChart3,
    roles: [
      "Owner / Super Admin",
      "Branch Manager",
      "Accounts",
    ],
  },
  {
    title: "Audit Log",
    path: "/dashboard/audit-log",
    icon: FileClock,
    roles: [
      "Owner / Super Admin",
      "System Support",
    ],
  },
  {
    title: "Import / Export",
    path: "/dashboard/import-export",
    icon: Database,
    roles: ["Owner / Super Admin"],
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
    roles: [
      "Owner / Super Admin",
      "Branch Manager",
      "Front Desk",
      "Trainer",
      "Accounts",
      "System Support",
    ],
  },
];
