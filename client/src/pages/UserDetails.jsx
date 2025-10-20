import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAdminUserStore } from "../store/useAdminUserStore";

const UserDetails = () => {
  const { userId } = useParams();
  const { userDetails, fetchUserDetails, isFetchingUser } = useAdminUserStore();

  useEffect(() => {
    fetchUserDetails(userId);
  }, [userId, fetchUserDetails]);

  if (isFetchingUser) return <div className="loading-text">Loading...</div>;
  if (!userDetails) return <div className="loading-text">User not found</div>;

  return (
    <div className="user-details-container">
      <h2 className="user-title">{userDetails.name} - Details</h2>

      <div className="user-info">
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Role:</strong> {userDetails.role}</p>
        <p><strong>Registered At:</strong> {new Date(userDetails.createdAt).toLocaleString()}</p>
      </div>

      <h4 className="mt-4 section-title">📚 Registered Skills</h4>

      {userDetails.registeredSkills && userDetails.registeredSkills.length > 0 ? (
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Skill Name</th>
                <th>Tests Taken</th>
                <th>Average Score</th>
                <th>Max Score</th>
                <th>Status</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {userDetails.registeredSkills.map((skill) => (
                <tr key={skill.skillId}>
                  <td>{skill.skillName}</td>
                  <td>{skill.totalTests}</td>
                  <td>{skill.avgScore}</td>
                  <td>{skill.maxScore}</td>
                  <td>{skill.status}</td>
                  <td>{skill.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-skills">No registered skills found.</p>
      )}

      <Link to="/admin/users" className="btn back-btn mt-3">⬅️ Back to Users</Link>

      {/* 🎨 Inline CSS */}
      <style>{`
        .user-details-container {
          max-width: 1000px;
          margin: 3rem auto;
          padding: 2rem;
          background: linear-gradient(135deg, #f8fafc, #eef2ff);
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          font-family: 'Poppins', sans-serif;
        }

        .user-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1d4ed8;
          margin-bottom: 1.5rem;
        }

        .user-info p {
          font-size: 1rem;
          color: #334155;
          margin: 0.5rem 0;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2563eb;
          margin-bottom: 1rem;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .user-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 1.5rem;
        }

        .user-table th,
        .user-table td {
          padding: 12px 15px;
          text-align: center;
          border-bottom: 1px solid #e2e8f0;
        }

        .user-table th {
          background: #e0f2fe;
          color: #1e3a8a;
          font-weight: 600;
        }

        .user-table tr:nth-child(even) {
          background: #f8fafc;
        }

        .user-table tr:hover {
          background: #dbeafe;
        }

        .back-btn {
          display: inline-block;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: #fff;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(37,99,235,0.3);
        }

        .loading-text {
          text-align: center;
          font-size: 1.2rem;
          margin-top: 5rem;
          color: #64748b;
          animation: pulse 1.5s infinite;
        }

        .no-skills {
          text-align: center;
          color: #64748b;
          font-style: italic;
          margin-top: 1rem;
        }

        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }

        @media (max-width: 768px) {
          .user-details-container {
            padding: 1.5rem;
          }
          .user-title {
            font-size: 1.6rem;
          }
          .section-title {
            font-size: 1.3rem;
          }
          .user-table th,
          .user-table td {
            padding: 10px 8px;
          }
          .back-btn {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .user-title {
            font-size: 1.4rem;
          }
          .section-title {
            font-size: 1.1rem;
          }
          .user-table th,
          .user-table td {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default UserDetails;
