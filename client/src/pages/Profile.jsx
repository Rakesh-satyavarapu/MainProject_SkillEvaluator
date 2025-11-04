import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { User, Mail, Shield, Edit2, Check, X, Award, TrendingUp, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { cn } from "../lib/utils";

const Profile = () => {
  const { authUser, logout, checkAuth, setAuthUser } = useAuthStore();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [updatingName, setUpdatingName] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!authUser) {
          await checkAuth();
        }
        const res = await axiosInstance.get(`/user/uid/${authUser?._id}`);
        setUserDetails(res.data.user);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [authUser, checkAuth]);

  const handleUpdateName = async () => {
    if (!newName.trim() || newName.trim().length < 3) {
      toast.error("Name must be at least 3 characters long");
      return;
    }

    setUpdatingName(true);
    try {
      const res = await axiosInstance.put('/user/updateName', { name: newName.trim() });
      setUserDetails({ ...userDetails, name: res.data.user.name });
      setAuthUser(res.data.user);
      setIsEditingName(false);
      setNewName('');
      toast.success('Name updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update name');
    } finally {
      setUpdatingName(false);
    }
  };

  const badgeInfo = {
    'first-test': { emoji: '🎯', name: 'First Test', color: '#3b82f6' },
    'perfect-score': { emoji: '💯', name: 'Perfect Score', color: '#10b981' },
    'skill-master': { emoji: '🏆', name: 'Skill Master', color: '#f59e0b' },
    'multi-skill': { emoji: '🌟', name: 'Multi-Skill', color: '#8b5cf6' },
    'consistency': { emoji: '📅', name: 'Consistency', color: '#06b6d4' },
    'improvement': { emoji: '📈', name: 'Improvement', color: '#ec4899' },
    'expert': { emoji: '🎓', name: 'Expert', color: '#6366f1' },
    'dedicated': { emoji: '🔥', name: 'Dedicated', color: '#ef4444' }
  };

  // Prepare chart data
  const chartData = userDetails?.registeredSkills?.map(skill => ({
    name: skill.skillName.length > 15 ? skill.skillName.substring(0, 15) + '...' : skill.skillName,
    score: skill.maxScore,
    avgScore: skill.avgScore,
    tests: skill.totalTests
  })) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="text-center">
          <p className="text-red-600 text-lg">No profile data found</p>
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
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                {!isEditingName ? (
                  <>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                      Welcome, {userDetails.name}
                    </h1>
                    <button
                      onClick={() => {
                        setIsEditingName(true);
                        setNewName(userDetails.name);
                      }}
                      className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit Name
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Enter new name"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleUpdateName}
                      disabled={updatingName}
                      className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingName(false);
                        setNewName('');
                      }}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Skills</p>
                <p className="text-3xl font-bold text-gray-900">{userDetails.registeredSkills?.length || 0}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Tests</p>
                <p className="text-3xl font-bold text-gray-900">
                  {userDetails.registeredSkills?.reduce((sum, skill) => sum + skill.totalTests, 0) || 0}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Badges Earned</p>
                <p className="text-3xl font-bold text-gray-900">{userDetails.badges?.length || 0}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Badges Section */}
        {userDetails.badges && userDetails.badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="h-6 w-6 text-primary-600" />
              Your Badges
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {userDetails.badges.map((badge, index) => {
                const info = badgeInfo[badge];
                if (!info) return null;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 rounded-xl border-2 border-gray-200 hover:border-primary-500 transition-all cursor-pointer"
                    style={{ borderColor: info.color }}
                  >
                    <div className="text-4xl mb-2">{info.emoji}</div>
                    <div className="text-sm font-semibold text-gray-900">{info.name}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Charts Section */}
        {chartData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Performance by Skill</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} barCategoryGap={"20%"} barSize={24} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#3b82f6" name="Highest Score" />
                  <Bar dataKey="avgScore" fill="#8b5cf6" name="Average Score" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tests Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="tests"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={["#3b82f6","#8b5cf6","#10b981","#f59e0b","#ec4899","#06b6d4"][index % 6]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        )}

        {/* Registered Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Registered Skills</h2>
          {userDetails.registeredSkills.length === 0 ? (
            <p className="text-gray-600 text-center py-8">You haven't registered for any skills yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userDetails.registeredSkills.map((skill) => (
                <div
                  key={skill.skillId}
                  className="p-4 rounded-xl border border-gray-200 hover:border-primary-500 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{skill.skillName}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-700">
                      {skill.level}
                    </span>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Highest</span>
                        <span className="font-semibold text-green-600">{skill.maxScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${skill.maxScore}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Average</span>
                        <span className="font-semibold text-blue-600">{skill.avgScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${skill.avgScore}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Total Tests: {skill.totalTests}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;






// import React, { useEffect, useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";

// const Profile = () => {
//   const { authUser, logout, checkAuth } = useAuthStore();
//   const [userDetails, setUserDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         if (!authUser) {
//           await checkAuth();
//         }
//         const res = await axiosInstance.get(`/user/uid/${authUser?._id}`);
//         setUserDetails(res.data.user);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to fetch user details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [authUser, checkAuth]);

//   if (loading)
//     return <div className="text-center mt-5 fs-5 fw-semibold text-secondary">Loading profile...</div>;
//   if (!userDetails)
//     return <div className="text-center mt-5 fs-5 text-danger">No profile data found</div>;

//   return (
//     <div className="container py-5">
//       {/* Header */}
//       <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
//         <h1 className="display-6 fw-bold text-primary">
//           Welcome, {userDetails.name}
//         </h1>
//         <button className="btn btn-outline-danger px-4" onClick={logout}>
//           Logout
//         </button>
//       </div>

//       {/* User Info */}
//       <div className="card mb-5 shadow-sm border-0 rounded-4">
//         <div className="card-body">
//           <h5 className="fw-semibold mb-3 text-secondary">Account Information</h5>
//           <p className="mb-2">
//             <strong>Email:</strong> <span className="text-muted">{userDetails.email}</span>
//           </p>
//           <p className="mb-0">
//             <strong>Role:</strong> <span className="text-muted">{userDetails.role}</span>
//           </p>
//         </div>
//       </div>

//       {/* Registered Skills */}
//       <h3 className="fw-bold mb-4 text-dark border-bottom pb-2">
//         Registered Skills
//       </h3>

//       {userDetails.registeredSkills.length === 0 ? (
//         <p className="text-muted fs-5">You haven’t registered for any skills yet.</p>
//       ) : (
//         <div className="row g-4">
//           {userDetails.registeredSkills.map((skill) => (
//             <div className="col-md-6 col-lg-4" key={skill.skillId}>
//               <div className="card h-100 shadow-sm border-0 rounded-4">
//                 <div className="card-body">
//                   <h5 className="card-title fw-semibold text-primary mb-2">
//                     {skill.skillName} <span className="text-muted">| {skill.level}</span>
//                   </h5>
//                   <p className="mb-1">
//                     <strong>Status:</strong>{" "}
//                     <span className="text-muted">{skill.status}</span>
//                   </p>
//                   <p className="mb-3">
//                     <strong>Total Tests Taken:</strong>{" "}
//                     <span className="text-muted">{skill.totalTests}</span>
//                   </p>

//                   {/* Highest Score */}
//                   <div className="mb-3">
//                     <div className="d-flex justify-content-between">
//                       <span className="fw-semibold">Highest Score</span>
//                       <span className="fw-semibold text-success">{skill.maxScore}%</span>
//                     </div>
//                     <div className="progress mt-1" style={{ height: "8px" }}>
//                       <div
//                         className="progress-bar bg-success"
//                         role="progressbar"
//                         style={{ width: `${skill.maxScore}%` }}
//                       ></div>
//                     </div>
//                   </div>

//                   {/* Average Score */}
//                   <div>
//                     <div className="d-flex justify-content-between">
//                       <span className="fw-semibold">Average Score</span>
//                       <span className="fw-semibold text-info">{skill.avgScore}%</span>
//                     </div>
//                     <div className="progress mt-1" style={{ height: "8px" }}>
//                       <div
//                         className="progress-bar bg-info"
//                         role="progressbar"
//                         style={{ width: `${skill.avgScore}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;
