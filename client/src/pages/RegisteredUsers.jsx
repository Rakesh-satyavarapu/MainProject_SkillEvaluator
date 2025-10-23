import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminUserStore } from "../store/useAdminUserStore";

const RegisteredUsers = () => {
  const navigate = useNavigate();
  const { users, fetchAllUsers, deleteUser, isLoading, isProcessing } = useAdminUserStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  if (isLoading) return <div className="loading-text">Loading users...</div>;

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>Registered Users</h2>
        <p className="subtitle">Manage all registered users efficiently</p>
      </div>

      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Registered On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">No registered users found</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td onClick={() => navigate(`/admin/user/${user._id}`)}>{user.name}</td>
                  <td onClick={() => navigate(`/admin/user/${user._id}`)}>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="delete-btn"
                      disabled={isProcessing}
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
                          deleteUser(user._id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .users-container {
          width: 90%;
          margin: 3rem auto;
          padding: 2rem;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          font-family: 'Inter', sans-serif;
        }

        .users-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .users-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        .subtitle {
          color: #64748b;
          font-size: 0.95rem;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }

        .users-table th {
          background: #f8fafc;
          color: #475569;
          text-align: left;
          padding: 12px 15px;
          border-bottom: 2px solid #e2e8f0;
          font-weight: 600;
        }

        .users-table td {
          padding: 12px 15px;
          border-bottom: 1px solid #f1f5f9;
          color: #334155;
        }

        .users-table tr:last-child td {
          border-bottom: none;
        }

        .users-table tr:hover td {
          background: #f9fafb;
        }

        .delete-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .delete-btn:hover {
          background: #dc2626;
        }

        .no-data {
          text-align: center;
          padding: 2rem;
          color: #94a3b8;
          font-style: italic;
        }

        .loading-text {
          text-align: center;
          font-size: 1.1rem;
          margin-top: 5rem;
          color: #64748b;
        }

        @media (max-width: 768px) {
          .users-container {
            width: 95%;
            padding: 1.5rem;
          }

          .users-header h2 {
            font-size: 1.5rem;
          }

          .users-table th,
          .users-table td {
            padding: 10px 8px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .users-header h2 {
            font-size: 1.3rem;
          }

          .users-table th,
          .users-table td {
            font-size: 0.85rem;
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
