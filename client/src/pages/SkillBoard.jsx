import React, { useEffect, useState } from 'react';
import { useSkillStore } from '../store/useSkillStore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, BookOpen, Users, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const SkillBoard = () => {
  const { allSkills, fetchAllSkills, isLoading } = useSkillStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAllSkills();
  }, [fetchAllSkills]);

  const filteredSkills = allSkills.filter(skill =>
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (skill.description && skill.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Available Skills
          </h1>
          <p className="text-gray-600 text-lg">Explore and master new skills</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search skills by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200",
                "bg-white shadow-sm focus:shadow-lg",
                "focus:ring-2 focus:ring-primary-500 focus:border-transparent",
                "text-gray-900 placeholder-gray-500",
                "transition-all duration-200"
              )}
            />
          </div>
        </motion.div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              No skills found matching "{searchQuery}"
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => navigate(`/skill/${skill._id}`)}
                className={cn(
                  "bg-white rounded-2xl shadow-lg hover:shadow-2xl",
                  "border border-gray-100 overflow-hidden",
                  "cursor-pointer transition-all duration-300",
                  "group"
                )}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {skill.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {skill.description || 'No description available'}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">
                      {skill.registeredUsers?.length || 0} learners
                    </span>
                  </div>
                </div>

                {/* Gradient overlay on hover */}
                <div className="h-1 bg-gradient-to-r from-primary-600 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillBoard;





// import React, { useEffect } from 'react';
// import { useSkillStore } from '../store/useSkillStore';
// import { useNavigate } from 'react-router-dom';

// const SkillBoard = () => {
//   const { allSkills, fetchAllSkills, isLoading } = useSkillStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchAllSkills();
//   }, [fetchAllSkills]);

//   if (isLoading) return <p className="loading-text">Loading skills...</p>;

//   return (
//     <div className="skillboard-container">
//       <h2 className="skillboard-title">🌟 Available Skills</h2>
//       <div className="skills-grid">
//         {allSkills.map((skill) => (
//           <div
//             key={skill._id}
//             className="skill-card"
//             onClick={() => navigate(`/skill/${skill._id}`)}
//           >
//             <div className="skill-content">
//               <h3 className="skill-name">{skill.name}</h3>
//               <p className="skill-description">{skill.description}</p>
//               <p className="registered-users">
//                 👥 Registered Users: <span>{skill.registeredUsers?.length || 0}</span>
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* --- STYLING SECTION --- */}
//       <style>{`
//         /* Background and Layout */
//         .skillboard-container {
//           min-height: 100vh;
//           background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 40%, #c7d2fe 100%);
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           padding: 3rem 1rem;
//         }

//         .skillboard-title {
//           font-size: 2.3rem;
//           font-weight: 800;
//           color: #1e3a8a;
//           text-align: center;
//           margin-bottom: 2.5rem;
//           letter-spacing: 0.5px;
//         }

//         /* Grid Layout */
//         .skills-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//           gap: 1.8rem;
//           width: 100%;
//           max-width: 1100px;
//           padding: 0 1rem;
//         }

//         /* Skill Card */
//         .skill-card {
//           background: white;
//           border-radius: 18px;
//           box-shadow: 0 4px 15px rgba(0,0,0,0.08);
//           transition: all 0.3s ease;
//           cursor: pointer;
//           overflow: hidden;
//           position: relative;
//         }

//         .skill-card::before {
//           content: "";
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(120deg, rgba(99,102,241,0.1), rgba(59,130,246,0.15));
//           transition: all 0.4s ease;
//         }

//         .skill-card:hover::before {
//           left: 100%;
//         }

//         .skill-card:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 8px 25px rgba(59,130,246,0.2);
//         }

//         /* Card Content */
//         .skill-content {
//           padding: 1.8rem;
//           display: flex;
//           flex-direction: column;
//           gap: 0.8rem;
//         }

//         .skill-name {
//           font-size: 1.3rem;
//           font-weight: 700;
//           color: #1f2937;
//           margin: 0;
//         }

//         .skill-description {
//           color: #4b5563;
//           font-size: 0.95rem;
//           line-height: 1.6;
//         }

//         .registered-users {
//           font-size: 0.9rem;
//           color: #374151;
//           margin-top: auto;
//           font-weight: 500;
//         }

//         .registered-users span {
//           color: #2563eb;
//           font-weight: 700;
//         }

//         /* Loading Text */
//         .loading-text {
//           text-align: center;
//           margin-top: 4rem;
//           font-size: 1.2rem;
//           color: #1f2937;
//           font-weight: 500;
//         }

//         /* Responsive Styles */
//         @media (max-width: 768px) {
//           .skillboard-title {
//             font-size: 1.8rem;
//           }
//           .skills-grid {
//             gap: 1.2rem;
//           }
//           .skill-card {
//             border-radius: 14px;
//           }
//           .skill-content {
//             padding: 1.4rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SkillBoard;
