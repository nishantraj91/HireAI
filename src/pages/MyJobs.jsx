import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaTools,
  FaTrash,
  FaPlus,
  FaBriefcase,
} from "react-icons/fa";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const recruiterId = localStorage.getItem("userId");
      const response = await API.get(`/jobs/recruiter/${recruiterId}`);
      setJobs(response.data);
    } catch (error) {
      toast.error("Failed to load jobs!");
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      setDeletingId(jobId);
      await API.delete(`/jobs/${jobId}`);
      toast.success("Job deleted successfully!");
      setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (error) {
      toast.error("Failed to delete job!");
    } finally {
      setDeletingId(null);
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
        <p className="mt-3" style={{ color: "#94a3b8" }}>Loading your jobs...</p>
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
          <div className="d-flex justify-content-between align-items-center">
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
                <FaBriefcase size={28} color="white" />
              </div>
              <div>
                <h1 className="fw-bold text-white mb-1" style={{ fontSize: "2rem" }}>
                  My Posted Jobs
                </h1>
                <p style={{ color: "#93c5fd", marginBottom: 0 }}>
                  {jobs.length} job{jobs.length !== 1 ? "s" : ""} posted
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/post-job")}
              style={{
                padding: "12px 24px",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                border: "none",
                borderRadius: "12px",
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaPlus size={14} />
              Post New Job
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "-40px", paddingBottom: "60px" }}>

        {jobs.length === 0 ? (
          <div
            className="text-center py-5"
            style={{
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
              padding: "60px",
            }}
          >
            <div
              className="d-inline-flex align-items-center justify-content-center mb-4"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                background: "#eff6ff",
              }}
            >
              <FaBriefcase size={36} color="#2563eb" />
            </div>
            <h4 className="fw-bold mb-2" style={{ color: "#0f172a" }}>
              No Jobs Posted Yet
            </h4>
            <p className="text-muted mb-4">
              Start hiring by posting your first job listing
            </p>
            <button
              onClick={() => navigate("/post-job")}
              style={{
                padding: "12px 32px",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                border: "none",
                borderRadius: "12px",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="row">
            {jobs.map((job) => (
              <div className="col-md-4 mb-4" key={job.id}>
                <div
                  style={{
                    background: "white",
                    borderRadius: "20px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    transition: "transform 0.2s, box-shadow 0.2s",
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
                      height: "6px",
                      background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                    }}
                  />

                  <div style={{ padding: "24px", flex: 1 }}>

                    <h5 className="fw-bold mb-2" style={{ color: "#0f172a" }}>
                      {job.title}
                    </h5>

                    <div className="mb-3">
                      <span
                        style={{
                          background: "#eff6ff",
                          color: "#2563eb",
                          padding: "4px 12px",
                          borderRadius: "50px",
                          fontSize: "13px",
                          fontWeight: "600",
                        }}
                      >
                        <FaBuilding className="me-1" size={11} />
                        {job.company}
                      </span>
                    </div>

                    <hr style={{ borderColor: "#f1f5f9" }} />

                    <div className="d-flex flex-column gap-2 mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <FaMapMarkerAlt size={13} color="#ef4444" />
                        <span style={{ fontSize: "14px", color: "#475569" }}>
                          {job.location}
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <FaRupeeSign size={13} color="#22c55e" />
                        <span style={{ fontSize: "14px", color: "#475569" }}>
                          {Number(job.salary).toLocaleString("en-IN")} / year
                        </span>
                      </div>
                      <div className="d-flex align-items-start gap-2">
                        <FaTools size={13} color="#f59e0b" style={{ marginTop: "3px" }} />
                        <span style={{ fontSize: "14px", color: "#475569" }}>
                          {job.skillsRequired}
                        </span>
                      </div>
                    </div>

                    <p
                      style={{
                        fontSize: "13px",
                        color: "#94a3b8",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        marginBottom: 0,
                      }}
                    >
                      {job.description}
                    </p>

                  </div>

                  {/* Delete Button */}
                  <div
                    style={{
                      padding: "16px 24px",
                      borderTop: "1px solid #f1f5f9",
                    }}
                  >
                    <button
                      onClick={() => deleteJob(job.id)}
                      disabled={deletingId === job.id}
                      style={{
                        width: "100%",
                        padding: "10px",
                        background: deletingId === job.id
                          ? "#fee2e2"
                          : "linear-gradient(135deg, #dc2626, #b91c1c)",
                        border: "none",
                        borderRadius: "10px",
                        color: deletingId === job.id ? "#dc2626" : "white",
                        fontWeight: "600",
                        fontSize: "14px",
                        cursor: deletingId === job.id ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <FaTrash size={13} />
                      {deletingId === job.id ? "Deleting..." : "Delete Job"}
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default MyJobs;