import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaRobot, FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("username", response.data.fullName);
      toast.success("Login successful!");

      if (response.data.role === "CANDIDATE") {
        navigate("/candidate-dashboard");
      } else if (response.data.role === "RECRUITER") {
        navigate("/recruiter-dashboard");
      }
    } catch (error) {
      toast.error("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)",
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
          <h2 className="fw-bold text-white mb-1">Welcome Back</h2>
          <p style={{ color: "#94a3b8" }}>Sign in to your HireAI account</p>
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
            {/* Email */}
            <div className="mb-4">
              <label
                className="form-label fw-semibold"
                style={{ color: "#e2e8f0" }}
              >
                Email Address
              </label>
              <div className="position-relative">
                <FaEnvelope
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#64748b",
                    zIndex: 1,
                  }}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 40px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    color: "#f1f5f9",
                    fontSize: "15px",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.target.style.border = "1px solid #3b82f6")}
                  onBlur={(e) =>
                    (e.target.style.border = "1px solid rgba(255,255,255,0.15)")
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                className="form-label fw-semibold"
                style={{ color: "#e2e8f0" }}
              >
                Password
              </label>
              <div className="position-relative">
                <FaLock
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#64748b",
                    zIndex: 1,
                  }}
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 40px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    color: "#f1f5f9",
                    fontSize: "15px",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.target.style.border = "1px solid #3b82f6")}
                  onBlur={(e) =>
                    (e.target.style.border = "1px solid rgba(255,255,255,0.15)")
                  }
                />
              </div>
            </div>

            {/* Login Button */}
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
                  Logging in...
                </>
              ) : (
                "Sign In"
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

          {/* Register Link */}
          <p className="text-center mb-0" style={{ color: "#94a3b8" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#60a5fa",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Bottom Text */}
        <p
          className="text-center mt-4 mb-0"
          style={{ color: "#475569", fontSize: "13px" }}
        >
          Designed & Developed by{" "}
          <span style={{ color: "#60a5fa" }}>Nishant Raj</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
