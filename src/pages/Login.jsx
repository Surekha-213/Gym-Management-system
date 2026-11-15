
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Dumbbell,
  Eye,
  EyeOff,
  ShieldCheck,
  Users,
  Activity,
  BriefcaseBusiness,
  ArrowLeft,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { demoUsers } from "../data/DemoUsers";
import "../styles/auth.css";

const roles = [
  { name: "Owner / Super Admin", icon: ShieldCheck },
  { name: "Branch Manager", icon: BriefcaseBusiness },
  { name: "Front Desk", icon: Users },
  { name: "Trainer", icon: Dumbbell },
  { name: "Accounts", icon: Activity },
  { name: "System Support", icon: ShieldCheck },
];

const normalizeText = (value) =>
  String(value ?? "").trim().toLowerCase();

function Login() {
  const [selectedRole, setSelectedRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  // Forgot Password states
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!selectedRole) {
      setError("Please select your role");
      return;
    }

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password");
      return;
    }

    const enteredUsername = normalizeText(username);
    const enteredPassword = password.trim();
    const enteredRole = normalizeText(selectedRole);

    const matchedUser = demoUsers.find((user) => {
      return (
        normalizeText(user.username) === enteredUsername &&
        String(user.password ?? "").trim() === enteredPassword &&
        normalizeText(user.role) === enteredRole
      );
    });

    if (!matchedUser) {
      setError("Invalid username, password or selected role");
      return;
    }

    // Remember Me controls localStorage or sessionStorage
    login(matchedUser, rememberMe);

    navigate("/dashboard");
  };

  // FORGOT PASSWORD
  const handleForgotPassword = (e) => {
    e.preventDefault();

    setResetMessage(
      "Password recovery is not connected yet. Backend integration is required to send a secure reset link."
    );
  };

  // OPEN FORGOT PASSWORD
  const openForgotPassword = () => {
    setShowForgotPassword(true);
    setResetEmail("");
    setResetMessage("");
    setError("");
  };

  // BACK TO LOGIN
  const backToLogin = () => {
    setShowForgotPassword(false);
    setResetEmail("");
    setResetMessage("");
  };

  return (
    <div className="login-container">

      {/* LEFT SECTION */}
      <section className="login-left">

        <div className="gym-brand">
          <div className="brand-icon">
            <Dumbbell size={27} />
          </div>

          <span>
            FIT<span className="brand-highlight">ZONE</span>
          </span>
        </div>

        <div className="left-content">
          <span className="welcome-label">
            WELCOME TO FITZONE
          </span>

          <h1>
            Manage Your Gym.
            <br />
            Build a <span>Stronger</span>
            <br />
            Community.
          </h1>

          <p>
            A smarter way to manage members, memberships,
            trainers and daily gym operations — all in one place.
          </p>

          <div className="gym-features">
            <div>
              <Users size={20} />
              <span>Member Management</span>
            </div>

            <div>
              <Activity size={20} />
              <span>Track Gym Activities</span>
            </div>

            <div>
              <ShieldCheck size={20} />
              <span>Secure Role-Based Access</span>
            </div>
          </div>
        </div>

        <div className="left-footer">
          <span>YOUR FITNESS BUSINESS, SIMPLIFIED.</span>
          <span>© 2026 FITZONE</span>
        </div>

      </section>

      {/* RIGHT SECTION */}
      <section className="login-right">

        <div className="login-form-wrapper">

          {/* MOBILE BRAND */}
          <div className="mobile-brand">
            <Dumbbell size={25} />
            <span>FITZONE</span>
          </div>

          {showForgotPassword ? (

            /* FORGOT PASSWORD SCREEN */
            <>
              <div className="login-heading">
                <h2>Forgot Password?</h2>

                <p>
                  Enter your registered email address to request
                  password recovery.
                </p>
              </div>

              <form onSubmit={handleForgotPassword}>

                <label className="form-label">
                  Email Address
                </label>

                <input
                  className="login-input"
                  type="email"
                  placeholder="Enter your registered email"
                  value={resetEmail}
                  onChange={(e) => {
                    setResetEmail(e.target.value);
                    setResetMessage("");
                  }}
                  required
                />

                {resetMessage && (
                  <p className="forgot-message" aria-live="polite">
                    {resetMessage}
                  </p>
                )}

                <button type="submit" className="login-submit">
                  Submit Request
                </button>

              </form>

              <button
                type="button"
                className="back-to-login"
                onClick={backToLogin}
              >
                <ArrowLeft size={16} />
                Back to Sign In
              </button>
            </>

          ) : (

            /* LOGIN SCREEN */
            <>
              <div className="login-heading">
                <h2>Welcome Back!</h2>

                <p>
                  Please select your role and sign in to continue.
                </p>
              </div>

              <form onSubmit={handleLogin}>

                {/* ROLE SELECTION */}
                <label className="form-label">
                  Select Your Role
                </label>

                <div className="role-grid">
                  {roles.map((role) => {
                    const Icon = role.icon;

                    return (
                      <button
                        type="button"
                        key={role.name}
                        className={`role-option ${
                          selectedRole === role.name ? "selected" : ""
                        }`}
                        onClick={() => {
                          setSelectedRole(role.name);
                          setError("");
                        }}
                      >
                        <Icon size={19} />
                        <span>{role.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* USERNAME */}
                <label className="form-label">
                  Username
                </label>

                <input
                  className="login-input"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  required
                />

                {/* PASSWORD */}
                <label className="form-label">
                  Password
                </label>

                <div className="password-wrapper">
                  <input
                    className="login-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {/* REMEMBER ME AND FORGOT PASSWORD */}
                <div className="login-options">

                  <label className="remember-me">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember Me</span>
                  </label>

                  <button
                    type="button"
                    className="forgot-link"
                    onClick={openForgotPassword}
                  >
                    Forgot Password?
                  </button>

                </div>

                {/* ERROR MESSAGE */}
                {error && (
                  <p className="login-error">
                    {error}
                  </p>
                )}

                {/* SIGN IN */}
                <button type="submit" className="login-submit">
                  Sign In
                </button>

              </form>

              {/* REGISTRATION MESSAGE */}
              <div className="login-register-note">
                Don't have a gym account?
                <br />
                <span>
                  Contact your gym's Front Desk to register.
                </span>
              </div>

            </>
          )}

          {/* BOTTOM MESSAGE */}
          <div className="login-bottom">
            <ShieldCheck size={16} />
            <span>
              Secure access to your gym management system
            </span>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Login;
