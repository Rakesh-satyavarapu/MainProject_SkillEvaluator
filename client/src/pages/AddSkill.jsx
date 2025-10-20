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
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">➕ Add New Skill</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="form-group mb-3">
          <label htmlFor="name" className="form-label">
            Skill Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter skill name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            placeholder="Enter skill description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/admin/skills')}
          >
            ⬅️ Back
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isProcessing}
          >
            {isProcessing ? 'Saving...' : 'Save Skill'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSkill;
