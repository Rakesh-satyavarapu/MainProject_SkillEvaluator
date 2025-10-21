import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminSkillStore } from '../store/useAdminSkillStore';
import toast from 'react-hot-toast';

const AddSkill = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();
  const { addSkill, isProcessing } = useAdminSkillStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      toast.error('Please fill in both fields');
      return;
    }

    try {
      const response = await addSkill({ name, description });

      if (response) {
        navigate("/admin/skills");
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Try again.');
    }
  };

  return (
    <div className="add-skill-container">
      <h2 className="add-skill-title">➕ Add New Skill</h2>

      <form onSubmit={handleSubmit} className="add-skill-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Skill Name
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            placeholder="Enter skill name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-input"
            placeholder="Enter skill description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-buttons">
          <button
            type="button"
            className="btn-back"
            onClick={() => navigate('/admin/skills')}
          >
            ⬅️ Back
          </button>
          <button
            type="submit"
            className="btn-save"
            disabled={isProcessing}
          >
            {isProcessing ? 'Saving...' : 'Save Skill'}
          </button>
        </div>
      </form>

      <style>{`
        /* 🌈 Overall Layout */
        .add-skill-container {
          max-width: 600px;
          margin: 3rem auto;
          padding: 2rem;
          background: linear-gradient(135deg, #f8fafc, #eef2ff);
          border-radius: 20px;
          box-shadow: 0 6px 25px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .add-skill-container:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.15);
        }

        /* 🌟 Title */
        .add-skill-title {
          text-align: center;
          color: #2a2a72;
          font-weight: 700;
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          background: linear-gradient(90deg, #2a2a72, #009ffd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* 📝 Form Styling */
        .add-skill-form {
          background: #ffffff;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .form-group {
          margin-bottom: 1.2rem;
        }

        .form-label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .form-input {
          width: 100%;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 1rem;
          transition: border 0.3s ease, box-shadow 0.3s ease;
        }

        .form-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59,130,246,0.15);
          outline: none;
        }

        /* 💾 Buttons */
        .form-buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
        }

        .btn-back, .btn-save {
          padding: 10px 18px;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
        }

        .btn-back {
          background: #e5e7eb;
          color: #111827;
        }

        .btn-back:hover {
          background: #d1d5db;
        }

        .btn-save {
          background: linear-gradient(90deg, #2563eb, #1d4ed8);
          color: #fff;
          box-shadow: 0 4px 10px rgba(37,99,235,0.3);
        }

        .btn-save:hover {
          background: linear-gradient(90deg, #1e40af, #1d4ed8);
          transform: scale(1.03);
          box-shadow: 0 6px 14px rgba(37,99,235,0.4);
        }

        .btn-save:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* 📱 Mobile Responsive */
        @media (max-width: 600px) {
          .add-skill-container {
            padding: 1rem;
            margin: 2rem 1rem;
          }

          .add-skill-form {
            padding: 1.5rem;
          }

          .form-buttons {
            flex-direction: column;
            gap: 0.8rem;
          }

          .btn-back, .btn-save {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AddSkill;
