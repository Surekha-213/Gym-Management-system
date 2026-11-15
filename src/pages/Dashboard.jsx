
import {
  Users,
  CalendarCheck,
  IndianRupee,
  Clock,
  TrendingUp,
  ArrowUpRight,
  UserPlus,
  CreditCard,
  ClipboardCheck,
  CalendarPlus,
  AlertCircle,
  Activity,
} from "lucide-react";

import "../styles/dashboard-home.css";

function Dashboard() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Sample data for frontend demonstration
  const stats = [
    {
      title: "Active Members",
      value: "986",
      description: "Currently active memberships",
      icon: Users,
      color: "green",
    },
    {
      title: "Today's Attendance",
      value: "186",
      description: "Member check-ins today",
      icon: CalendarCheck,
      color: "orange",
    },
    {
      title: "Today's Collection",
      value: "₹18,500",
      description: "Payments received today",
      icon: IndianRupee,
      color: "purple",
    },
    {
      title: "Expiring Soon",
      value: "24",
      description: "Memberships expiring shortly",
      icon: Clock,
      color: "red",
    },
  ];

  const collectionData = [
    { day: "Mon", amount: 12000 },
    { day: "Tue", amount: 18000 },
    { day: "Wed", amount: 14500 },
    { day: "Thu", amount: 22000 },
    { day: "Fri", amount: 16000 },
    { day: "Sat", amount: 26000 },
    { day: "Sun", amount: 18500 },
  ];

  const attendanceData = [
    { day: "Mon", count: 120 },
    { day: "Tue", count: 145 },
    { day: "Wed", count: 132 },
    { day: "Thu", count: 168 },
    { day: "Fri", count: 155 },
    { day: "Sat", count: 210 },
    { day: "Sun", count: 186 },
  ];

  const renewalAlerts = [
    {
      name: "Rahul Kumar",
      plan: "Monthly Plan",
      date: "16 Nov 2026",
      days: "1 day left",
    },
    {
      name: "Priya Sharma",
      plan: "Quarterly Plan",
      date: "18 Nov 2026",
      days: "3 days left",
    },
    {
      name: "Arjun Reddy",
      plan: "Monthly Plan",
      date: "20 Nov 2026",
      days: "5 days left",
    },
  ];

  const activities = [
    {
      name: "Rahul Kumar",
      action: "New membership registered",
      time: "10 minutes ago",
      status: "New Member",
    },
    {
      name: "Priya Sharma",
      action: "Membership renewed",
      time: "30 minutes ago",
      status: "Renewal",
    },
    {
      name: "Arjun Reddy",
      action: "Checked in at gym",
      time: "1 hour ago",
      status: "Attendance",
    },
    {
      name: "Sneha Rao",
      action: "Payment received",
      time: "2 hours ago",
      status: "Payment",
    },
  ];

  const quickActions = [
    {
      title: "Register Member",
      description: "Add a new gym member",
      icon: UserPlus,
      color: "green",
    },
    {
      title: "Record Attendance",
      description: "Manage member check-ins",
      icon: ClipboardCheck,
      color: "orange",
    },
    {
      title: "Collect Payment",
      description: "Record a member payment",
      icon: CreditCard,
      color: "purple",
    },
    {
      title: "Create Subscription",
      description: "Assign a membership plan",
      icon: CalendarPlus,
      color: "blue",
    },
  ];

  const maxCollection = Math.max(
    ...collectionData.map((item) => item.amount)
  );

  const maxAttendance = Math.max(
    ...attendanceData.map((item) => item.count)
  );

  return (
    <div className="dashboard-home">
      {/* Welcome Section */}
      <div className="dashboard-welcome">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Here's what's happening at your gym today.</p>
        </div>

        <div className="dashboard-date">
          <Clock size={17} />
          <span>{today}</span>
        </div>
      </div>

      

      {/* Summary Cards */}
      <div className="dashboard-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="dashboard-stat-card" key={stat.title}>
              <div className="dashboard-stat-top">
                <div className={`dashboard-stat-icon ${stat.color}`}>
                  <Icon size={23} />
                </div>
              </div>

              <h3>{stat.value}</h3>
              <p className="dashboard-stat-title">{stat.title}</p>
              <span className="dashboard-stat-description">
                {stat.description}
              </span>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="dashboard-charts-grid">
        {/* Collection Chart */}
        <section className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div>
              <h2>7-Day Collection</h2>
              <p>Daily payment collection overview</p>
            </div>
            <div className="dashboard-chart-icon green">
              <IndianRupee size={19} />
            </div>
          </div>

          <div className="dashboard-chart-total">
            <h3>₹1,27,000</h3>
            <span>
              <TrendingUp size={14} />
              This week
            </span>
          </div>

          <div className="dashboard-bar-chart">
            {collectionData.map((item) => (
              <div className="dashboard-bar-column" key={item.day}>
                <div className="dashboard-bar-area">
                  <div
                    className="dashboard-bar collection-bar"
                    style={{
                      height: `${(item.amount / maxCollection) * 100}%`,
                    }}
                    title={`₹${item.amount.toLocaleString("en-IN")}`}
                  />
                </div>
                <span>{item.day}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Attendance Chart */}
        <section className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div>
              <h2>Attendance Trend</h2>
              <p>Daily member check-ins</p>
            </div>
            <div className="dashboard-chart-icon orange">
              <Activity size={19} />
            </div>
          </div>

          <div className="dashboard-chart-total">
            <h3>186</h3>
            <span>Today's check-ins</span>
          </div>

          <div className="dashboard-bar-chart">
            {attendanceData.map((item) => (
              <div className="dashboard-bar-column" key={item.day}>
                <div className="dashboard-bar-area">
                  <div
                    className="dashboard-bar attendance-bar"
                    style={{
                      height: `${(item.count / maxAttendance) * 100}%`,
                    }}
                    title={`${item.count} check-ins`}
                  />
                </div>
                <span>{item.day}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Renewal Alerts and Quick Actions */}
      <div className="dashboard-content-grid">
        <section className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div>
              <h2>Renewal Alerts</h2>
              <p>Memberships approaching expiry</p>
            </div>

            <span className="dashboard-count-badge">
              {renewalAlerts.length} Alerts
            </span>
          </div>

          <div className="dashboard-renewal-list">
            {renewalAlerts.map((member) => (
              <div className="dashboard-renewal-item" key={member.name}>
                <div className="renewal-icon">
                  <Clock size={19} />
                </div>

                <div className="renewal-details">
                  <h4>{member.name}</h4>
                  <p>{member.plan}</p>
                  <span>Expires: {member.date}</span>
                </div>

                <span className="renewal-days">{member.days}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-panel">
          <div className="dashboard-panel-header">
            <div>
              <h2>Quick Actions</h2>
              <p>Frequently used operations</p>
            </div>
          </div>

          <div className="dashboard-quick-actions">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <div className="dashboard-action-item" key={action.title}>
                  <div className={`dashboard-action-icon ${action.color}`}>
                    <Icon size={20} />
                  </div>

                  <div>
                    <h4>{action.title}</h4>
                    <p>{action.description}</p>
                  </div>

                  <ArrowUpRight size={17} className="action-arrow" />
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Recent Activities */}
      <section className="dashboard-panel dashboard-activities-panel">
        <div className="dashboard-panel-header">
          <div>
            <h2>Recent Activities</h2>
            <p>Latest activities in your gym</p>
          </div>

          <span className="dashboard-activity-label">Recent Updates</span>
        </div>

        <div className="dashboard-activity-list">
          {activities.map((activity) => (
            <div className="dashboard-activity-item" key={activity.name}>
              <div className="activity-avatar">
                {activity.name.charAt(0)}
              </div>

              <div className="activity-details">
                <h4>{activity.name}</h4>
                <p>{activity.action}</p>
                <span>{activity.time}</span>
              </div>

              <span
                className={`activity-status status-${activity.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
