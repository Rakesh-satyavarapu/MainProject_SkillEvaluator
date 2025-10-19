import React, { useEffect } from 'react';
import { useSkillStore } from '../store/useSkillStore';
import { useNavigate } from 'react-router-dom';

const SkillBoard = () => {
  const { allSkills, fetchAllSkills, isLoading } = useSkillStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllSkills();
  }, [fetchAllSkills]);

  if (isLoading) return <p className="loading-text">Loading skills...</p>;

  return (
    <div className="skillboard-container">
      <h2 className="skillboard-title">🌟 Available Skills</h2>
      <div className="skills-grid">
        {allSkills.map((skill) => (
          <div
            key={skill._id}
            className="skill-card"
            onClick={() => navigate(`/skill/${skill._id}`)}
          >
            <div className="skill-content">
              <h3 className="skill-name">{skill.name}</h3>
              <p className="skill-description">{skill.description}</p>
              <p className="registered-users">
                👥 Registered Users: <span>{skill.registeredUsers?.length || 0}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- STYLING SECTION --- */}
      <style>{`
        /* Background and Layout */
        .skillboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 40%, #c7d2fe 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3rem 1rem;
        }

        .skillboard-title {
          font-size: 2.3rem;
          font-weight: 800;
          color: #1e3a8a;
          text-align: center;
          margin-bottom: 2.5rem;
          letter-spacing: 0.5px;
        }

        /* Grid Layout */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.8rem;
          width: 100%;
          max-width: 1100px;
          padding: 0 1rem;
        }

        /* Skill Card */
        .skill-card {
          background: white;
          border-radius: 18px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          overflow: hidden;
          position: relative;
        }

        .skill-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, rgba(99,102,241,0.1), rgba(59,130,246,0.15));
          transition: all 0.4s ease;
        }

        .skill-card:hover::before {
          left: 100%;
        }

        .skill-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 25px rgba(59,130,246,0.2);
        }

        /* Card Content */
        .skill-content {
          padding: 1.8rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .skill-name {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .skill-description {
          color: #4b5563;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .registered-users {
          font-size: 0.9rem;
          color: #374151;
          margin-top: auto;
          font-weight: 500;
        }

        .registered-users span {
          color: #2563eb;
          font-weight: 700;
        }

        /* Loading Text */
        .loading-text {
          text-align: center;
          margin-top: 4rem;
          font-size: 1.2rem;
          color: #1f2937;
          font-weight: 500;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .skillboard-title {
            font-size: 1.8rem;
          }
          .skills-grid {
            gap: 1.2rem;
          }
          .skill-card {
            border-radius: 14px;
          }
          .skill-content {
            padding: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SkillBoard;
