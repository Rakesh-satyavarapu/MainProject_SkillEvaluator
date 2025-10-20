import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAdminUserStore } from "../store/useAdminUserStore";

const UserDetails = () => {
  const { userId } = useParams();
  const { userDetails, fetchUserDetails, isFetchingUser } = useAdminUserStore();

  useEffect(() => {
    fetchUserDetails(userId);
  }, [userId, fetchUserDetails]);

  if (isFetchingUser) return <div>Loading...</div>;
  if (!userDetails) return <div>User not found</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{userDetails.name} - Details</h2>
      <p><strong>Email:</strong> {userDetails.email}</p>
      <p><strong>Role:</strong> {userDetails.role}</p>
      <p><strong>Registered At:</strong> {new Date(userDetails.createdAt).toLocaleString()}</p>

      <h4 className="mt-4">Registered Skills</h4>
      {userDetails.registeredSkills && userDetails.registeredSkills.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Skill Name</th>
              <th>Number of Tests Taken</th>
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
      ) : (
        <p>No registered skills found.</p>
      )}

      <Link to="/admin/users" className="btn btn-secondary mt-3">Back to Users</Link>
    </div>
  );
};

export default UserDetails;
