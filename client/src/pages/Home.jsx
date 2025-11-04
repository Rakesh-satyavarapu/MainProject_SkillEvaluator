import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Target, BarChart3, Bot, Award, ArrowRight, TrendingUp, Users, BookOpen } from 'lucide-react';

const Home = () => {
  const { authUser, stats, fetchDashboardStats, isLoading } = useAuthStore();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const features = [
    {
      icon: Target,
      title: 'Adaptive Testing',
      description: 'AI-powered quizzes that adapt to your skill level',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Detailed insights into your learning progress',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Bot,
      title: 'AI Assistant',
      description: 'Get help and explanations from our AI tutor',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Earn badges and track your accomplishments',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Master Your Skills with AI
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Experience personalized learning with our intelligent skill evaluation platform
            </p>
            {!authUser && (
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-200"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
            )}
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {isLoading ? '...' : stats.totalUsers || 0}
              </div>
              <div className="text-white/90 text-lg">Total Learners</div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {isLoading ? '...' : stats.totalSkills || 0}
              </div>
              <div className="text-white/90 text-lg">Skills Available</div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">95%</div>
              <div className="text-white/90 text-lg">Success Rate</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      {/* {!authUser && ( */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of learners who are already improving their skills with our platform.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-200"
              >
                Start Learning Today
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </section>
      {/* )} */}
    </div>
  );
};

export default Home;







// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { useAuthStore } from '../store/useAuthStore';

// const Home = () => {
//   const { authUser, stats, fetchDashboardStats, isLoading } = useAuthStore();

//   // ✅ Only fetch once when component mounts
//   useEffect(() => {
//     fetchDashboardStats();
//   }, []); // removed from dependency array to prevent infinite loop

//   const features = [
//     {
//       icon: '🎯',
//       title: 'Adaptive Testing',
//       description: 'AI-powered quizzes that adapt to your skill level',
//     },
//     {
//       icon: '📊',
//       title: 'Performance Analytics',
//       description: 'Detailed insights into your learning progress',
//     },
//     {
//       icon: '🤖',
//       title: 'AI Assistant',
//       description: 'Get help and explanations from our AI tutor',
//     },
//     {
//       icon: '🏆',
//       title: 'Achievement System',
//       description: 'Earn badges and track your accomplishments',
//     },
//   ];

//   return (
//     <div className="home-container">
//       {/* Features Section */}
//       <div className="features-section">
//         <div className="features-wrapper">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="features-header"
//           >
//             <h2>Why Choose Our Platform?</h2>
//             <p>
//               Our AI-driven platform provides a personalized learning experience 
//               that adapts to your unique needs and learning style.
//             </p>
//           </motion.div>

//           <div className="features-grid">
//             {features.map((feature, index) => (
//               <motion.div
//                 key={feature.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
//                 className="feature-card"
//               >
//                 <div className="feature-icon">
//                   <span>{feature.icon}</span>
//                 </div>
//                 <h3>{feature.title}</h3>
//                 <p>{feature.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="stats-section">
//         <div className="stats-wrapper">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="stats-grid"
//           >
//             {/* ✅ Show loader or actual stats */}
//             <div className="stat">
//               <div className="stat-number blue">
//                 {isLoading ? '...' : stats.totalUsers}
//               </div>
//               <div className="stat-label">Total Learners</div>
//             </div>
//             <div className="stat">
//               <div className="stat-number purple">
//                 {isLoading ? '...' : stats.totalSkills}
//               </div>
//               <div className="stat-label">Skills Available</div>
//             </div>
//             <div className="stat">
//               <div className="stat-number green">
//                 {isLoading ? '...' : '95%'}
//               </div>
//               <div className="stat-label">Success Rate</div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="cta-section">
//         <div className="cta-wrapper">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.6 }}
//           >
//             <h2>Ready to Start Your Learning Journey?</h2>
//             <p>
//               Join thousands of learners who are already improving their skills with our platform.
//             </p>
//             {!authUser && (
//               <Link to="/register" className="cta-button">
//                 Start Learning Today
//               </Link>
//             )}
//           </motion.div>
//         </div>
//       </div>

//       {/* Embedded CSS */}
//       <style>{`
//         .home-container {
//           min-height: 100vh;
//           background: linear-gradient(to bottom right, #eff6ff, #ffffff, #f5f3ff);
//           font-family: 'Inter', sans-serif;
//           color: #1f2937;
//         }

//         /* Features Section */
//         .features-section {
//           padding: 4rem 1.5rem;
//           background-color: white;
//         }
//         .features-wrapper {
//           max-width: 1200px;
//           margin: 0 auto;
//         }
//         .features-header {
//           text-align: center;
//           margin-bottom: 3rem;
//         }
//         .features-header h2 {
//           font-size: 1.875rem;
//           font-weight: 700;
//           margin-bottom: 0.75rem;
//         }
//         .features-header p {
//           color: #4b5563;
//           font-size: 1.1rem;
//           max-width: 600px;
//           margin: 0 auto;
//         }

//         .features-grid {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 2rem;
//         }
//         @media (min-width: 768px) {
//           .features-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }
//         }
//         @media (min-width: 1024px) {
//           .features-grid {
//             grid-template-columns: repeat(4, 1fr);
//           }
//         }

//         .feature-card {
//           text-align: center;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }
//         .feature-card:hover {
//           transform: translateY(-6px);
//         }
//         .feature-icon {
//           width: 64px;
//           height: 64px;
//           background: linear-gradient(to right, #3b82f6, #8b5cf6);
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin: 0 auto 1rem;
//           color: white;
//           font-size: 1.75rem;
//         }
//         .feature-card h3 {
//           font-size: 1.125rem;
//           font-weight: 600;
//           margin-bottom: 0.5rem;
//         }
//         .feature-card p {
//           color: #6b7280;
//         }

//         /* Stats Section */
//         .stats-section {
//           padding: 4rem 1.5rem;
//           background-color: #f9fafb;
//         }
//         .stats-wrapper {
//           max-width: 1200px;
//           margin: 0 auto;
//         }
//         .stats-grid {
//           display: grid;
//           grid-template-columns: 1fr;
//           gap: 2rem;
//           text-align: center;
//         }
//         @media (min-width: 768px) {
//           .stats-grid {
//             grid-template-columns: repeat(3, 1fr);
//           }
//         }

//         .stat-number {
//           font-size: 2.5rem;
//           font-weight: 700;
//           margin-bottom: 0.5rem;
//         }
//         .blue { color: #2563eb; }
//         .purple { color: #7c3aed; }
//         .green { color: #16a34a; }
//         .stat-label {
//           color: #6b7280;
//         }

//         /* CTA Section */
//         .cta-section {
//           padding: 4rem 1.5rem;
//           background: linear-gradient(to right, #2563eb, #8b5cf6);
//           text-align: center;
//           color: white;
//         }
//         .cta-wrapper {
//           max-width: 900px;
//           margin: 0 auto;
//         }
//         .cta-section h2 {
//           font-size: 1.875rem;
//           font-weight: 700;
//           margin-bottom: 1rem;
//         }
//         .cta-section p {
//           color: #dbeafe;
//           font-size: 1.125rem;
//           margin-bottom: 2rem;
//         }
//         .cta-button {
//           background: white;
//           color: #2563eb;
//           padding: 0.75rem 2rem;
//           border-radius: 8px;
//           font-weight: 500;
//           text-decoration: none;
//           transition: all 0.3s ease;
//         }
//         .cta-button:hover {
//           background: #f9fafb;
//         }

//         /* Responsive typography */
//         @media (max-width: 640px) {
//           .features-header h2,
//           .cta-section h2 {
//             font-size: 1.5rem;
//           }
//           .features-header p,
//           .cta-section p {
//             font-size: 1rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Home;
