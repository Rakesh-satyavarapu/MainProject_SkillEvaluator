// src/pages/EditSkill.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminSkillStore } from "../store/useAdminSkillStore";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const EditSkill = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { updateSkill, isProcessing } = useAdminSkillStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch skill data
  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await axiosInstance.get(`/skill/getSkill/${skillId}`);
        if (res.data?.data) {
          setName(res.data.data.name);
          setDescription(res.data.data.description);
        } else {
          toast.error("Skill not found");
          navigate("/admin/skills");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch skill");
        navigate("/admin/skills");
      } finally {
        setLoading(false);
      }
    };
    fetchSkill();
  }, [skillId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateSkill({ skillId, name, description });
    if (success) navigate("/admin/skills");
  };

  if (loading) return <p className="text-center mt-5">Loading skill...</p>;

  return (
    <div className="edit-skill-page">
      <div className="edit-skill-card">
        <h2>✏️ Edit Skill</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Skill Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="6"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* ✅ Buttons inside the card */}
          <div className="button-row">
            <button type="submit" className="btn btn-primary" disabled={isProcessing}>
              {isProcessing ? "Updating..." : "Update Skill"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin/skills")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <style>{`
        /* Main Layout */
        .edit-skill-page {
          position: fixed;
          top: 80px; /* below navbar */
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #e0f2fe, #c7d2fe);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        /* Card Styling (Reduced size) */
        .edit-skill-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
          width: 80%;
          max-width: 700px;
          min-height: 70%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 2rem;
          box-sizing: border-box;
          animation: fadeIn 0.6s ease-in-out;
          position: relative;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        h2 {
          text-align: center;
          color: #1e3a8a;
          font-weight: 700;
          font-size: 1.7rem;
          margin-bottom: 1.3rem;
        }

        /* Form Fields */
        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: block;
          color: #1f2937;
        }

        .form-control {
          width: 100%;
          font-size: 1rem;
          padding: 0.9rem;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          transition: all 0.2s ease;
        }

        .form-control:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        textarea.form-control {
          resize: none;
          height: 180px;
        }

        /* ✅ Button Row - inside card neatly */
        .button-row {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: auto;
          padding-bottom: 0.5rem;
        }

        .btn {
          font-size: 1rem;
          padding: 0.7rem 1.6rem;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background-color: #2563eb;
          color: white;
          border: none;
        }

        .btn-primary:hover {
          background-color: #1e40af;
        }

        .btn-secondary {
          background-color: #e5e7eb;
          color: #374151;
          border: none;
        }

        .btn-secondary:hover {
          background-color: #d1d5db;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .edit-skill-card {
            width: 90%;
            min-height: auto;
            padding: 1.5rem;
          }

          .form-control {
            font-size: 0.95rem;
            padding: 0.8rem;
          }

          .btn {
            font-size: 0.95rem;
            padding: 0.7rem 1.3rem;
          }

          h2 {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EditSkill;
