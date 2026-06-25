import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaFileAlt } from "react-icons/fa";

function AppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await API.get(`/applications/user/${userId}`);
      setApplications(response.data);
    } catch (error) {
      toast.error("Failed to load applications!");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "APPLIED":
        return { background: "rgba(37,99,235,0.15)", color: "#60a5fa", border: "rgba(37,99,235,0.3)" };
      case "SELECTED":
        return { background: "rgba(16,185,129,0.15)", color: "#34d399", border: "rgba(16,185,129,0.3)" };
      case "REJECTED":
        return { background: "rgba(239,68,68,0.15)", color: "#f87171", border: "rgba(239,68,68,0.3)" };
      case "INTERVIEW":
        return { background: "rgba(245,158,11,0.15)", color: "#fbbf24", border: "rgba(245,158,11,0.3)" };
      default:
        return { background: "rgba(100,116,139,0.15)", color: "#94a3b8", border: "rgba(100,116,139,0.3)" };
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
        <p className="mt-3" style={{ color: "#94a3b8" }}>Loading applications...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>

      {/* Hero Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)",
          padding: "50px 0 80px",
        }}
      >
        <div className="container">
          <div className="d-flex align-items-center gap-4">
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FaFileAlt size={28} color="white" />
            </div>
            <div>
              <h1 className="fw-bold text-white mb-1" style={{ fontSize: "2rem" }}>
                My Applications
              </h1>
              <p style={{ color: "#93c5fd", marginBottom: 0 }}>
                {applications.length} application{applications.length !== 1 ? "s" : ""} tracked
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "-40px", paddingBottom: "60px" }}>

        {applications.length === 0 ? (
          <div
            className="text-center py-5"
            style={{
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              padding: "80px 40px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                background: "#eff6ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <FaBriefcase size={36} color="#2563eb" />
            </div>
            <h5 className="fw-bold mb-2" style={{ color: "#0f172a" }}>
              No Applications Yet
            </h5>
            <p className="text-muted mb-4">
              Browse jobs and apply to start tracking your applications
            </p>
            <Link
              to="/jobs"
              style={{
                padding: "12px 32px",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                borderRadius: "12px",
                color: "white",
                fontWeight: "600",
                textDecoration: "none",
                fontSize: "15px",
              }}
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="row">
            {applications.map((app) => {
              const statusStyle = getStatusStyle(app.status);
              return (
                <div className="col-md-4 mb-4" key={app.id}>
                  <div
                    style={{
                      background: "white",
                      borderRadius: "20px",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                      height: "100%",
                      overflow: "hidden",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)";
                    }}
                  >
                    {/* Top Color Bar */}
                    <div
                      style={{
                        height: "5px",
                        background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                      }}
                    />

                    <div style={{ padding: "24px", flex: 1 }}>

                      {/* Icon & Status */}
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "14px",
                            background: "#eff6ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FaBriefcase size={20} color="#2563eb" />
                        </div>
                        <span
                          style={{
                            background: statusStyle.background,
                            color: statusStyle.color,
                            border: `1px solid ${statusStyle.border}`,
                            padding: "4px 12px",
                            borderRadius: "50px",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          {app.status}
                        </span>
                      </div>

                      {/* Job Title */}
                      <h5 className="fw-bold mb-2" style={{ color: "#0f172a" }}>
                        {app.jobTitle || `Job #${app.jobId}`}
                      </h5>

                      {/* Company */}
                      {app.company && (
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <FaBuilding size={13} color="#64748b" />
                          <span style={{ color: "#64748b", fontSize: "14px" }}>
                            {app.company}
                          </span>
                        </div>
                      )}

                      {/* Location */}
                      {app.location && (
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <FaMapMarkerAlt size={13} color="#ef4444" />
                          <span style={{ color: "#64748b", fontSize: "14px" }}>
                            {app.location}
                          </span>
                        </div>
                      )}

                    </div>

                    {/* Bottom Status Bar */}
                    <div
                      style={{
                        padding: "12px 24px",
                        borderTop: "1px solid #f1f5f9",
                        background: statusStyle.background,
                      }}
                    >
                      <p
                        style={{
                          color: statusStyle.color,
                          fontSize: "13px",
                          fontWeight: "600",
                          marginBottom: 0,
                          textAlign: "center",
                        }}
                      >
                        {app.status === "APPLIED" && "⏳ Application under review"}
                        {app.status === "SELECTED" && "🎉 Congratulations! You're selected"}
                        {app.status === "REJECTED" && "❌ Application not shortlisted"}
                        {app.status === "INTERVIEW" && "📅 Interview scheduled"}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default AppliedJobs;