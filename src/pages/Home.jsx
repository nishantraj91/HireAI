import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaUsers,
  FaFileAlt,
  FaSearch,
  FaUpload,
  FaRobot,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";

function Home() {
  const role = localStorage.getItem("role");

  return (
    <div style={{ background: "#0f172a" }}>

      {/* Hero Section */}
      <div
        className="text-white py-5"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6">
              <span
                className="badge mb-3 px-3 py-2"
                style={{ background: "#1d4ed8", fontSize: "14px" }}
              >
                🤖 AI Powered Platform
              </span>
              <h1
                className="fw-bold mb-4"
                style={{ fontSize: "3.2rem", lineHeight: "1.2" }}
              >
                Your Career,{" "}
                <span style={{ color: "#60a5fa" }}>
                  Powered by AI
                </span>
              </h1>
              <p
                className="mb-4"
                style={{ fontSize: "1.2rem", color: "#94a3b8" }}
              >
                HireAI connects talented candidates with top recruiters
                using smart AI matching. Find your dream job today.
              </p>

              <div className="d-flex flex-wrap gap-3 mb-5">
                <Link to="/jobs" className="btn btn-primary btn-lg px-4">
                  Browse Jobs
                </Link>
                {!role && (
                  <Link to="/register" className="btn btn-outline-light btn-lg px-4">
                    Get Started Free
                  </Link>
                )}
              </div>

              <div className="d-flex flex-wrap gap-4">
                {["Free to use", "AI-powered matching", "Top companies hiring"].map((text) => (
                  <div key={text} className="d-flex align-items-center gap-2">
                    <FaCheckCircle className="text-success" />
                    <span className="small" style={{ color: "#94a3b8" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right AI Card */}
            <div className="col-lg-6 d-none d-lg-flex justify-content-center mt-4 mt-lg-0">
              <div
                className="p-5 text-center"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: "24px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  width: "100%",
                  maxWidth: "420px",
                }}
              >
                <FaRobot size={80} className="text-primary mb-4" />
                <h4 className="text-white fw-bold">AI Job Matching</h4>
                <p style={{ color: "#94a3b8" }}>
                  Our AI analyzes your skills and matches you
                  with the most relevant job opportunities.
                </p>
                <div className="d-flex justify-content-center gap-2 mt-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FaStar key={s} className="text-warning" />
                  ))}
                </div>
                <p className="small mt-2" style={{ color: "#94a3b8" }}>
                  Trusted by 500+ candidates
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        style={{
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
          padding: "80px 0",
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-white">Our Impact</h2>
            <p style={{ color: "#64748b" }}>Numbers that speak for themselves</p>
          </div>
          <div className="row text-center">

            {[
              { icon: <FaBriefcase size={40} color="#60a5fa" />, count: "100+", label: "Active Jobs", desc: "Explore opportunities from multiple companies", bg: "rgba(37,99,235,0.15)", border: "rgba(37,99,235,0.3)" },
              { icon: <FaUsers size={40} color="#34d399" />, count: "50+", label: "Recruiters", desc: "Connect with top recruiters and hiring managers", bg: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.3)" },
              { icon: <FaFileAlt size={40} color="#fbbf24" />, count: "500+", label: "Applications", desc: "Candidates getting shortlisted every day", bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)" },
            ].map((item, i) => (
              <div className="col-md-4 mb-4" key={i}>
                <div
                  style={{
                    background: item.bg,
                    border: `1px solid ${item.border}`,
                    borderRadius: "24px",
                    padding: "40px 24px",
                    backdropFilter: "blur(10px)",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-6px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "20px",
                      background: "rgba(255,255,255,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h2 className="fw-bold text-white mb-1" style={{ fontSize: "2.5rem" }}>
                    {item.count}
                  </h2>
                  <h5 className="fw-semibold mb-2" style={{ color: "#e2e8f0" }}>
                    {item.label}
                  </h5>
                  <p style={{ color: "#64748b", fontSize: "14px", marginBottom: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div
        style={{
          background: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)",
          padding: "80px 0",
        }}
      >
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-white">How It Works</h2>
            <p style={{ color: "#64748b" }}>Get started in 3 simple steps</p>
          </div>

          <div className="row">
            {[
              {
                icon: <FaSearch size={28} color="#60a5fa" />,
                step: "01",
                title: "Search Jobs",
                desc: "Browse hundreds of job listings filtered by your skills and location.",
                color: "#2563eb",
                bg: "rgba(37,99,235,0.15)",
                border: "rgba(37,99,235,0.3)",
              },
              {
                icon: <FaUpload size={28} color="#34d399" />,
                step: "02",
                title: "Upload Resume",
                desc: "Upload your resume and let our AI analyze your skills automatically.",
                color: "#10b981",
                bg: "rgba(16,185,129,0.15)",
                border: "rgba(16,185,129,0.3)",
              },
              {
                icon: <FaRobot size={28} color="#f472b6" />,
                step: "03",
                title: "AI Matching",
                desc: "Get personalized job recommendations powered by our smart AI engine.",
                color: "#ec4899",
                bg: "rgba(236,72,153,0.15)",
                border: "rgba(236,72,153,0.3)",
              },
            ].map((item, i) => (
              <div className="col-md-4 mb-4" key={i}>
                <div
                  style={{
                    background: item.bg,
                    border: `1px solid ${item.border}`,
                    borderRadius: "24px",
                    padding: "36px 28px",
                    height: "100%",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-6px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div className="d-flex justify-content-between align-items-start mb-4">
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "16px",
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${item.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </div>
                    <span
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: "800",
                        color: "rgba(255,255,255,0.06)",
                        lineHeight: 1,
                      }}
                    >
                      {item.step}
                    </span>
                  </div>
                  <h4 className="fw-bold mb-2 text-white">{item.title}</h4>
                  <p style={{ color: "#64748b", fontSize: "15px", marginBottom: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!role && (
        <div
          style={{
            background: "linear-gradient(135deg, #1e3a8a, #2563eb, #7c3aed)",
            padding: "80px 0",
          }}
          className="text-white text-center"
        >
          <div className="container">
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "60px 40px",
                backdropFilter: "blur(10px)",
              }}
            >
              <h2 className="fw-bold mb-3" style={{ fontSize: "2.2rem" }}>
                Ready to Find Your Dream Job?
              </h2>
              <p className="mb-4" style={{ color: "#bfdbfe", fontSize: "1.1rem" }}>
                Join thousands of candidates and recruiters on HireAI
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link
                  to="/register"
                  style={{
                    padding: "14px 32px",
                    background: "white",
                    borderRadius: "12px",
                    color: "#1e3a8a",
                    fontWeight: "700",
                    textDecoration: "none",
                    fontSize: "15px",
                  }}
                >
                  Register as Candidate
                </Link>
                <Link
                  to="/register"
                  style={{
                    padding: "14px 32px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "white",
                    fontWeight: "600",
                    textDecoration: "none",
                    fontSize: "15px",
                    border: "1px solid rgba(255,255,255,0.3)",
                  }}
                >
                  Register as Recruiter
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;