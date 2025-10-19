import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSkillStore } from '../store/useSkillStore';
import { axiosInstance } from '../lib/axios';

const SkillDetailPage = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const {
    allSkills,
    fetchAllSkills,
    fetchRegisteredSkills,
    registeredSkills,
    registerSkill,
    withdrawSkill,
  } = useSkillStore();

  const skill = allSkills.find((s) => s._id === skillId);
  const regSkill = registeredSkills.find(
    (s) => s.skill.toString() === skillId && s.status === 'registered'
  );

  const [testHistory, setTestHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    fetchAllSkills();
    fetchRegisteredSkills();
  }, []);

  const fetchTestHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await axiosInstance.get(`/user/skill/${skillId}/testHistory`);
      setTestHistory(res.data.attempts || []);
    } catch (err) {
      console.error("Failed to fetch test history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  if (!skill) return <p className="loading-text">Loading skill...</p>;

  return (
    <div className="skill-detail-container">
      <div className="skill-card">
        {/* Header Section */}
        <div className="skill-header">
          <div className="skill-info">
            <h2 className="skill-title">
              {skill.name}
              {regSkill && <span className="skill-level"> | {regSkill.level}</span>}
            </h2>
          </div>
          {regSkill && (
            <button
              className="btn btn-danger withdraw-btn"
              onClick={() => withdrawSkill(skillId)}
            >
              Withdraw
            </button>
          )}
        </div>

        <p className="skill-description">{skill.description}</p>

        {regSkill ? (
          <>
            <div className="button-group">
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/test/${skillId}`)}
              >
                Take Test
              </button>
              <button className="btn btn-secondary" onClick={fetchTestHistory}>
                View Test History
              </button>
            </div>

            <hr className="divider" />
            <h4 className="subheading">Tests Taken:</h4>

            {loadingHistory ? (
              <p className="loading-text">Loading test history...</p>
            ) : testHistory.length === 0 ? (
              <p className="empty-text">No tests taken yet.</p>
            ) : (
              <div className="test-history-list">
                {testHistory.map((attempt) => (
                  <div key={attempt._id} className="test-card">
                    <div className="test-info">
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(attempt.takenAt).toLocaleString()}
                      </p>
                      <p>
                        <strong>Level:</strong> {attempt.level} |{" "}
                        <strong>Score:</strong> {attempt.score}%
                      </p>
                      <p>
                        <strong>Weak Topics:</strong>{" "}
                        {attempt.weakTopics.join(", ") || "None"}
                      </p>
                    </div>
                    <button
                      className="btn btn-outline"
                      onClick={() =>
                        navigate(`/result/${skillId}`, {
                          state: { attemptId: attempt._id },
                        })
                      }
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="register-section">
            <p className="register-text">
              Register to this skill to start testing.
            </p>
            <select id="level" className="level-select" defaultValue="beginner">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <button
              className="btn btn-success"
              onClick={() => {
                const level = document.getElementById("level").value;
                registerSkill({ skillId, level });
              }}
            >
              Register
            </button>
          </div>
        )}
      </div>

      {/* Enhanced CSS Styling */}
      <style>{`
        .skill-detail-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
          background: linear-gradient(135deg, #edf2ff, #f8fafc);
          padding: 2rem 1rem;
        }

        .skill-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          max-width: 900px;
          width: 100%;
          padding: 2.5rem;
          transition: all 0.3s ease;
        }

        .skill-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
        }

        /* Header Layout */
        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .skill-info {
          display: flex;
          align-items: baseline;
          gap: 0.3rem;
        }

        .skill-title, .skill-level {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1f2937;
        }

        .skill-level {
          color: #2563eb;
        }

        .withdraw-btn {
          padding: 0.55rem 1.3rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 10px;
        }

        .skill-description {
          color: #4b5563;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1.8rem;
        }

        .button-group {
          display: flex;
          justify-content: flex-start;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .btn {
          padding: 0.6rem 1.4rem;
          border-radius: 10px;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .btn-primary {
          background-color: #2563eb;
          color: white;
        }
        .btn-primary:hover { background-color: #1e40af; }

        .btn-secondary {
          background-color: #6b7280;
          color: white;
        }
        .btn-secondary:hover { background-color: #4b5563; }

        .btn-danger {
          background-color: #dc2626;
          color: white;
        }
        .btn-danger:hover { background-color: #991b1b; }

        .btn-success {
          background-color: #16a34a;
          color: white;
        }
        .btn-success:hover { background-color: #15803d; }

        .btn-outline {
          border: 2px solid #2563eb;
          color: #2563eb;
          background: transparent;
        }
        .btn-outline:hover {
          background-color: #2563eb;
          color: white;
        }

        .divider {
          margin: 2rem 0;
          border: none;
          border-top: 1px solid #e5e7eb;
        }

        .subheading {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 1rem;
        }

        .test-history-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .test-card {
          background-color: #f9fafb;
          border-radius: 12px;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          box-shadow: 0 2px 5px rgba(0,0,0,0.08);
          transition: transform 0.2s ease;
        }

        .test-card:hover {
          transform: scale(1.02);
        }

        .test-info {
          flex: 1;
          color: #374151;
          font-size: 0.95rem;
        }

        .register-section {
          text-align: center;
          margin-top: 2rem;
        }

        .register-text {
          color: #374151;
          margin-bottom: 1rem;
        }

        .level-select {
          padding: 0.6rem;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          margin-bottom: 1rem;
          font-size: 0.95rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .skill-card {
            padding: 1.5rem;
          }
          .skill-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          .skill-title, .skill-level {
            font-size: 1.5rem;
          }
          .withdraw-btn {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  );
};

export default SkillDetailPage;
