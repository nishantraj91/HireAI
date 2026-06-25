import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaUsers, FaEnvelope, FaBuilding, FaEye, FaChevronRight } from "react-icons/fa";

function Candidates() {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [candidatesLoading, setCandidatesLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const response = await API.get(`/jobs/recruiter/${userId}`);
      setJobs(response.data);
    } catch (error) {
      toast.error("Failed to load jobs!");
    } finally {
      setLoading(false);
    }
  };

  const fetchCandidates = async (jobId, jobTitle) => {
    try {
      setCandidatesLoading(true);
      setSelectedJob(jobTitle);
      setSelectedJobId(jobId);
      const response = await API.get(`/recruiter/candidates/${jobId}`);
      setCandidates(response.data);
    } catch (error) {
      toast.error("Failed to load candidates!");
    } finally {
      setCandidatesLoading(false);
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
              <FaUsers size={28} color="white" />
            </div>
            <div>
              <h1 className="fw-bold text-white mb-1" style={{ fontSize: "2rem" }}>
                Candidates
              </h1>
              <p style={{ color: "#93c5fd", marginBottom: 0 }}>
                Select a job to view its applicants
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: "-40px", paddingBottom: "60px" }}>
        <div className="row">

          {/* Jobs List */}
          <div className="col-md-4 mb-4">
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "20px 24px",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <h5 className="fw-bold mb-0" style={{ color: "#0f172a" }}>
                  My Jobs
                </h5>
                <p style={{ color: "#64748b", fontSize: "13px", marginBottom: 0 }}>
                  {jobs.length} job{jobs.length !== 1 ? "s" : ""} posted
                </p>
              </div>

              {jobs.length === 0 ? (
                <div className="text-center py-5 px-4">
                  <FaBuilding size={36} color="#cbd5e1" className="mb-3" />
                  <p className="text-muted mb-0">No jobs posted yet.</p>
                </div>
              ) : (
                <div style={{ padding: "12px" }}>
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => fetchCandidates(job.id, job.title)}
                      style={{
                        padding: "14px 16px",
                        borderRadius: "14px",
                        cursor: "pointer",
                        background: selectedJobId === job.id
                          ? "linear-gradient(135deg, #2563eb, #7c3aed)"
                          : "transparent",
                        marginBottom: "4px",
                        transition: "all 0.2s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedJobId !== job.id)
                          e.currentTarget.style.background = "#f8fafc";
                      }}
                      onMouseLeave={(e) => {
                        if (selectedJobId !== job.id)
                          e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div>
                        <p
                          className="fw-semibold mb-1"
                          style={{
                            color: selectedJobId === job.id ? "white" : "#0f172a",
                            fontSize: "14px",
                          }}
                        >
                          {job.title}
                        </p>
                        <p
                          style={{
                            color: selectedJobId === job.id ? "rgba(255,255,255,0.7)" : "#64748b",
                            fontSize: "12px",
                            marginBottom: 0,
                          }}
                        >
                          <FaBuilding className="me-1" size={10} />
                          {job.company}
                        </p>
                      </div>
                      <FaChevronRight
                        size={12}
                        color={selectedJobId === job.id ? "white" : "#cbd5e1"}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Candidates List */}
          <div className="col-md-8">
            {selectedJob ? (
              <>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    <h5 className="fw-bold mb-1" style={{ color: "#0f172a" }}>
                      {selectedJob}
                    </h5>
                    <p style={{ color: "#64748b", fontSize: "13px", marginBottom: 0 }}>
                      {candidates.length} candidate{candidates.length !== 1 ? "s" : ""} applied
                    </p>
                  </div>
                </div>

                {candidatesLoading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" />
                    <p className="mt-3 text-muted">Loading candidates...</p>
                  </div>
                ) : candidates.length === 0 ? (
                  <div
                    className="text-center py-5"
                    style={{
                      background: "white",
                      borderRadius: "20px",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    }}
                  >
                    <FaUsers size={48} color="#cbd5e1" className="mb-3" />
                    <p className="text-muted fs-5 mb-0">
                      No candidates applied yet.
                    </p>
                  </div>
                ) : (
                  <div className="row">
                    {candidates.map((candidate) => {
                      const statusStyle = getStatusStyle(candidate.status);
                      return (
                        <div className="col-md-6 mb-3" key={candidate.applicationId}>
                          <div
                            style={{
                              background: "white",
                              borderRadius: "18px",
                              boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
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
                            {/* Top Bar */}
                            <div
                              style={{
                                height: "5px",
                                background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                              }}
                            />

                            <div style={{ padding: "20px" }}>

                              <div className="d-flex justify-content-between align-items-start mb-3">
                                <div
                                  style={{
                                    width: "46px",
                                    height: "46px",
                                    borderRadius: "14px",
                                    background: "#eff6ff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <FaUsers size={18} color="#2563eb" />
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
                                  {candidate.status}
                                </span>
                              </div>

                              <p className="fw-bold mb-1" style={{ color: "#0f172a" }}>
                                Candidate #{candidate.candidateId}
                              </p>

                              <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "16px" }}>
                                <FaEnvelope size={11} className="me-2" />
                                {candidate.candidateEmail}
                              </p>

                              <button
                                onClick={() =>
                                  window.open(
                                    `http://localhost:8080/api/resume/resume-by-user/${candidate.candidateId}`,
                                    "_blank"
                                  )
                                }
                                style={{
                                  width: "100%",
                                  padding: "9px",
                                  background: "transparent",
                                  border: "1.5px solid #2563eb",
                                  borderRadius: "10px",
                                  color: "#2563eb",
                                  fontWeight: "600",
                                  fontSize: "13px",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  gap: "8px",
                                }}
                              >
                                <FaEye size={13} />
                                View Resume
                              </button>

                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
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
                  <FaUsers size={36} color="#2563eb" />
                </div>
                <h5 className="fw-bold mb-2" style={{ color: "#0f172a" }}>
                  Select a Job
                </h5>
                <p className="text-muted mb-0">
                  Click on a job from the left panel to view its candidates
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Candidates;