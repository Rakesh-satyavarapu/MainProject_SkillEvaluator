import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminSkillStore } from '../store/useAdminSkillStore';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Edit, Trash2, Settings, MoreVertical, Users, Sparkles, X } from 'lucide-react';
import { cn } from '../lib/utils';

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
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showLevelModal, setShowLevelModal] = useState(false);
  const [currentSkillId, setCurrentSkillId] = useState(null);

  useEffect(() => {
    fetchAllSkills();
  }, [fetchAllSkills]);

  const handleDeleteSkill = async (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      await deleteSkill(skillId);
      setOpenDropdown(null);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!selectedLevel || !currentSkillId) return;
    
    try {
      setIsGenerating(true);
      await generateQuestions({ skillId: currentSkillId, level: selectedLevel });
      setShowLevelModal(false);
      setSelectedLevel('');
      setCurrentSkillId(null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading skills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 py-8 px-4 sm:px-6 lg:px-8 relative">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
          >
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent mb-4"></div>
            <h4 className="text-xl font-semibold text-gray-900">Generating questions... Please wait</h4>
            <p className="text-gray-600 mt-2">This may take a few moments</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Skill Board</h1>
            <p className="text-gray-600">Manage and organize all skills</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/admin/addSkill')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="h-5 w-5" />
            Add Skill
          </motion.button>
        </motion.div>

        {/* Skills Grid */}
        {allSkills.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100"
          >
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No skills available</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allSkills.map((skill, index) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 relative group"
              >
                {/* Dropdown Menu */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === skill._id ? null : skill._id)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <MoreVertical className="h-5 w-5 text-gray-400" />
                  </button>
                  {openDropdown === skill._id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 z-10">
                      <button
                        onClick={() => {
                          navigate(`/admin/editSkill/${skill._id}`);
                          setOpenDropdown(null);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill._id)}
                        className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-2 text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{skill.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{skill.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{skill.registeredUsers?.length || 0} registered users</span>
                  </div>
                </div>

                {/* Generate Questions Button */}
                <button
                  onClick={() => {
                    setCurrentSkillId(skill._id);
                    setShowLevelModal(true);
                  }}
                  disabled={isProcessing || isGenerating}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="h-4 w-4" />
                  Generate Questions
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Generated Questions Modal */}
        {generatedQuestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary-600" />
              Generated Questions
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {generatedQuestions.map((q, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="font-semibold text-gray-900 mb-2">
                    Q{index + 1}: {q.question || q.text}
                  </p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <span className="font-medium">✓ Answer:</span> {q.correctAnswer || 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Level Selection Modal */}
      <AnimatePresence>
        {showLevelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLevelModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Select Difficulty Level</h3>
                <button
                  onClick={() => setShowLevelModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select level...</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLevelModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleGenerateQuestions}
                    disabled={!selectedLevel || isGenerating}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? 'Generating...' : 'Generate'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSkillBoard;





// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Dropdown } from 'react-bootstrap';
// import { useAdminSkillStore } from '../store/useAdminSkillStore';
// import toast from 'react-hot-toast';

// const AdminSkillBoard = () => {
//   const {
//     allSkills,
//     fetchAllSkills,
//     deleteSkill,
//     generateQuestions,
//     generatedQuestions,
//     isLoading,
//     isProcessing,
//   } = useAdminSkillStore();

//   const navigate = useNavigate();
//   const [isGenerating, setIsGenerating] = useState(false);

//   useEffect(() => {
//     fetchAllSkills();
//   }, [fetchAllSkills]);

//   const handleDeleteSkill = async (skillId) => {
//     if (window.confirm('Are you sure you want to delete this skill?')) {
//       await deleteSkill(skillId);
//     }
//   };

//   const handleGenerateQuestions = async (skillId) => {
//     const level = prompt('Enter difficulty level (beginner / intermediate / advanced):');
//     if (!level) return;

//     try {
//       setIsGenerating(true);
//       await generateQuestions({ skillId, level });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   if (isLoading) return <p className="text-center mt-5">Loading skills...</p>;

//   return (
//     <div className="admin-skill-container">

//       {/* Loading Overlay */}
//       {isGenerating && (
//         <div className="loading-overlay">
//           <div className="loader"></div>
//           <h4>Generating questions... Please wait 🔄</h4>
//         </div>
//       )}

//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
//         <h2>Admin Skill Board</h2>
//         <button
//           className="btn btn-primary"
//           onClick={() => navigate('/admin/addSkill')}
//         >
//           ➕ Add Skill
//         </button>
//       </div>

//       {/* Skills Grid */}
//       <div className="row">
//         {allSkills.length === 0 ? (
//           <p className="text-muted text-center">No skills available</p>
//         ) : (
//           allSkills.map((skill) => (
//             <div className="col-md-4 mb-3" key={skill._id}>
//               <div className="card skill-card position-relative p-3 d-flex flex-column">

//                 {/* Dropdown Menu */}
//                 <Dropdown style={{ position: 'absolute', top: '30px', right: '135px' }}>
//                   <Dropdown.Toggle variant="light" size="sm" id={`dropdown-${skill._id}`} />
//                   <Dropdown.Menu>
//                     <Dropdown.Item onClick={() => navigate(`/admin/editSkill/${skill._id}`)}>✏️ Edit</Dropdown.Item>
//                     <Dropdown.Item onClick={() => handleDeleteSkill(skill._id)} className="text-danger">🗑️ Delete</Dropdown.Item>
//                   </Dropdown.Menu>
//                 </Dropdown>

//                 {/* Card Content */}
//                 <div className="card-body d-flex flex-column justify-content-between h-100">
//                   <h5 className="card-title">{skill.name}</h5>
//                   <p className="card-text">{skill.description}</p>
//                   <p className="text-muted">👥 Registered Users: {skill.registeredUsers?.length || 0}</p>
//                   <button
//                     className="btn btn-success mt-2"
//                     onClick={() => handleGenerateQuestions(skill._id)}
//                     disabled={isProcessing || isGenerating}
//                   >
//                     ⚙️ Generate Questions
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Generated Questions */}
//       {generatedQuestions.length > 0 && (
//         <div className="mt-5">
//           <h4>🧠 Generated Questions</h4>
//           <ul className="list-group mt-3">
//             {generatedQuestions.map((q, index) => (
//               <li key={index} className="list-group-item">
//                 <strong>Q{index + 1}:</strong> {q.question || q.text}
//                 <br />
//                 <span className="text-success">
//                   ✅ Answer: {q.correctAnswer || 'N/A'}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Styles */}
//       <style>{`
//         .admin-skill-container {
//           max-width: 1200px;
//           margin: 40px auto;
//           padding: 25px;
//           background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
//           border-radius: 18px;
//           font-family: 'Poppins', sans-serif;
//         }

//         h2 { font-weight: 800; color: #1e293b; text-align: center; margin-bottom: 30px; }

//         .btn.btn-primary {
//           background: linear-gradient(135deg, #2563eb, #1d4ed8);
//           border: none; border-radius: 12px; font-weight: 600;
//           padding: 10px 20px;
//           box-shadow: 0 4px 12px rgba(37,99,235,0.3);
//         }
//         .btn.btn-primary:hover { background: linear-gradient(135deg, #1d4ed8, #1e40af); }

//         .skill-card {
//           min-height: 300px;
//           max-height: 350px;
//           border-radius: 18px;
//           box-shadow: 0 10px 25px rgba(0,0,0,0.08);
//           background: rgba(255,255,255,0.85);
//           backdrop-filter: blur(8px);
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }
//         .skill-card:hover {
//           transform: translateY(-6px);
//           box-shadow: 0 12px 28px rgba(0,0,0,0.1);
//         }

//         .card-title { font-size: 1.25rem; font-weight: 700; color: #1e293b; }
//         .card-text { font-size: 0.95rem; color: #475569; margin: 0.5rem 0; flex-grow: 1; }
//         .btn-success { background: linear-gradient(135deg, #16a34a, #15803d); border: none; font-weight: 600; border-radius: 10px; }
//         .btn-success:hover { background: linear-gradient(135deg, #15803d, #166534); }

//         .loading-overlay {
//           position: fixed; top: 0; left: 0;
//           width: 100vw; height: 100vh;
//           background: rgba(255,255,255,0.9);
//           display: flex; flex-direction: column; align-items: center; justify-content: center;
//           z-index: 9999;
//         }
//         .loader {
//           border: 6px solid #e0e0e0;
//           border-top: 6px solid #16a34a;
//           border-radius: 50%;
//           width: 70px; height: 70px;
//           animation: spin 1s linear infinite;
//           margin-bottom: 15px;
//         }
//         @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//         .loading-overlay h4 { color: #374151; font-weight: 600; font-size: 1.2rem; }

//         @media (max-width: 992px) { .admin-skill-container { padding: 20px; } }
//         @media (max-width: 768px) { .btn.btn-primary, .btn-success { width: 100%; margin-bottom: 10px; } }
//       `}</style>
//     </div>
//   );
// };

// export default AdminSkillBoard;
