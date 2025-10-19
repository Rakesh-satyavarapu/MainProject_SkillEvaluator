// src/pages/EditSkill.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdminSkillStore } from '../store/useAdminSkillStore';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

const EditSkill = () => {
  const { skillId } = useParams();
  const navigate = useNavigate();
  const { updateSkill, isProcessing } = useAdminSkillStore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch skill data when page loads
  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await axiosInstance.get(`/skill/getSkill/${skillId}`);
        if (res.data?.data) {
          setName(res.data.data.name);
          setDescription(res.data.data.description);
        } else {
          toast.error('Skill not found');
          navigate('/admin/skills');
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch skill');
        navigate('/admin/skills');
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [skillId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateSkill({ skillId, name, description });
    if (success) navigate('/admin/skills');
  };

  if (loading) return <p className="text-center mt-5">Loading skill...</p>;

  return (
    <div className="container mt-5">
      <h2>Edit Skill</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Skill Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isProcessing}>
          {isProcessing ? 'Updating...' : 'Update Skill'}
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-3"
          onClick={() => navigate('/admin/skills')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditSkill;
