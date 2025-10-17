// import React, { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSkillStore } from '../store/useSkillStore';

// const SkillDetailPage = () => {
//   const { skillId } = useParams();
//   const navigate = useNavigate();
//   const {
//     allSkills,
//     fetchAllSkills,
//     fetchRegisteredSkills,
//     registeredSkills,
//     registerSkill,
//     withdrawSkill,
//   } = useSkillStore();

//   const skill = allSkills.find((s) => s._id === skillId);
//   const regSkill = registeredSkills.find(
//     (s) => s.skill.toString() === skillId && s.status === 'registered'
//   );

//   useEffect(() => {
//     fetchAllSkills();
//     fetchRegisteredSkills();
//   }, []);

//   if (!skill) return <p className="mt-4 text-center">Loading skill...</p>;

//   return (
//     <div className="container mt-5">
//       <h2>{skill.name}</h2>
//       <p>{skill.description}</p>

//       {regSkill ? (
//         <>
//           <p>
//             <strong>Level:</strong> {regSkill.level}
//           </p>
//           <button
//             className="btn btn-primary me-2"
//             onClick={() => navigate(`/test/${skillId}`)}
//           >
//             Take Test
//           </button>
//           <button
//             className="btn btn-secondary me-2"
//             onClick={() => navigate(`/history/${skillId}`)}
//           >
//             View Test History
//           </button>
//           <button
//             className="btn btn-danger"
//             onClick={() => withdrawSkill(skillId)}
//           >
//             Withdraw
//           </button>
//         </>
//       ) : (
//         <div>
//           <p>Register to this skill to start testing.</p>
//           <select id="level" className="form-select w-auto mb-2" defaultValue="beginner">
//             <option value="beginner">Beginner</option>
//             <option value="intermediate">Intermediate</option>
//             <option value="advanced">Advanced</option>
//           </select>
//           <button
//             className="btn btn-success"
//             onClick={() => {
//               const level = document.getElementById('level').value;
//               registerSkill({ skillId, level });
//             }}
//           >
//             Register
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SkillDetailPage;



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSkillStore } from '../store/useSkillStore';
import {axiosInstance} from '../lib/axios';

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

  if (!skill) return <p className="mt-4 text-center">Loading skill...</p>;

  return (
    <div className="container mt-5">
      <h2>{skill.name}</h2>
      <p>{skill.description}</p>

      {regSkill ? (
        <>
          <p><strong>Level:</strong> {regSkill.level}</p>

          <div className="mb-3">
            <button
              className="btn btn-primary me-2"
              onClick={() => navigate(`/test/${skillId}`)}
            >
              Take Test
            </button>
            <button
              className="btn btn-secondary me-2"
              onClick={fetchTestHistory}
            >
              View Test History
            </button>
            <button
              className="btn btn-danger"
              onClick={() => withdrawSkill(skillId)}
            >
              Withdraw
            </button>
          </div>

          <hr />
          <h4>Tests Taken:</h4>
          {loadingHistory ? (
            <p>Loading test history...</p>
          ) : testHistory.length === 0 ? (
            <p>No tests taken yet.</p>
          ) : (
            <div className="list-group">
              {testHistory.map((attempt) => (
                <div
                  key={attempt._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <p className="mb-1">
                      <strong>Date:</strong> {new Date(attempt.takenAt).toLocaleString()}
                    </p>
                    <p className="mb-1">
                      <strong>Level:</strong> {attempt.level} | <strong>Score:</strong> {attempt.score}%
                    </p>
                    <p className="mb-1">
                      <strong>Weak Topics:</strong> {attempt.weakTopics.join(', ') || 'None'}
                    </p>
                  </div>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() =>
                      navigate(`/result/${skillId}`, { state: { attemptId: attempt._id } })
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
        <div>
          <p>Register to this skill to start testing.</p>
          <select id="level" className="form-select w-auto mb-2" defaultValue="beginner">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <button
            className="btn btn-success"
            onClick={() => {
              const level = document.getElementById('level').value;
              registerSkill({ skillId, level });
            }}
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillDetailPage;
