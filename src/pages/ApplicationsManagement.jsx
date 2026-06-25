import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaFileAlt, FaCheck, FaTimes, FaEye } from "react-icons/fa";

function ApplicationsManagement() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await API.get("/applications");
      setApplications(response.data);
    } catch (error) {
      toast.error("Failed to load applications!");
    } finally {
      setLoading(false);
    }
  };

 const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);
      await API.put(`/applications/${id}/status`, { status });
      toast.success(`Application ${status.toLowerCase()} successfully!`);
      fetchApplications();
    } catch (error) {
      toast.error("Failed to update status!");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "APPLIED":
        return "bg-primary";
      case "SELECTED":
        return "bg-success";
      case "REJECTED":
        return "bg-danger";
      case "INTERVIEW":
        return "bg-warning text-dark";
      default:
        return "bg-secondary";
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5 pt-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-muted">Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold mb-1">Applications Management</h1>
          <p className="text-muted mb-0">
            {applications.length} total application{applications.length !== 1 ? "s" : ""}
          </p>
        </div>
        <FaFileAlt size={36} className="text-primary" />
      </div>

      {applications.length === 0 ? (
        <div className="text-center mt-5">
          <p className="text-muted fs-5">No applications received yet.</p>
        </div>
      ) : (
        <div className="card border-0 shadow-lg" style={{ borderRadius: "20px" }}>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">

                <thead
                  style={{
                    background: "linear-gradient(135deg,#0f172a,#2563eb)",
                    color: "white",
                  }}
                >
                  <tr>
                    <th className="py-3 px-4 border-0">#</th>
                    <th className="py-3 px-4 border-0">Candidate</th>
                    <th className="py-3 px-4 border-0">Job</th>
                    <th className="py-3 px-4 border-0">Status</th>
                    <th className="py-3 px-4 border-0">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {applications.map((app, index) => (
                    <tr key={app.id}>

                      <td className="py-3 px-4 align-middle">
                        {index + 1}
                      </td>

                      <td className="py-3 px-4 align-middle">
                        <span className="fw-semibold">
                          User #{app.userId}
                        </span>
                      </td>

                      <td className="py-3 px-4 align-middle">
                        <span className="fw-semibold">
                          Job #{app.jobId}
                        </span>
                      </td>

                      <td className="py-3 px-4 align-middle">
                        <span className={`badge ${getStatusBadge(app.status)} p-2`}>
                          {app.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 align-middle">
                        <div className="d-flex gap-2">

                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => updateStatus(app.id, "SELECTED")}
                            disabled={updatingId === app.id || app.status === "SELECTED"}
                          >
                            <FaCheck className="me-1" />
                            Select
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => updateStatus(app.id, "REJECTED")}
                            disabled={updatingId === app.id || app.status === "REJECTED"}
                          >
                            <FaTimes className="me-1" />
                            Reject
                          </button>

                          <button
                            className="btn btn-info btn-sm text-white"
                            onClick={() =>
                              window.open(
                                `http://localhost:8080/api/resume/resume-by-user/${app.userId}`,
                                "_blank"
                              )
                            }
                          >
                            <FaEye className="me-1" />
                            Resume
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ApplicationsManagement;