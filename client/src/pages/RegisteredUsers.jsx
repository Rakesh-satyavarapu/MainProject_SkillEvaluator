import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminUserStore } from "../store/useAdminUserStore";

const RegisteredUsers = () => {
  const navigate = useNavigate();
  const { users, fetchAllUsers, deleteUser, isLoading, isProcessing } = useAdminUserStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registered Users</h2>
      <table className="table table-striped">
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
            <tr key={user._id} style={{ cursor: "pointer" }}>
              <td onClick={() => navigate(`/admin/user/${user._id}`)}>{user.name}</td>
              <td onClick={() => navigate(`/admin/user/${user._id}`)}>{user.email}</td>
              <td onClick={() => navigate(`/admin/user/${user._id}`)}>{user.role}</td>
              <td onClick={() => navigate(`/admin/user/${user._id}`)}>
                {new Date(user.createdAt).toLocaleString()}
              </td>
              <td>
                <button
                  className="btn btn-danger"
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredUsers;
