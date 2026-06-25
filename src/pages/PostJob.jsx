import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaTools,
  FaAlignLeft,
} from "react-icons/fa";

function PostJob() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    skillsRequired: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/jobs", {
        ...job,
        recruiterId: Number(localStorage.getItem("userId")),
      });
      toast.success("Job posted successfully!");
      navigate("/my-jobs");
    } catch (error) {
      toast.error("Failed to post job. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px 12px 42px",
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
    fontSize: "14px",
  };

  const iconStyle = {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#64748b",
    zIndex: 1,
  };

  const handleFocus = (e) => {
    e.target.style.border = "1px solid #3b82f6";
  };

  const handleBlur = (e) => {
    e.target.style.border = "1px solid rgba(255,255,255,0.15)";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "620px" }}>

        {/* Header */}
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
            <FaBriefcase size={32} color="#60a5fa" />
          </div>
          <h2 className="fw-bold text-white mb-1">Post New Job</h2>
          <p style={{ color: "#94a3b8" }}>
            Fill in the details to attract the right candidates
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: "36px",
          }}
        >
          <form onSubmit={handleSubmit}>

            {/* Job Title */}
            <div className="mb-4">
              <label style={labelStyle}>Job Title</label>
              <div className="position-relative">
                <FaBriefcase style={iconStyle} size={14} />
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Senior React Developer"
                  value={job.title}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            {/* Company */}
            <div className="mb-4">
              <label style={labelStyle}>Company Name</label>
              <div className="position-relative">
                <FaBuilding style={iconStyle} size={14} />
                <input
                  type="text"
                  name="company"
                  placeholder="e.g. Google India"
                  value={job.company}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            {/* Location & Salary */}
            <div className="row">
              <div className="col-md-6 mb-4">
                <label style={labelStyle}>Location</label>
                <div className="position-relative">
                  <FaMapMarkerAlt style={iconStyle} size={14} />
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Bangalore, Remote"
                    value={job.location}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <label style={labelStyle}>Salary (₹ per year)</label>
                <div className="position-relative">
                  <FaRupeeSign style={iconStyle} size={14} />
                  <input
                    type="number"
                    name="salary"
                    placeholder="e.g. 800000"
                    value={job.salary}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <label style={labelStyle}>Skills Required</label>
              <div className="position-relative">
                <FaTools style={iconStyle} size={14} />
                <input
                  type="text"
                  name="skillsRequired"
                  placeholder="e.g. React, Java, Spring Boot"
                  value={job.skillsRequired}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <p style={{ color: "#64748b", fontSize: "12px", marginTop: "6px" }}>
                Comma separated skills
              </p>
            </div>

            {/* Description */}
            <div className="mb-4">
              <label style={labelStyle}>Job Description</label>
              <div className="position-relative">
                <FaAlignLeft
                  style={{ ...iconStyle, top: "18px", transform: "none" }}
                  size={14}
                />
                <textarea
                  name="description"
                  placeholder="Describe the role, responsibilities and requirements..."
                  value={job.description}
                  onChange={handleChange}
                  required
                  rows="5"
                  style={{
                    ...inputStyle,
                    resize: "none",
                    paddingTop: "12px",
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
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
                  Posting Job...
                </>
              ) : (
                "Post Job"
              )}
            </button>

          </form>
        </div>

        {/* Credit */}
        <p className="text-center mt-4 mb-0" style={{ color: "#475569", fontSize: "13px" }}>
          Designed & Developed by{" "}
          <span style={{ color: "#60a5fa" }}>Nishant Raj</span>
        </p>

      </div>
    </div>
  );
}

export default PostJob;