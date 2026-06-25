import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaRobot, FaUser, FaEnvelope, FaLock, FaBriefcase } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "CANDIDATE",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/auth/register", formData);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Email already exists!");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px 12px 40px",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "12px",
    color: "#f1f5f9",
    fontSize: "15px",
    outline: "none",
  };

  const labelStyle = {
    color: "#e2e8f0",
    fontWeight: "600",
    marginBottom: "6px",
    display: "block",
  };

  const iconStyle = {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#64748b",
    zIndex: 1,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "440px" }}>

        {/* Logo */}
        <div className="text-center mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center mb-3"
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "20px",
              background: "rgba(37, 99, 235, 0.3)",
              border: "1px solid rgba(37, 99, 235, 0.5)",
            }}
          >
            <FaRobot size={32} color="#60a5fa" />
          </div>
          <h2 className="fw-bold text-white mb-1">Create Account</h2>
          <p style={{ color: "#94a3b8" }}>Join HireAI and find your dream job</p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "36px",
          }}
        >
          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="mb-3">
              <label style={labelStyle}>Full Name</label>
              <div className="position-relative">
                <FaUser style={iconStyle} />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  onFocus={(e) => e.target.style.border = "1px solid #3b82f6"}
                  onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.15)"}
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label style={labelStyle}>Email Address</label>
              <div className="position-relative">
                <FaEnvelope style={iconStyle} />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  onFocus={(e) => e.target.style.border = "1px solid #3b82f6"}
                  onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.15)"}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label style={labelStyle}>Password</label>
              <div className="position-relative">
                <FaLock style={iconStyle} />
                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  onFocus={(e) => e.target.style.border = "1px solid #3b82f6"}
                  onBlur={(e) => e.target.style.border = "1px solid rgba(255,255,255,0.15)"}
                />
              </div>
            </div>

            {/* Role */}
            <div className="mb-4">
              <label style={labelStyle}>Register As</label>
              <div className="d-flex gap-3">

                <div
                  onClick={() => setFormData({ ...formData, role: "CANDIDATE" })}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "12px",
                    border: formData.role === "CANDIDATE"
                      ? "2px solid #3b82f6"
                      : "1px solid rgba(255,255,255,0.15)",
                    background: formData.role === "CANDIDATE"
                      ? "rgba(59,130,246,0.2)"
                      : "rgba(255,255,255,0.05)",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s",
                  }}
                >
                  <FaUser
                    size={20}
                    color={formData.role === "CANDIDATE" ? "#60a5fa" : "#64748b"}
                    className="mb-1"
                  />
                  <p
                    className="mb-0 fw-semibold"
                    style={{
                      color: formData.role === "CANDIDATE" ? "#60a5fa" : "#94a3b8",
                      fontSize: "14px",
                    }}
                  >
                    Candidate
                  </p>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, role: "RECRUITER" })}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "12px",
                    border: formData.role === "RECRUITER"
                      ? "2px solid #3b82f6"
                      : "1px solid rgba(255,255,255,0.15)",
                    background: formData.role === "RECRUITER"
                      ? "rgba(59,130,246,0.2)"
                      : "rgba(255,255,255,0.05)",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s",
                  }}
                >
                  <FaBriefcase
                    size={20}
                    color={formData.role === "RECRUITER" ? "#60a5fa" : "#64748b"}
                    className="mb-1"
                  />
                  <p
                    className="mb-0 fw-semibold"
                    style={{
                      color: formData.role === "RECRUITER" ? "#60a5fa" : "#94a3b8",
                      fontSize: "14px",
                    }}
                  >
                    Recruiter
                  </p>
                </div>

              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px",
                background: loading
                  ? "rgba(37,99,235,0.5)"
                  : "linear-gradient(135deg, #2563eb, #7c3aed)",
                border: "none",
                borderRadius: "12px",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
              }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

          </form>

          {/* Divider */}
          <div
            className="text-center my-4"
            style={{ color: "#475569", fontSize: "14px" }}
          >
            ── or ──
          </div>

          {/* Login Link */}
          <p className="text-center mb-0" style={{ color: "#94a3b8" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#60a5fa",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Sign In
            </Link>
          </p>

        </div>

        {/* Bottom Credit */}
        <p className="text-center mt-4 mb-0" style={{ color: "#475569", fontSize: "13px" }}>
          Designed & Developed by{" "}
          <span style={{ color: "#60a5fa" }}>Nishant Raj</span>
        </p>

      </div>
    </div>
  );
}

export default Register;