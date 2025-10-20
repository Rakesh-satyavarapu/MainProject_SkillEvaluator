import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminUserStore } from "../store/useAdminUserStore";

const RegisteredUsers = () => {
  const navigate = useNavigate();
  const { users, fetchAllUsers, deleteUser, isLoading, isProcessing } = useAdminUserStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  if (isLoading) return <div className="loading-text">Loading...</div>;

  return (
    <div className="users-container">
      <h2 className="users-title">👥 Registered Users</h2>

      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Registered At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="clickable" onClick={() => navigate(`/admin/user/${user._id}`)}>{user.name}</td>
                <td className="clickable" onClick={() => navigate(`/admin/user/${user._id}`)}>{user.email}</td>
                <td className="clickable" onClick={() => navigate(`/admin/user/${user._id}`)}>{user.role}</td>
                <td className="clickable" onClick={() => navigate(`/admin/user/${user._id}`)}>
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td>
                  <button
                    className="btn delete-btn"
                    disabled={isProcessing}
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
                        deleteUser(user._id);
                      }
                    }}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🎨 Inline CSS */}
      <style>{`
        .users-container {
          max-width: 1100px;
          margin: 3rem auto;
          padding: 2rem;
          background: linear-gradient(135deg, #eef2ff, #f8fafc);
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          font-family: 'Poppins', sans-serif;
          animation: fadeIn 0.8s ease;
        }

        .users-title {
          font-size: 2rem;
          font-weight: 700;
          color: #2563eb;
          margin-bottom: 2rem;
          text-align: center;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 1rem;
        }

        .users-table th,
        .users-table td {
          padding: 12px 15px;
          text-align: center;
          border-bottom: 1px solid #e2e8f0;
        }

        .users-table th {
          background: #e0f2fe;
          color: #1e3a8a;
          font-weight: 600;
        }

        .users-table tr:nth-child(even) {
          background: #f8fafc;
        }

        .users-table tr:hover {
          background: #dbeafe;
        }

        .clickable {
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .clickable:hover {
          color: #1d4ed8;
          font-weight: 600;
        }

        .delete-btn {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 10px;
          border: none;
          transition: all 0.25s ease-in-out;
        }

        .delete-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(220,38,38,0.3);
        }

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
        @media (max-width: 768px) {
          .users-container {
            padding: 1.5rem;
          }

          .users-title {
            font-size: 1.6rem;
          }

          .users-table th,
          .users-table td {
            padding: 10px 8px;
            font-size: 0.9rem;
          }

          .delete-btn {
            padding: 5px 10px;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .users-title {
            font-size: 1.4rem;
          }

          .users-table th,
          .users-table td {
            font-size: 0.8rem;
            padding: 8px 6px;
          }

          .delete-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default RegisteredUsers;
