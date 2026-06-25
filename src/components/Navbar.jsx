import { Link, useLocation } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const role = localStorage.getItem("role");

  const isActive = (path) =>
    location.pathname === path
      ? "nav-link fw-semibold active"
      : "nav-link fw-semibold";

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{
        background: "linear-gradient(90deg,#0f172a,#1e293b)",
      }}
    >
      <div className="container">

        <Link className="navbar-brand fw-bold fs-4" to="/">
          <FaRobot className="me-2" />
          HireAI
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto align-items-center">

            <Link className={isActive("/")} to="/">
              Home
            </Link>

            <Link className={isActive("/jobs")} to="/jobs">
              Jobs
            </Link>

           {/* CANDIDATE links */}
            {role === "CANDIDATE" && (
              <>
                <Link className={isActive("/applied-jobs")} to="/applied-jobs">
                  Applications
                </Link>
                <Link className={isActive("/candidate-dashboard")} to="/candidate-dashboard">
                  Dashboard
                </Link>
                <Link className={isActive("/resume-upload")} to="/resume-upload">
                  Resume
                </Link>
                <Link className={isActive("/profile")} to="/profile">
                  Profile
                </Link>
              </>
            )}

            {/* RECRUITER links */}
            {role === "RECRUITER" && (
              <>
                <Link className={isActive("/post-job")} to="/post-job">
                  Post Job
                </Link>
                <Link className={isActive("/my-jobs")} to="/my-jobs">
                  My Jobs
                </Link>
                <Link className={isActive("/recruiter-dashboard")} to="/recruiter-dashboard">
                  Dashboard
                </Link>
                <Link className={isActive("/candidates")} to="/candidates">
                  Candidates
                </Link>
              </>
            )}

            {/* Logout — sirf tab dikhao jab login ho */}
            {role && (
              <button
                className="btn btn-danger ms-3"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            )}

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;