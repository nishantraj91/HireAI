import { Link } from "react-router-dom";
import { FaRobot, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(90deg,#0f172a,#1e293b)",
        color: "#94a3b8",
      }}
      className="mt-5 py-5"
    >
      <div className="container">
        <div className="row">

          {/* Brand Section */}
          <div className="col-md-4 mb-4">
            <h5 className="text-white fw-bold mb-3">
              <FaRobot className="me-2 text-primary" />
              HireAI
            </h5>
            <p className="small">
              Your Career, Powered by AI. Connecting talented
              candidates with top recruiters using smart AI matching.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-white-50 fs-5">
                <FaGithub />
              </a>
              <a href="#" className="text-white-50 fs-5">
                <FaLinkedin />
              </a>
              <a href="#" className="text-white-50 fs-5">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h6 className="text-white fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white-50 text-decoration-none small">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/jobs" className="text-white-50 text-decoration-none small">
                  Browse Jobs
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="text-white-50 text-decoration-none small">
                  Register
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="text-white-50 text-decoration-none small">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* For Candidates */}
          <div className="col-md-3 mb-4">
            <h6 className="text-white fw-bold mb-3">For Candidates</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/jobs" className="text-white-50 text-decoration-none small">
                  Search Jobs
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/resume-upload" className="text-white-50 text-decoration-none small">
                  Upload Resume
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/applied-jobs" className="text-white-50 text-decoration-none small">
                  My Applications
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/candidate-dashboard" className="text-white-50 text-decoration-none small">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* For Recruiters */}
          <div className="col-md-3 mb-4">
            <h6 className="text-white fw-bold mb-3">For Recruiters</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/post-job" className="text-white-50 text-decoration-none small">
                  Post a Job
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/my-jobs" className="text-white-50 text-decoration-none small">
                  My Jobs
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/candidates" className="text-white-50 text-decoration-none small">
                  Browse Candidates
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/recruiter-dashboard" className="text-white-50 text-decoration-none small">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <hr style={{ borderColor: "#334155" }} />

        <div className="d-flex flex-wrap justify-content-between align-items-center pt-2">
          <p className="small mb-0">
            © 2025 AI Job Portal. All rights reserved.
          </p>
         <p className="small mb-0">
            Designed & Developed by{" "}
            <span className="text-white fw-semibold">Nishant Raj</span>
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;