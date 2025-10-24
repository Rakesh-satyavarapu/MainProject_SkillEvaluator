import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const Profile = () => {
  const { authUser, logout, checkAuth } = useAuthStore();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!authUser) {
          await checkAuth();
        }
        const res = await axiosInstance.get(`/user/uid/${authUser?._id}`);
        setUserDetails(res.data.user);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [authUser, checkAuth]);

  if (loading)
    return <div className="text-center mt-5 fs-5 fw-semibold text-secondary">Loading profile...</div>;
  if (!userDetails)
    return <div className="text-center mt-5 fs-5 text-danger">No profile data found</div>;

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h1 className="display-6 fw-bold text-primary">
          Welcome, {userDetails.name}
        </h1>
        <button className="btn btn-outline-danger px-4" onClick={logout}>
          Logout
        </button>
      </div>

      {/* User Info */}
      <div className="card mb-5 shadow-sm border-0 rounded-4">
        <div className="card-body">
          <h5 className="fw-semibold mb-3 text-secondary">Account Information</h5>
          <p className="mb-2">
            <strong>Email:</strong> <span className="text-muted">{userDetails.email}</span>
          </p>
          <p className="mb-0">
            <strong>Role:</strong> <span className="text-muted">{userDetails.role}</span>
          </p>
        </div>
      </div>

      {/* Registered Skills */}
      <h3 className="fw-bold mb-4 text-dark border-bottom pb-2">
        Registered Skills
      </h3>

      {userDetails.registeredSkills.length === 0 ? (
        <p className="text-muted fs-5">You haven’t registered for any skills yet.</p>
      ) : (
        <div className="row g-4">
          {userDetails.registeredSkills.map((skill) => (
            <div className="col-md-6 col-lg-4" key={skill.skillId}>
              <div className="card h-100 shadow-sm border-0 rounded-4">
                <div className="card-body">
                  <h5 className="card-title fw-semibold text-primary mb-2">
                    {skill.skillName} <span className="text-muted">| {skill.level}</span>
                  </h5>
                  <p className="mb-1">
                    <strong>Status:</strong>{" "}
                    <span className="text-muted">{skill.status}</span>
                  </p>
                  <p className="mb-3">
                    <strong>Total Tests Taken:</strong>{" "}
                    <span className="text-muted">{skill.totalTests}</span>
                  </p>

                  {/* Highest Score */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span className="fw-semibold">Highest Score</span>
                      <span className="fw-semibold text-success">{skill.maxScore}%</span>
                    </div>
                    <div className="progress mt-1" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: `${skill.maxScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Average Score */}
                  <div>
                    <div className="d-flex justify-content-between">
                      <span className="fw-semibold">Average Score</span>
                      <span className="fw-semibold text-info">{skill.avgScore}%</span>
                    </div>
                    <div className="progress mt-1" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: `${skill.avgScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
