import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { FaUser, FaPhone, FaUniversity, FaTools, FaBriefcase } from "react-icons/fa";

function CandidateProfile() {
  const [profile, setProfile] = useState({
    phone: "",
    college: "",
    skills: "",
    experience: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get(`/profile/${userId}`);
      if (response.data) {
        setProfile({
          phone: response.data.phone || "",
          college: response.data.college || "",
          skills: response.data.skills || "",
          experience: response.data.experience || "",
        });
      }
    } catch (error) {
      // Profile nahi hai abhi — blank form dikhao
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/profile", {
        ...profile,
        userId: Number(userId),
      });
      toast.success("Profile saved successfully!");
      navigate("/candidate-dashboard");
    } catch (error) {
      toast.error("Failed to save profile!");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="text-center mt-5 pt-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-muted">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-7">

          <div
            className="card border-0 shadow-lg"
            style={{ borderRadius: "20px" }}
          >

            {/* Header */}
            <div
              className="card-header text-white text-center py-4 border-0"
              style={{
                borderRadius: "20px 20px 0 0",
                background: "linear-gradient(135deg,#2563eb,#7c3aed)",
              }}
            >
              <FaUser size={36} className="mb-2" />
              <h3 className="fw-bold mb-0">My Profile</h3>
              <p className="mb-0 mt-1 opacity-75 small">
                Complete your profile for better AI job matching
              </p>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <FaPhone className="me-2 text-primary" />
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="e.g. 9876543210"
                    value={profile.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <FaUniversity className="me-2 text-primary" />
                    College / University
                  </label>
                  <input
                    type="text"
                    name="college"
                    className="form-control"
                    placeholder="e.g. IIT Delhi"
                    value={profile.college}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <FaTools className="me-2 text-primary" />
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    className="form-control"
                    placeholder="e.g. Java, React, Spring Boot"
                    value={profile.skills}
                    onChange={handleChange}
                  />
                  <div className="form-text">
                    Comma separated skills — AI matching inhi skills se hoga
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    <FaBriefcase className="me-2 text-primary" />
                    Experience
                  </label>
                  <textarea
                    name="experience"
                    className="form-control"
                    placeholder="e.g. 2 years of experience in React and Spring Boot development"
                    rows="3"
                    value={profile.experience}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Saving...
                    </>
                  ) : (
                    "Save Profile"
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CandidateProfile;