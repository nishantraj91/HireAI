import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CandidateDashboard from "./pages/CandidateDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Jobs from "./pages/Jobs";
import Navbar from "./components/Navbar";
import AppliedJobs from "./pages/AppliedJobs";
import PostJob from "./pages/PostJob";
import MyJobs from "./pages/MyJobs";
import ApplicationsManagement from "./pages/ApplicationsManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import ResumeUpload from "./pages/ResumeUpload";
import Candidates from "./pages/Candidates";
import Footer from "./components/Footer";
import CandidateProfile from "./pages/CandidateProfile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/candidate-dashboard"
          element={
            <RoleProtectedRoute allowedRole="CANDIDATE">
              <CandidateDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/recruiter-dashboard"
          element={
            <RoleProtectedRoute allowedRole="RECRUITER">
              <RecruiterDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route path="/jobs" element={<Jobs />} />

        <Route
          path="/applied-jobs"
          element={
            <RoleProtectedRoute allowedRole="CANDIDATE">
              <AppliedJobs />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/post-job"
          element={
            <RoleProtectedRoute allowedRole="RECRUITER">
              <PostJob />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/my-jobs"
          element={
            <RoleProtectedRoute allowedRole="RECRUITER">
              <MyJobs />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/applications-management"
          element={
            <RoleProtectedRoute allowedRole="RECRUITER">
              <ApplicationsManagement />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/resume-upload"
          element={
            <RoleProtectedRoute allowedRole="CANDIDATE">
              <ResumeUpload />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/candidates"
          element={
            <RoleProtectedRoute allowedRole="RECRUITER">
              <Candidates />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <RoleProtectedRoute allowedRole="CANDIDATE">
              <CandidateProfile />
            </RoleProtectedRoute>
          }
        />

      </Routes>
      <Footer />
      
    </BrowserRouter>
  );
}

export default App;
