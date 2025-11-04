import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSkillStore } from '../store/useSkillStore';
import { axiosInstance } from '../lib/axios';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Target, TrendingDown, ArrowRight, Play, History, XCircle, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

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
  const [showHistory, setShowHistory] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('beginner');

  useEffect(() => {
    fetchAllSkills();
    fetchRegisteredSkills();
  }, []);

  const fetchTestHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await axiosInstance.get(`/user/skill/${skillId}/testHistory`);
      setTestHistory(res.data.attempts || []);
      setShowHistory(true);
    } catch (err) {
      console.error("Failed to fetch test history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading skill...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{skill.name}</h1>
                {regSkill && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700">
                    Level: {regSkill.level}
                  </span>
                )}
              </div>
            </div>
            {regSkill && (
              <button
                onClick={() => withdrawSkill(skillId)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center gap-2"
              >
                <XCircle className="h-4 w-4" />
                Withdraw
              </button>
            )}
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">{skill.description}</p>
        </motion.div>

        {/* Action Section */}
        {regSkill ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/test/${skillId}`)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <Play className="h-5 w-5" />
                Take Test
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (!showHistory) fetchTestHistory();
                  else setShowHistory(!showHistory);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                <History className="h-5 w-5" />
                {showHistory ? 'Hide History' : 'View History'}
              </motion.button>
            </div>

            {/* Test History */}
            {showHistory && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Test History</h3>
                {loadingHistory ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent mx-auto mb-2"></div>
                    <p className="text-gray-600">Loading test history...</p>
                  </div>
                ) : testHistory.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <History className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>No tests taken yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {testHistory.map((attempt) => (
                      <motion.div
                        key={attempt._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {new Date(attempt.takenAt).toLocaleString()}
                              </span>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                {attempt.level}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mb-2">
                              <div className="flex items-center gap-1">
                                <Target className="h-4 w-4 text-green-500" />
                                <span className="font-semibold text-green-600">{attempt.score}%</span>
                              </div>
                            </div>
                            {attempt.weakTopics && attempt.weakTopics.length > 0 && (
                              <div className="flex items-start gap-2 mt-2">
                                <TrendingDown className="h-4 w-4 text-orange-500 mt-0.5" />
                                <div className="flex flex-wrap gap-1">
                                  {attempt.weakTopics.map((topic, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-700"
                                    >
                                      {topic}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => navigate(`/attempt/${attempt._id}`, { state: { attemptId: attempt._id } })}
                            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                          >
                            View Details
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center"
          >
            <div className="max-w-md mx-auto">
              <p className="text-gray-600 mb-6">Register to this skill to start testing.</p>
              <div className="space-y-4">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => registerSkill({ skillId, level: selectedLevel })}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  <CheckCircle className="h-5 w-5" />
                  Register for this Skill
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SkillDetailPage;






// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSkillStore } from '../store/useSkillStore';
// import { axiosInstance } from '../lib/axios';

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

//   const [testHistory, setTestHistory] = useState([]);
//   const [loadingHistory, setLoadingHistory] = useState(false);
//   const [showHistory, setShowHistory] = useState(false); // toggle history

//   useEffect(() => {
//     fetchAllSkills();
//     fetchRegisteredSkills();
//   }, []);

//   const fetchTestHistory = async () => {
//     setLoadingHistory(true);
//     try {
//       const res = await axiosInstance.get(`/user/skill/${skillId}/testHistory`);
//       setTestHistory(res.data.attempts || []);
//       setShowHistory(true); // open after fetch
//     } catch (err) {
//       console.error("Failed to fetch test history:", err);
//     } finally {
//       setLoadingHistory(false);
//     }
//   };

//   if (!skill) return <p className="loading-text">Loading skill...</p>;

//   return (
//     <div className="skill-detail-container">
//       <div className="skill-card">
//         <div className="skill-header">
//           <h2 className="skill-title">{skill.name}</h2>
//           {regSkill && (
//             <button
//               className="btn btn-danger withdraw-btn"
//               onClick={() => withdrawSkill(skillId)}
//             >
//               Withdraw
//             </button>
//           )}
//         </div>

//         <p className="skill-description">{skill.description}</p>

//         {regSkill ? (
//           <>
//             <p><strong>Level:</strong> {regSkill.level}</p>

//             <div className="button-group">
//               <button
//                 className="btn btn-primary"
//                 onClick={() => navigate(`/test/${skillId}`)}
//               >
//                 Take Test
//               </button>
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => {
//                   if (!showHistory) fetchTestHistory();
//                   else setShowHistory(!showHistory); // toggle visibility
//                 }}
//               >
//                 {showHistory ? 'Hide Test History' : 'View Test History'}
//               </button>
//             </div>

//             {showHistory && (
//               <>
//                 <hr className="divider" />
//                 <h4 className="subheading">Tests Taken:</h4>

//                 {loadingHistory ? (
//                   <p className="loading-text">Loading test history...</p>
//                 ) : testHistory.length === 0 ? (
//                   <p className="empty-text">No tests taken yet.</p>
//                 ) : (
//                   <div className="test-history-list">
//                     {testHistory.map((attempt) => (
//                       <div key={attempt._id} className="test-card">
//                         <div className="test-info">
//                           <p>
//                             <strong>Date:</strong> {new Date(attempt.takenAt).toLocaleString()}
//                           </p>
//                           <p>
//                             <strong>Level:</strong> {attempt.level} | <strong>Score:</strong> {attempt.score}%
//                           </p>
//                           <p>
//                             <strong>Weak Topics:</strong> {attempt.weakTopics.join(", ") || "None"}
//                           </p>
//                         </div>
//                         <button
//                           className="btn btn-outline"
//                           onClick={() =>
//                             navigate(`/attempt/${attempt._id}`, { state: { attemptId: attempt._id } })
//                           }
//                         >
//                           View Details
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}
//           </>
//         ) : (
//           <div className="register-section">
//             <p className="register-text">Register to this skill to start testing.</p>
//             <select id="level" className="level-select" defaultValue="beginner">
//               <option value="beginner">Beginner</option>
//               <option value="intermediate">Intermediate</option>
//               <option value="advanced">Advanced</option>
//             </select>
//             <button
//               className="btn btn-success"
//               onClick={() => {
//                 const level = document.getElementById("level").value;
//                 registerSkill({ skillId, level });
//               }}
//             >
//               Register
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Enhanced CSS Styling */}
//       <style>{`
//         .skill-detail-container {
//           display: flex;
//           justify-content: center;
//           align-items: flex-start;
//           min-height: 100vh;
//           background: linear-gradient(135deg, #edf2ff, #f8fafc);
//           padding: 2rem 1rem;
//         }

//         .skill-card {
//           background: white;
//           border-radius: 20px;
//           box-shadow: 0 10px 25px rgba(0,0,0,0.08);
//           max-width: 1200px; /* Increased width */
//           width: 100%;
//           padding: 2.5rem;
//           transition: all 0.3s ease;
//         }

//         .skill-card:hover {
//           transform: translateY(-6px);
//           box-shadow: 0 12px 28px rgba(0,0,0,0.1);
//         }

//         .skill-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 1rem;
//         }

//         .skill-title {
//           font-size: 1.8rem;
//           font-weight: 700;
//           color: #1f2937;
//         }

//         .withdraw-btn {
//           padding: 0.55rem 1.3rem;
//           font-size: 1rem;
//           font-weight: 600;
//           border-radius: 10px;
//         }

//         .skill-description {
//           color: #4b5563;
//           font-size: 1rem;
//           line-height: 1.6;
//           margin-bottom: 1.8rem;
//         }

//         .button-group {
//           display: flex;
//           justify-content: flex-start;
//           gap: 1rem;
//           margin-bottom: 2rem;
//         }

//         .btn {
//           padding: 0.6rem 1.4rem;
//           border-radius: 10px;
//           border: none;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           font-size: 0.95rem;
//         }

//         .btn-primary { background-color: #2563eb; color: white; }
//         .btn-primary:hover { background-color: #1e40af; }
//         .btn-secondary { background-color: #6b7280; color: white; }
//         .btn-secondary:hover { background-color: #4b5563; }
//         .btn-danger { background-color: #dc2626; color: white; }
//         .btn-danger:hover { background-color: #991b1b; }
//         .btn-success { background-color: #2563eb; color: white; }
//         .btn-success:hover { background-color: #1e40af; }
//         .btn-outline { border: 2px solid #2563eb; color: #2563eb; background: transparent; }
//         .btn-outline:hover { background-color: #2563eb; color: white; }

//         .divider { margin: 2rem 0; border: none; border-top: 1px solid #e5e7eb; }
//         .subheading { font-size: 1.25rem; font-weight: 600; color: #111827; margin-bottom: 1rem; }

//         .test-history-list { display: flex; flex-direction: column; gap: 1rem; }
//         .test-card { background-color: #f9fafb; border-radius: 12px; padding: 1rem 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; box-shadow: 0 2px 5px rgba(0,0,0,0.08); transition: transform 0.2s ease; }
//         .test-card:hover { transform: scale(1.02); }
//         .test-info { flex: 1; color: #374151; font-size: 0.95rem; }

//         .register-section { text-align: center; margin-top: 2rem; }
//         .register-text { color: #374151; margin-bottom: 1rem; }
//         .level-select { padding: 0.6rem; border-radius: 8px; border: 1px solid #d1d5db; margin-bottom: 1rem; font-size: 0.95rem; }

//         @media (max-width: 768px) {
//           .skill-card { padding: 1.5rem; }
//           .skill-header { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
//           .skill-title { font-size: 1.5rem; }
//           .withdraw-btn { align-self: flex-end; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SkillDetailPage;
