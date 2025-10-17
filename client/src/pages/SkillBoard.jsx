import React, { useEffect } from 'react';
import { useSkillStore } from '../store/useSkillStore';
import { useNavigate } from 'react-router-dom';

const SkillBoard = () => {
  const { allSkills, fetchAllSkills, isLoading } = useSkillStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllSkills();
  }, [fetchAllSkills]);

  if (isLoading) return <p className="text-center mt-5">Loading skills...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Skills</h2>
      <div className="row">
        {allSkills.map((skill) => (
          <div className="col-md-4 mb-4" key={skill._id}>
            <div
              className="card shadow-sm h-100"
              onClick={() => navigate(`/skill/${skill._id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-body">
                <h5 className="card-title">{skill.name}</h5>
                <p className="card-text">{skill.description}</p>
                <p className="text-muted">
                  👥 Registered Users: {skill.registeredUsers?.length || 0}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillBoard;
