import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaUpload, FaFileAlt, FaCheckCircle } from "react-icons/fa";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (selected && selected.type !== "application/pdf") {
      toast.error("Only PDF files are allowed!");
      setFile(null);
      return;
    }

    setFile(selected);
    setUploaded(false);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a resume first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", localStorage.getItem("userId"));

    try {
      setLoading(true);
      await API.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Resume uploaded successfully!");
      setUploaded(true);
    } catch (error) {
      toast.error("Upload failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div
            className="card border-0 shadow-lg"
            style={{ borderRadius: "20px" }}
          >

            {/* Header */}
            <div
              className="card-header text-white text-center py-4 border-0"
              style={{
                borderRadius: "20px 20px 0 0",
                background: "linear-gradient(135deg,#0f172a,#2563eb)",
              }}
            >
              <FaUpload size={36} className="mb-2" />
              <h3 className="fw-bold mb-0">Upload Resume</h3>
              <p className="mb-0 mt-1 opacity-75 small">
                PDF format only
              </p>
            </div>

            <div className="card-body p-4">

              {/* Upload Area */}
              <div
                className="text-center p-4 mb-4"
                style={{
                  border: "2px dashed #cbd5e1",
                  borderRadius: "16px",
                  background: "#f8fafc",
                  cursor: "pointer",
                }}
                onClick={() => document.getElementById("resumeInput").click()}
              >
                {file ? (
                  <>
                    <FaFileAlt size={40} className="text-primary mb-2" />
                    <p className="fw-semibold mb-0">{file.name}</p>
                    <p className="text-muted small mb-0">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </>
                ) : (
                  <>
                    <FaUpload size={40} className="text-muted mb-2" />
                    <p className="fw-semibold mb-0">
                      Click to select your resume
                    </p>
                    <p className="text-muted small mb-0">
                      PDF files only
                    </p>
                  </>
                )}
              </div>

              {/* Hidden File Input */}
              <input
                id="resumeInput"
                type="file"
                accept=".pdf"
                className="d-none"
                onChange={handleFileChange}
              />

              {/* Success State */}
              {uploaded && (
                <div className="alert alert-success d-flex align-items-center gap-2 mb-3">
                  <FaCheckCircle />
                  Resume uploaded successfully!
                </div>
              )}

              {/* Upload Button */}
              <button
                className="btn btn-primary w-100 py-2 fw-semibold"
                onClick={handleUpload}
                disabled={loading || !file}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <FaUpload className="me-2" />
                    Upload Resume
                  </>
                )}
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ResumeUpload;