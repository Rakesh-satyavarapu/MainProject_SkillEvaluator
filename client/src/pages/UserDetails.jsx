import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAdminUserStore } from "../store/useAdminUserStore";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Shield, Calendar, BookOpen, BarChart3, TrendingUp, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { userDetails, fetchUserDetails, isFetchingUser } = useAdminUserStore();

  useEffect(() => {
    fetchUserDetails(userId);
  }, [userId, fetchUserDetails]);

  if (isFetchingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="text-center">
          <p className="text-red-600 text-lg">User not found</p>
        </div>
      </div>
    );
  }

  const chartData = userDetails.registeredSkills?.map(skill => ({
    name: skill.skillName.length > 15 ? skill.skillName.substring(0, 15) + '...' : skill.skillName,
    score: skill.maxScore,
    avgScore: skill.avgScore,
    tests: skill.totalTests
  })) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            to="/admin/users"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Users</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{userDetails.name} - Details</h1>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">{userDetails.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Role</p>
                <p className="font-semibold text-gray-900 capitalize">{userDetails.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Registered At</p>
                <p className="font-semibold text-gray-900">{new Date(userDetails.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chart */}
        {chartData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary-600" />
              Performance Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} barCategoryGap={"20%"} barSize={24} margin={{ top: 5, right: 20, left: 0, bottom: 80 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="score" fill="#3b82f6" name="Highest Score" />
                <Bar dataKey="avgScore" fill="#8b5cf6" name="Average Score" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Registered Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary-600" />
              Registered Skills
            </h3>
          </div>
          {userDetails.registeredSkills && userDetails.registeredSkills.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary-50 to-secondary-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Skill Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Tests Taken</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Average Score</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Max Score</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {userDetails.registeredSkills.map((skill, index) => (
                    <motion.tr
                      key={skill.skillId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">{skill.skillName}</td>
                      <td className="px-6 py-4 text-gray-600">{skill.totalTests}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-blue-500" />
                          <span className="font-semibold text-blue-600">{skill.avgScore}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-green-500" />
                          <span className="font-semibold text-green-600">{skill.maxScore}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          skill.status === 'registered' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {skill.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                          {skill.level}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No registered skills found.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserDetails;




// import React, { useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useAdminUserStore } from "../store/useAdminUserStore";

// const UserDetails = () => {
//   const { userId } = useParams();
//   const { userDetails, fetchUserDetails, isFetchingUser } = useAdminUserStore();

//   useEffect(() => {
//     fetchUserDetails(userId);
//   }, [userId, fetchUserDetails]);

//   if (isFetchingUser) return <div className="loading-text">Loading...</div>;
//   if (!userDetails) return <div className="loading-text">User not found</div>;

//   return (
//     <div className="user-details-container">
//       <h2 className="user-title">{userDetails.name} - Details</h2>

//       <div className="user-info">
//         <p><strong>Email:</strong> {userDetails.email}</p>
//         <p><strong>Role:</strong> {userDetails.role}</p>
//         <p><strong>Registered At:</strong> {new Date(userDetails.createdAt).toLocaleString()}</p>
//       </div>

//       <h4 className="mt-4 section-title">📚 Registered Skills</h4>

//       {userDetails.registeredSkills && userDetails.registeredSkills.length > 0 ? (
//         <div className="table-wrapper">
//           <table className="user-table">
//             <thead>
//               <tr>
//                 <th>Skill Name</th>
//                 <th>Tests Taken</th>
//                 <th>Average Score</th>
//                 <th>Max Score</th>
//                 <th>Status</th>
//                 <th>Level</th>
//               </tr>
//             </thead>
//             <tbody>
//               {userDetails.registeredSkills.map((skill) => (
//                 <tr key={skill.skillId}>
//                   <td>{skill.skillName}</td>
//                   <td>{skill.totalTests}</td>
//                   <td>{skill.avgScore}</td>
//                   <td>{skill.maxScore}</td>
//                   <td>{skill.status}</td>
//                   <td>{skill.level}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="no-skills">No registered skills found.</p>
//       )}

//       <Link to="/admin/users" className="btn back-btn mt-3">⬅️ Back to Users</Link>

//       {/* 🎨 Inline CSS */}
//       <style>{`
//         .user-details-container {
//           max-width: 1000px;
//           margin: 3rem auto;
//           padding: 2rem;
//           background: linear-gradient(135deg, #f8fafc, #eef2ff);
//           border-radius: 20px;
//           box-shadow: 0 10px 25px rgba(0,0,0,0.08);
//           font-family: 'Poppins', sans-serif;
//         }

//         .user-title {
//           font-size: 2rem;
//           font-weight: 700;
//           color: #1d4ed8;
//           margin-bottom: 1.5rem;
//         }

//         .user-info p {
//           font-size: 1rem;
//           color: #334155;
//           margin: 0.5rem 0;
//         }

//         .section-title {
//           font-size: 1.5rem;
//           font-weight: 600;
//           color: #2563eb;
//           margin-bottom: 1rem;
//         }

//         .table-wrapper {
//           overflow-x: auto;
//         }

//         .user-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-bottom: 1.5rem;
//         }

//         .user-table th,
//         .user-table td {
//           padding: 12px 15px;
//           text-align: center;
//           border-bottom: 1px solid #e2e8f0;
//         }

//         .user-table th {
//           background: #e0f2fe;
//           color: #1e3a8a;
//           font-weight: 600;
//         }

//         .user-table tr:nth-child(even) {
//           background: #f8fafc;
//         }

//         .user-table tr:hover {
//           background: #dbeafe;
//         }

//         .back-btn {
//           display: inline-block;
//           background: linear-gradient(135deg, #2563eb, #1d4ed8);
//           color: #fff;
//           font-weight: 600;
//           padding: 10px 20px;
//           border-radius: 12px;
//           text-decoration: none;
//           transition: all 0.3s ease;
//         }

//         .back-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 16px rgba(37,99,235,0.3);
//         }

//         .loading-text {
//           text-align: center;
//           font-size: 1.2rem;
//           margin-top: 5rem;
//           color: #64748b;
//           animation: pulse 1.5s infinite;
//         }

//         .no-skills {
//           text-align: center;
//           color: #64748b;
//           font-style: italic;
//           margin-top: 1rem;
//         }

//         @keyframes pulse {
//           0% { opacity: 0.6; }
//           50% { opacity: 1; }
//           100% { opacity: 0.6; }
//         }

//         @media (max-width: 768px) {
//           .user-details-container {
//             padding: 1.5rem;
//           }
//           .user-title {
//             font-size: 1.6rem;
//           }
//           .section-title {
//             font-size: 1.3rem;
//           }
//           .user-table th,
//           .user-table td {
//             padding: 10px 8px;
//           }
//           .back-btn {
//             width: 100%;
//             text-align: center;
//           }
//         }

//         @media (max-width: 480px) {
//           .user-title {
//             font-size: 1.4rem;
//           }
//           .section-title {
//             font-size: 1.1rem;
//           }
//           .user-table th,
//           .user-table td {
//             font-size: 0.9rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default UserDetails;
