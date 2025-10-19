import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useAdminSkillStore } from '../store/useAdminSkillStore';

const AdminSkillBoard = () => {
  const {
    allSkills,
    fetchAllSkills,
    deleteSkill,
    generateQuestions,
    generatedQuestions,
    isLoading,
    isProcessing,
  } = useAdminSkillStore();

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllSkills();
  }, [fetchAllSkills]);

  // 🗑️ Delete skill
  const handleDeleteSkill = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      await deleteSkill(skillId);
    }
  };

  // ⚙️ Generate questions for a skill
  const handleGenerateQuestions = async (skillId) => {
    const level = prompt('Enter difficulty level (beginner / intermediate / advanced):');
    if (!level) return;
    await generateQuestions({ skillId, level });
  };

  if (isLoading) return <p className="text-center mt-5">Loading skills...</p>;

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Skill Board</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/admin/addSkill')}
        >
          ➕ Add Skill
        </button>
      </div>

      {/* Skills Grid */}
      <div className="row">
        {allSkills.length === 0 ? (
          <p className="text-muted text-center">No skills available</p>
        ) : (
          allSkills.map((skill) => (
            <div className="col-md-4 mb-4" key={skill._id}>
              <div className="card shadow-sm h-100 position-relative p-2">
                {/* Three-dot menu */}
                <Dropdown className="position-absolute top-0 end-0 mt-2 me-2">
                  <Dropdown.Toggle
                    variant="light"
                    size="sm"
                    id={`dropdown-${skill._id}`}
                  >
                    ⋮
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => navigate(`/admin/editSkill/${skill._id}`)}
                    >
                      ✏️ Edit
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleDeleteSkill(skill._id)}
                      className="text-danger"
                    >
                      🗑️ Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Card Content */}
                <div className="card-body">
                  <h5 className="card-title">{skill.name}</h5>
                  <p className="card-text">{skill.description}</p>
                  <p className="text-muted">
                    👥 Registered Users: {skill.registeredUsers?.length || 0}
                  </p>

                  <button
                    className="btn btn-success mt-3 w-100"
                    onClick={() => handleGenerateQuestions(skill._id)}
                    disabled={isProcessing}
                  >
                    ⚙️ Generate Questions
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Generated Questions */}
      {generatedQuestions.length > 0 && (
        <div className="mt-5">
          <h4>🧠 Generated Questions</h4>
          <ul className="list-group mt-3">
            {generatedQuestions.map((q, index) => (
              <li key={index} className="list-group-item">
                <strong>Q{index + 1}:</strong> {q.question || q.text}
                <br />
                <span className="text-success">
                  ✅ Answer: {q.correctAnswer || 'N/A'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminSkillBoard;
