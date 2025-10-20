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

  const handleDeleteSkill = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      await deleteSkill(skillId);
    }
  };

  const handleGenerateQuestions = async (skillId) => {
    const level = prompt('Enter difficulty level (beginner / intermediate / advanced):');
    if (!level) return;
    await generateQuestions({ skillId, level });
  };

  if (isLoading) return <p className="text-center mt-5">Loading skills...</p>;

  return (
    <div className="admin-skill-container">
      <style>
        {`
          /* 🌈 Global Styles */
          .admin-skill-container {
            max-width: 1200px;
            margin: 40px auto;
            padding: 25px;
            background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
            border-radius: 18px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            font-family: 'Poppins', sans-serif;
            transition: all 0.3s ease;
          }

          h2 {
            font-weight: 800;
            color: #1e293b;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2rem;
          }

          /* ➕ Add Skill Button */
          .btn.btn-primary {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            border: none;
            border-radius: 12px;
            font-weight: 600;
            padding: 10px 20px;
            box-shadow: 0 4px 12px rgba(37,99,235,0.3);
            transition: all 0.3s ease;
          }

          .btn.btn-primary:hover {
            background: linear-gradient(135deg, #1d4ed8, #1e40af);
            box-shadow: 0 8px 18px rgba(30,64,175,0.4);
            transform: translateY(-2px);
          }

          /* 🧠 Skill Cards */
          .card {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(8px);
            border-radius: 18px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 5px 15px rgba(0,0,0,0.06);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
          }

          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 22px rgba(0,0,0,0.1);
          }

          .card-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1e293b;
          }

          .card-text {
            color: #475569;
            font-size: 0.95rem;
            margin-bottom: 10px;
          }

          .text-muted {
            font-size: 0.9rem;
          }

          /* ⚙️ Generate Button */
          .btn.btn-success {
            background: linear-gradient(135deg, #16a34a, #15803d);
            border: none;
            font-weight: 600;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(22,163,74,0.3);
            transition: all 0.3s ease;
          }

          .btn.btn-success:hover {
            background: linear-gradient(135deg, #15803d, #166534);
            box-shadow: 0 8px 20px rgba(22,163,74,0.4);
            transform: translateY(-2px);
          }

          /* ⋮ Dropdown Menu */
          .dropdown-toggle {
            border: none !important;
            background: transparent !important;
            font-size: 1.3rem;
            color: #475569 !important;
          }

          .dropdown-menu {
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            font-size: 0.95rem;
          }

          .dropdown-item {
            transition: background 0.2s ease;
          }

          .dropdown-item:hover {
            background: #f1f5f9;
          }

          /* 🧾 Generated Questions */
          .list-group-item {
            border-radius: 10px;
            margin-bottom: 8px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
          }

          .list-group-item strong {
            color: #1e293b;
          }

          /* ✨ Animations */
          .card, .btn, .list-group-item {
            animation: fadeInUp 0.5s ease both;
          }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(15px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          /* 📱 Responsive Design */
          @media (max-width: 992px) {
            .admin-skill-container {
              padding: 20px;
            }
            .card {
              margin-bottom: 20px;
            }
          }

          @media (max-width: 768px) {
            h2 {
              font-size: 1.6rem;
            }

            .btn.btn-primary {
              width: 100%;
              margin-bottom: 20px;
            }

            .btn.btn-success {
              width: 100%;
            }

            .card-title {
              font-size: 1.1rem;
            }

            .card-text {
              font-size: 0.9rem;
            }
          }

          @media (max-width: 480px) {
            .admin-skill-container {
              margin: 20px 10px;
              border-radius: 12px;
            }

            .card {
              padding: 10px;
            }
          }
        `}
      </style>

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
            <div className="col-md-4 mb-4" key={skill._id}>
              <div className="card shadow-sm h-100 position-relative p-2">
                {/* Dropdown Menu */}
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
