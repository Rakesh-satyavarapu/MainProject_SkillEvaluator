import React, { useEffect } from "react";
import { useAdminDashboardStore } from "../store/useAdminDashboardStore";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { stats, fetchDashboardStats, isLoading } = useAdminDashboardStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  if (isLoading) return <div>Loading...</div>;

  const handleCardClick = (key) => {
    if (key === "totalSkills") {
      navigate("/admin/skills");
    } else if (key === "totalUsers") {
      navigate("/admin/users");
    }
    // You can add more navigations for totalQuestions or totalAttempts if needed
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="row g-4">
        {Object.entries(stats).map(([key, value]) => (
          <div
            className="col-md-3"
            key={key}
            style={{ cursor: ["totalSkills", "totalUsers"].includes(key) ? "pointer" : "default" }}
            onClick={() => handleCardClick(key)}
          >
            <div className="card shadow-sm p-4 text-center">
              <h5>{key.replace(/([A-Z])/g, " $1")}</h5>
              <h2>{value}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
