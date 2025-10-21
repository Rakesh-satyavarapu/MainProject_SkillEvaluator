import React, { useEffect } from "react";
import { useAdminDashboardStore } from "../store/useAdminDashboardStore";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { stats, fetchDashboardStats, isLoading } = useAdminDashboardStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  if (isLoading) return <div className="loading-text">Loading...</div>;

  const handleCardClick = (key) => {
    if (key === "totalSkills") navigate("/admin/skills");
    else if (key === "totalUsers") navigate("/admin/users");
  };

  // 🎯 Emoji mapping for each stat
  const emojiMap = {
    totalSkills: "🧠",
    totalUsers: "👥",
    totalQuestions: "❓",
    totalAttempts: "🚀",
  };

  return (
    <div className="admin-dashboard">
      {/* Heading with visible emoji */}
      <h2 className="dashboard-title">
        <span className="dashboard-emoji">📊</span>
        <span className="dashboard-text">Admin Dashboard</span>
      </h2>

      <div className="dashboard-grid">
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className={`dashboard-card ${
              ["totalSkills", "totalUsers"].includes(key) ? "clickable" : ""
            }`}
            onClick={() => handleCardClick(key)}
          >
            <div className="emoji">{emojiMap[key] || "📦"}</div>
            <h5 className="card-title">{key.replace(/([A-Z])/g, " $1")}</h5>
            <h2 className="card-value">{value}</h2>
          </div>
        ))}
      </div>

      <style>{`
        /* 🎨 General Layout */
        .admin-dashboard {
          padding: 9rem 1rem 3rem 1rem; /* more space from top */
          max-width: 1100px;
          margin: 0 auto;
          text-align: center;
          border-radius: 20px;
          animation: fadeIn 0.8s ease;
        }

        /* 🌟 Heading */
        .dashboard-title {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.6rem;
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 2.5rem;
        }

        .dashboard-emoji {
          font-size: 2rem;
        }

        .dashboard-text {
          background: linear-gradient(90deg, #2563eb, #1d4ed8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* 📦 Cards Grid */
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr); /* 4 cards per row */
          gap: 1.5rem;
          width: 90%;
          max-width: 1000px;
          margin: 0 auto;
          justify-content: center;
          align-items: center;
        }

        /* 🧊 Card Styling */
        .dashboard-card {
          background: white;
          border-radius: 18px;
          padding: 2rem 1rem;
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .dashboard-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(59,130,246,0.12), rgba(147,197,253,0.12));
          transition: all 0.4s ease;
          z-index: 0;
        }

        .dashboard-card:hover::before {
          left: 0;
        }

        .dashboard-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 10px 25px rgba(37,99,235,0.15);
        }

        .dashboard-card.clickable {
          cursor: pointer;
        }

        .dashboard-card.clickable:hover {
          background: linear-gradient(135deg, #e0f2fe, #dbeafe);
        }

        /* 🎨 Emoji Style */
        .emoji {
          font-size: 2rem;
          margin-bottom: 10px;
          z-index: 1;
          position: relative;
        }

        .card-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
          z-index: 1;
          position: relative;
          text-transform: capitalize;
          margin-bottom: 0.8rem;
        }

        .card-value {
          font-size: 2rem;
          font-weight: 700;
          color: #2563eb;
          z-index: 1;
          position: relative;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
        }

        /* ⏳ Loading State */
        .loading-text {
          text-align: center;
          font-size: 1.2rem;
          margin-top: 5rem;
          color: #64748b;
          animation: pulse 1.5s infinite;
        }

        /* 🌟 Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }

        /* 📱 Mobile Responsive */
        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: repeat(2, 1fr); /* 2 cards per row on tablets */
          }
        }

        @media (max-width: 600px) {
          .admin-dashboard {
            padding: 2rem 1rem;
          }

          .dashboard-title {
            font-size: 1.6rem;
          }

          .dashboard-text {
            font-size: 1.6rem;
          }

          .card-value {
            font-size: 1.6rem;
          }

          .emoji {
            font-size: 1.8rem;
          }

          .dashboard-grid {
            grid-template-columns: 1fr; /* 1 card per row on mobile */
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
