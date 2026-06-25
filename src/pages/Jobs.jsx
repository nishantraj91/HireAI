import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaRupeeSign,
  FaTools,
  FaBuilding,
  FaRobot,
  FaTimes,
} from "react-icons/fa";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [matchingId, setMatchingId] = useState(null);
  const [search, setSearch] = useState("");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await API.get("/jobs");
      setJobs(response.data);
    } catch (error) {
      toast.error("Failed to load jobs!");
    } finally {
      setLoading(false);
    }
  };

  const applyJob = async (jobId) => {
    try {
      setApplyingId(jobId);
      const userId = localStorage.getItem("userId");
      await API.post("/applications/apply", {
        userId: Number(userId),
        jobId: jobId,
        status: "APPLIED",
      });
      toast.success("Applied successfully!");
    } catch (error) {
      toast.error("Failed to apply. Try again!");
    } finally {
      setApplyingId(null);
    }
  };

  const checkAiMatch = async (jobId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please login first!");
      return;
    }
    try {
      setMatchingId(jobId);
      const response = await API.get(`/ai/match/${userId}/${jobId}`);
      setMatchData(response.data);
    } catch (error) {
      toast.error("Failed to get AI match score!");
    } finally {
      setMatchingId(null);
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()) ||
      job.skillsRequired.toLowerCase().includes(search.toLowerCase())
  );

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
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3" style={{ color: "#94a3b8" }}>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>

      {/* Hero Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)",
          padding: "60px 0 80px",
        }}
      >
        <div className="container text-center">
          <h1 className="fw-bold text-white mb-3" style={{ fontSize: "2.8rem" }}>
            Explore Career Opportunities
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem" }} className="mb-4">
            Find the best jobs matching your skills — {jobs.length} jobs available
          </p>

          {/* Search Bar */}
          <div
            className="mx-auto"
            style={{ maxWidth: "560px", position: "relative" }}
          >
            <input
              type="text"
              placeholder="Search by title, company, location or skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "16px 24px",
                borderRadius: "50px",
                border: "none",
                fontSize: "15px",
                outline: "none",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                color: "white",
                boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
              }}
            />
            {search && (
              <FaTimes
                onClick={() => setSearch("")}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94a3b8",
                  cursor: "pointer",
                }}
              />
            )}
          </div>

        </div>
      </div>

      {/* Jobs Grid */}
      <div className="container" style={{ marginTop: "-40px", paddingBottom: "60px" }}>

        {filteredJobs.length === 0 ? (
          <div className="text-center mt-5 py-5">
            <FaRobot size={48} className="text-muted mb-3" />
            <p className="text-muted fs-5">No jobs found matching your search.</p>
            <button
              className="btn btn-outline-primary mt-2"
              onClick={() => setSearch("")}
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="row">
            {filteredJobs.map((job) => (
              <div className="col-lg-4 col-md-6 mb-4" key={job.id}>
                <div
                  style={{
                    background: "white",
                    borderRadius: "20px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    overflow: "hidden",
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
                  {/* Card Top Bar */}
                  <div
                    style={{
                      height: "6px",
                      background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                    }}
                  />

                  <div style={{ padding: "24px", flex: 1 }}>

                    {/* Title & Company */}
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="fw-bold mb-0" style={{ color: "#0f172a" }}>
                        {job.title}
                      </h5>
                    </div>

                    <div className="d-flex align-items-center gap-2 mb-3">
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

                    {/* Details */}
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
                      }}
                    >
                      {job.description}
                    </p>

                  </div>

                  {/* Buttons */}
                  {role === "CANDIDATE" && (
                    <div
                      style={{
                        padding: "16px 24px",
                        borderTop: "1px solid #f1f5f9",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <button
                        onClick={() => applyJob(job.id)}
                        disabled={applyingId === job.id}
                        style={{
                          width: "100%",
                          padding: "10px",
                          background: applyingId === job.id
                            ? "#dcfce7"
                            : "linear-gradient(135deg, #16a34a, #15803d)",
                          border: "none",
                          borderRadius: "10px",
                          color: applyingId === job.id ? "#16a34a" : "white",
                          fontWeight: "600",
                          fontSize: "14px",
                          cursor: applyingId === job.id ? "not-allowed" : "pointer",
                        }}
                      >
                        {applyingId === job.id ? "Applying..." : "Apply Now"}
                      </button>

                      <button
                        onClick={() => checkAiMatch(job.id)}
                        disabled={matchingId === job.id}
                        style={{
                          width: "100%",
                          padding: "10px",
                          background: "transparent",
                          border: "1.5px solid #2563eb",
                          borderRadius: "10px",
                          color: "#2563eb",
                          fontWeight: "600",
                          fontSize: "14px",
                          cursor: matchingId === job.id ? "not-allowed" : "pointer",
                        }}
                      >
                        {matchingId === job.id ? "Checking..." : "🤖 Check AI Match"}
                      </button>
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* AI Match Modal */}
      {matchData && (
        <div
          onClick={() => setMatchData(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "32px",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
            }}
          >
            <div className="text-center mb-4">
              <div
                className="d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "18px",
                  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                }}
              >
                <FaRobot size={28} color="white" />
              </div>
              <h4 className="fw-bold mb-1">AI Match Score</h4>
              <p className="text-muted mb-0" style={{ fontSize: "14px" }}>
                {matchData.jobTitle} — {matchData.company}
              </p>
            </div>

            {/* Score Circle */}
            <div
              className="text-center py-4 mb-4"
              style={{
                background: matchData.matchScore >= 70
                  ? "#f0fdf4"
                  : matchData.matchScore >= 40
                  ? "#fefce8"
                  : "#fef2f2",
                borderRadius: "16px",
              }}
            >
              <h1
                className="fw-bold mb-1"
                style={{
                  fontSize: "4rem",
                  color: matchData.matchScore >= 70
                    ? "#16a34a"
                    : matchData.matchScore >= 40
                    ? "#ca8a04"
                    : "#dc2626",
                }}
              >
                {matchData.matchScore}%
              </h1>
              <p
                className="fw-semibold mb-0"
                style={{
                  color: matchData.matchScore >= 70
                    ? "#16a34a"
                    : matchData.matchScore >= 40
                    ? "#ca8a04"
                    : "#dc2626",
                }}
              >
                {matchData.matchScore >= 70
                  ? "Great Match! 🎉"
                  : matchData.matchScore >= 40
                  ? "Average Match 👍"
                  : "Low Match 😕"}
              </p>
            </div>

            {/* Matched Skills */}
            {matchData.matchedSkills?.length > 0 && (
              <div className="mb-4">
                <p className="fw-semibold mb-2" style={{ fontSize: "14px" }}>
                  Matched Skills:
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {matchData.matchedSkills.map((skill, i) => (
                    <span
                      key={i}
                      style={{
                        background: "#dcfce7",
                        color: "#16a34a",
                        padding: "4px 12px",
                        borderRadius: "50px",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setMatchData(null)}
              style={{
                width: "100%",
                padding: "12px",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                border: "none",
                borderRadius: "12px",
                color: "white",
                fontWeight: "600",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default Jobs;