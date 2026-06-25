import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import {
  FaBriefcase,
  FaFileAlt,
  FaRobot,
  FaSearch,
  FaUpload,
  FaUser,
} from "react-icons/fa";

function CandidateDashboard() {
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");

  const [jobCount, setJobCount] = useState(0);
  const [appliedCount, setAppliedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const dashboardResponse = await API.get(`/candidate/dashboard/${userId}`);
      setAppliedCount(dashboardResponse.data.length);
      const jobsResponse = await API.get("/jobs");
      setJobCount(jobsResponse.data.length);
    } catch (error) {
      toast.error("Failed to load dashboard data!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div className="spinner-border text-primary" />
        <p className="mt-3" style={{ color: "#94a3b8" }}>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>

      {/* Hero Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #2563eb 50%, #7c3aed 100%)",
          padding: "50px 0 80px",
        }}
      >
        <div className="container">
          <div className="d-flex align-items-center gap-4">
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "20px",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FaUser size={32} color="white" />
            </div>
            <div>
              <p style={{ color: "#93c5fd", marginBottom: "4px", fontSize: "14px" }}>
                Welcome back
              </p>
              <h1 className="fw-bold text-white mb-1" style={{ fontSize: "2rem" }}>
                {username || "Candidate"} 👋
              </h1>
              <p style={{ color: "#bfdbfe", marginBottom: 0 }}>
                HireAI — Candidate Dashboard
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "-40px", paddingBottom: "60px" }}>

        {/* Stats Cards */}
        <div className="row mb-4">

          <div className="col-md-4 mb-4">
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                borderTop: "4px solid #2563eb",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "4px" }}>
                    Available Jobs
                  </p>
                  <h2 className="fw-bold mb-0" style={{ color: "#0f172a" }}>
                    {jobCount}
                  </h2>
                </div>
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: "#eff6ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaBriefcase size={22} color="#2563eb" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                borderTop: "4px solid #16a34a",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "4px" }}>
                    Applied Jobs
                  </p>
                  <h2 className="fw-bold mb-0" style={{ color: "#0f172a" }}>
                    {appliedCount}
                  </h2>
                </div>
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: "#f0fdf4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaFileAlt size={22} color="#16a34a" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div
              style={{
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 4px 24px rgba(37,99,235,0.3)",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p style={{ color: "#bfdbfe", fontSize: "14px", marginBottom: "4px" }}>
                    AI Matching
                  </p>
                  <h2 className="fw-bold mb-0 text-white">Active</h2>
                </div>
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaRobot size={22} color="white" />
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="row">

          {/* Quick Actions */}
          <div className="col-md-6 mb-4">
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                height: "100%",
              }}
            >
              <h5 className="fw-bold mb-4" style={{ color: "#0f172a" }}>
                Quick Actions
              </h5>

              <div className="d-flex flex-column gap-3">

                <Link
                  to="/jobs"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 18px",
                    borderRadius: "14px",
                    background: "#eff6ff",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#dbeafe"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#eff6ff"}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "#2563eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <FaSearch size={16} color="white" />
                  </div>
                  <div>
                    <p className="fw-semibold mb-0" style={{ color: "#0f172a" }}>
                      Browse Jobs
                    </p>
                    <p style={{ color: "#64748b", fontSize: "12px", marginBottom: 0 }}>
                      Find your perfect job
                    </p>
                  </div>
                </Link>

                <Link
                  to="/applied-jobs"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 18px",
                    borderRadius: "14px",
                    background: "#f0fdf4",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#dcfce7"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#f0fdf4"}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "#16a34a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <FaFileAlt size={16} color="white" />
                  </div>
                  <div>
                    <p className="fw-semibold mb-0" style={{ color: "#0f172a" }}>
                      My Applications
                    </p>
                    <p style={{ color: "#64748b", fontSize: "12px", marginBottom: 0 }}>
                      Track your applications
                    </p>
                  </div>
                </Link>

                <Link
                  to="/resume-upload"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 18px",
                    borderRadius: "14px",
                    background: "#fefce8",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#fef9c3"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#fefce8"}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "#ca8a04",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <FaUpload size={16} color="white" />
                  </div>
                  <div>
                    <p className="fw-semibold mb-0" style={{ color: "#0f172a" }}>
                      Upload Resume
                    </p>
                    <p style={{ color: "#64748b", fontSize: "12px", marginBottom: 0 }}>
                      Keep your resume updated
                    </p>
                  </div>
                </Link>

                <Link
                  to="/profile"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 18px",
                    borderRadius: "14px",
                    background: "#fdf4ff",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#f3e8ff"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#fdf4ff"}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "#7c3aed",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <FaUser size={16} color="white" />
                  </div>
                  <div>
                    <p className="fw-semibold mb-0" style={{ color: "#0f172a" }}>
                      My Profile
                    </p>
                    <p style={{ color: "#64748b", fontSize: "12px", marginBottom: 0 }}>
                      Update skills for AI matching
                    </p>
                  </div>
                </Link>

              </div>
            </div>
          </div>

          {/* AI Tips Card */}
          <div className="col-md-6 mb-4">
            <div
              style={{
                background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
                borderRadius: "20px",
                padding: "28px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                height: "100%",
              }}
            >
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "rgba(37,99,235,0.3)",
                    border: "1px solid rgba(37,99,235,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaRobot size={20} color="#60a5fa" />
                </div>
                <h5 className="fw-bold mb-0 text-white">AI Tips for You</h5>
              </div>

              <div className="d-flex flex-column gap-3">
                {[
                  {
                    tip: "Complete your profile to get better AI job matches",
                    color: "#3b82f6",
                  },
                  {
                    tip: "Add more skills to increase your match score",
                    color: "#8b5cf6",
                  },
                  {
                    tip: "Upload your latest resume for better visibility",
                    color: "#06b6d4",
                  },
                  {
                    tip: "Check AI Match before applying to any job",
                    color: "#10b981",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      padding: "12px 16px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: item.color,
                        flexShrink: 0,
                        marginTop: "6px",
                      }}
                    />
                    <p style={{ color: "#cbd5e1", fontSize: "14px", marginBottom: 0 }}>
                      {item.tip}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;