import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useAdminSkillStore } from '../store/useAdminSkillStore';
import toast from 'react-hot-toast';

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
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchAllSkills();
  }, [fetchAllSkills]);

  const handleDeleteSkill = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      await deleteSkill(skillId);
    }
  };

  const handleGenerateQuestions = async (skillId) => {
    const level = prompt('Enter difficulty level (beginner / intermediate / advanced):');
    if (!level) return;

    try {
      setIsGenerating(true);
      await generateQuestions({ skillId, level });
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) return <p className="text-center mt-5">Loading skills...</p>;

  return (
    <div className="admin-skill-container">

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <h4>Generating questions... Please wait 🔄</h4>
        </div>
      )}

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
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
            <div className="col-md-4 mb-3" key={skill._id}>
              <div className="card skill-card position-relative p-3 d-flex flex-column">

                {/* Dropdown Menu */}
                <Dropdown style={{ position: 'absolute', top: '30px', right: '135px' }}>
                  <Dropdown.Toggle variant="light" size="sm" id={`dropdown-${skill._id}`} />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate(`/admin/editSkill/${skill._id}`)}>✏️ Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDeleteSkill(skill._id)} className="text-danger">🗑️ Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Card Content */}
                <div className="card-body d-flex flex-column justify-content-between h-100">
                  <h5 className="card-title">{skill.name}</h5>
                  <p className="card-text">{skill.description}</p>
                  <p className="text-muted">👥 Registered Users: {skill.registeredUsers?.length || 0}</p>
                  <button
                    className="btn btn-success mt-2"
                    onClick={() => handleGenerateQuestions(skill._id)}
                    disabled={isProcessing || isGenerating}
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

      {/* Styles */}
      <style>{`
        .admin-skill-container {
          max-width: 1200px;
          margin: 40px auto;
          padding: 25px;
          background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
          border-radius: 18px;
          font-family: 'Poppins', sans-serif;
        }

        h2 { font-weight: 800; color: #1e293b; text-align: center; margin-bottom: 30px; }

        .btn.btn-primary {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          border: none; border-radius: 12px; font-weight: 600;
          padding: 10px 20px;
          box-shadow: 0 4px 12px rgba(37,99,235,0.3);
        }
        .btn.btn-primary:hover { background: linear-gradient(135deg, #1d4ed8, #1e40af); }

        .skill-card {
          min-height: 300px;
          max-height: 350px;
          border-radius: 18px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(8px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .skill-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
        }

        .card-title { font-size: 1.25rem; font-weight: 700; color: #1e293b; }
        .card-text { font-size: 0.95rem; color: #475569; margin: 0.5rem 0; flex-grow: 1; }
        .btn-success { background: linear-gradient(135deg, #16a34a, #15803d); border: none; font-weight: 600; border-radius: 10px; }
        .btn-success:hover { background: linear-gradient(135deg, #15803d, #166534); }

        .loading-overlay {
          position: fixed; top: 0; left: 0;
          width: 100vw; height: 100vh;
          background: rgba(255,255,255,0.9);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          z-index: 9999;
        }
        .loader {
          border: 6px solid #e0e0e0;
          border-top: 6px solid #16a34a;
          border-radius: 50%;
          width: 70px; height: 70px;
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .loading-overlay h4 { color: #374151; font-weight: 600; font-size: 1.2rem; }

        @media (max-width: 992px) { .admin-skill-container { padding: 20px; } }
        @media (max-width: 768px) { .btn.btn-primary, .btn-success { width: 100%; margin-bottom: 10px; } }
      `}</style>
    </div>
  );
};

export default AdminSkillBoard;
