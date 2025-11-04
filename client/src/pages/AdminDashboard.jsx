import React, { useEffect } from "react";
import { useAdminDashboardStore } from "../store/useAdminDashboardStore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, BookOpen, FileQuestion, TrendingUp, ArrowRight, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { cn } from "../lib/utils";

const AdminDashboard = () => {
  const { stats, fetchDashboardStats, isLoading } = useAdminDashboardStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const handleCardClick = (key) => {
    if (key === "totalSkills") navigate("/admin/skills");
    else if (key === "totalUsers") navigate("/admin/users");
  };

  const statCards = [
    {
      key: "totalUsers",
      label: "Total Users",
      value: stats.totalUsers || 0,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      clickable: true,
    },
    {
      key: "totalSkills",
      label: "Total Skills",
      value: stats.totalSkills || 0,
      icon: BookOpen,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      clickable: true,
    },
    {
      key: "totalQuestions",
      label: "Total Questions",
      value: stats.totalQuestions || 0,
      icon: FileQuestion,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      clickable: false,
    },
    {
      key: "totalAttempts",
      label: "Total Attempts",
      value: stats.totalAttempts || 0,
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      clickable: false,
    },
  ];

  // Real-data-only datasets derived from backend totals
  const totalsBarData = [
    { name: "Users", value: stats.totalUsers || 0 },
    { name: "Skills", value: stats.totalSkills || 0 },
    { name: "Questions", value: stats.totalQuestions || 0 },
    { name: "Attempts", value: stats.totalAttempts || 0 },
  ];

  const totalsPieData = [
    { name: "Users", value: stats.totalUsers || 0, color: "#3b82f6" },
    { name: "Skills", value: stats.totalSkills || 0, color: "#8b5cf6" },
    { name: "Questions", value: stats.totalQuestions || 0, color: "#10b981" },
    { name: "Attempts", value: stats.totalAttempts || 0, color: "#f59e0b" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
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
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Overview of your platform statistics</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => stat.clickable && handleCardClick(stat.key)}
                className={cn(
                  "bg-white rounded-2xl shadow-lg border border-gray-100 p-6",
                  "transition-all duration-300",
                  stat.clickable && "cursor-pointer hover:shadow-2xl"
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bgColor)}>
                    <Icon className={cn("h-6 w-6", stat.iconColor)} />
                  </div>
                  {stat.clickable && (
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value.toLocaleString()}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Section (real data only) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Totals Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary-600" />
                Platform Totals
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={totalsBarData} barCategoryGap={"20%"} barSize={28} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Totals Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-primary-600" />
                Totals Distribution
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={totalsPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {totalsPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;





// import React, { useEffect } from "react";
// import { useAdminDashboardStore } from "../store/useAdminDashboardStore";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const { stats, fetchDashboardStats, isLoading } = useAdminDashboardStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchDashboardStats();
//   }, [fetchDashboardStats]);

//   if (isLoading) return <div className="loading-text">Loading...</div>;

//   const handleCardClick = (key) => {
//     if (key === "totalSkills") navigate("/admin/skills");
//     else if (key === "totalUsers") navigate("/admin/users");
//   };

//   // 🎯 Emoji mapping for each stat
//   const emojiMap = {
//     totalSkills: "🧠",
//     totalUsers: "👥",
//     totalQuestions: "❓",
//     totalAttempts: "🚀",
//   };

//   return (
//     <div className="admin-dashboard">
//       {/* Heading with visible emoji */}
//       <h2 className="dashboard-title">
//         <span className="dashboard-emoji">📊</span>
//         <span className="dashboard-text">Admin Dashboard</span>
//       </h2>

//       <div className="dashboard-grid">
//         {Object.entries(stats).map(([key, value]) => (
//           <div
//             key={key}
//             className={`dashboard-card ${
//               ["totalSkills", "totalUsers"].includes(key) ? "clickable" : ""
//             }`}
//             onClick={() => handleCardClick(key)}
//           >
//             <div className="emoji">{emojiMap[key] || "📦"}</div>
//             <h5 className="card-title">{key.replace(/([A-Z])/g, " $1")}</h5>
//             <h2 className="card-value">{value}</h2>
//           </div>
//         ))}
//       </div>

//       <style>{`
//         /* 🎨 General Layout */
//         .admin-dashboard {
//           padding: 9rem 1rem 3rem 1rem; /* more space from top */
//           max-width: 1100px;
//           margin: 0 auto;
//           text-align: center;
//           border-radius: 20px;
//           animation: fadeIn 0.8s ease;
//         }

//         /* 🌟 Heading */
//         .dashboard-title {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           gap: 0.6rem;
//           font-weight: 700;
//           font-size: 2rem;
//           margin-bottom: 2.5rem;
//         }

//         .dashboard-emoji {
//           font-size: 2rem;
//         }

//         .dashboard-text {
//           background: linear-gradient(90deg, #2563eb, #1d4ed8);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         /* 📦 Cards Grid */
//         .dashboard-grid {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr); /* 4 cards per row */
//           gap: 1.5rem;
//           width: 90%;
//           max-width: 1000px;
//           margin: 0 auto;
//           justify-content: center;
//           align-items: center;
//         }

//         /* 🧊 Card Styling */
//         .dashboard-card {
//           background: white;
//           border-radius: 18px;
//           padding: 2rem 1rem;
//           box-shadow: 0 6px 18px rgba(0,0,0,0.08);
//           transition: all 0.3s ease;
//           position: relative;
//           overflow: hidden;
//         }

//         .dashboard-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(90deg, rgba(59,130,246,0.12), rgba(147,197,253,0.12));
//           transition: all 0.4s ease;
//           z-index: 0;
//         }

//         .dashboard-card:hover::before {
//           left: 0;
//         }

//         .dashboard-card:hover {
//           transform: translateY(-6px) scale(1.02);
//           box-shadow: 0 10px 25px rgba(37,99,235,0.15);
//         }

//         .dashboard-card.clickable {
//           cursor: pointer;
//         }

//         .dashboard-card.clickable:hover {
//           background: linear-gradient(135deg, #e0f2fe, #dbeafe);
//         }

//         /* 🎨 Emoji Style */
//         .emoji {
//           font-size: 2rem;
//           margin-bottom: 10px;
//           z-index: 1;
//           position: relative;
//         }

//         .card-title {
//           font-size: 1.1rem;
//           font-weight: 600;
//           color: #1e293b;
//           z-index: 1;
//           position: relative;
//           text-transform: capitalize;
//           margin-bottom: 0.8rem;
//         }

//         .card-value {
//           font-size: 2rem;
//           font-weight: 700;
//           color: #2563eb;
//           z-index: 1;
//           position: relative;
//           text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
//         }

//         /* ⏳ Loading State */
//         .loading-text {
//           text-align: center;
//           font-size: 1.2rem;
//           margin-top: 5rem;
//           color: #64748b;
//           animation: pulse 1.5s infinite;
//         }

//         /* 🌟 Animations */
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes pulse {
//           0% { opacity: 0.6; }
//           50% { opacity: 1; }
//           100% { opacity: 0.6; }
//         }

//         /* 📱 Mobile Responsive */
//         @media (max-width: 1024px) {
//           .dashboard-grid {
//             grid-template-columns: repeat(2, 1fr); /* 2 cards per row on tablets */
//           }
//         }

//         @media (max-width: 600px) {
//           .admin-dashboard {
//             padding: 2rem 1rem;
//           }

//           .dashboard-title {
//             font-size: 1.6rem;
//           }

//           .dashboard-text {
//             font-size: 1.6rem;
//           }

//           .card-value {
//             font-size: 1.6rem;
//           }

//           .emoji {
//             font-size: 1.8rem;
//           }

//           .dashboard-grid {
//             grid-template-columns: 1fr; /* 1 card per row on mobile */
//             gap: 1rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AdminDashboard;
