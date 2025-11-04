import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard, Bot, User, BookOpen, Users, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

const Nav = () => {
  const { authUser, isAdmin } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const isActive = (path) => location.pathname === path;

  const userLinks = [
    { to: '/skills', label: 'Skills', icon: BookOpen },
    { to: '/assist', label: 'AI Assistant', icon: Bot },
    { to: '/request', label: 'Request Skill', icon: Sparkles },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/skills', label: 'Skills', icon: BookOpen },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  const navLinks = authUser ? (isAdmin() ? adminLinks : userLinks) : [];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="flex h-16 items-center justify-between px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Skill Evaluator
            </span>
          </motion.div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-2">
          {!authUser ? (
            <>
              <Link
                to="/login"
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium text-gray-700",
                  "hover:bg-gray-100 hover:text-primary-600 transition-all"
                )}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium text-white",
                  "bg-gradient-to-r from-primary-600 to-secondary-600",
                  "hover:shadow-lg hover:scale-105 transition-all"
                )}
              >
                Register
              </Link>
            </>
          ) : (
            navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMobileMenu}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(link.to)
                      ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100 hover:text-primary-600"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-white"
          >
            <div className="px-4 py-4 space-y-2">
              {!authUser ? (
                <>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-center font-medium"
                  >
                    Register
                  </Link>
                </>
              ) : (
                navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={closeMobileMenu}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                        isActive(link.to)
                          ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;





// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuthStore } from '../store/useAuthStore';

// const Nav = () => {
//   const { logout, authUser, isAdmin } = useAuthStore();

//   return (
//     <div className="nav-wrapper">
//       <nav className="navbar custom-navbar px-3 px-md-5">
//         {/* Logo */}
//         <Link to="/" className="nav-logo-link">
//           <h1 className="nav-logo m-0">Skill Evaluator</h1>
//         </Link>

//         {/* Navigation Links */}
//         <ul className="navbar-nav d-flex flex-row align-items-center m-0 nav-links">
//           {!authUser && (
//             <>
//               <li className="nav-item">
//                 <Link to="/login" className="nav-link-custom">🔑 Login</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/register" className="nav-link-custom">📝 Register</Link>
//               </li>
//             </>
//           )}

//           {authUser && !isAdmin() && (
//             <>
//               <li className="nav-item">
//                 <Link to="/skills" className="nav-link-custom gradient-link">
//                   💡 <span className="gradient-text">Skills Dashboard</span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/assist" className="nav-link-custom gradient-link">
//                   🤖 <span className="gradient-text">AI Assistant</span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/request" className="nav-link-custom gradient-link">
//                   @ <span className="gradient-text">Request Skill</span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/profile" className="nav-link-custom gradient-link">
//                   👤 <span className="gradient-text">Profile</span>
//                 </Link>
//               </li>
//             </>
//           )}

//           {authUser && isAdmin() && (
//             <>
//               <li className="nav-item">
//                 <Link to="/admin/dashboard" className="nav-link-custom gradient-link">
//                   📊 <span className="gradient-text">Dashboard</span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/admin/skills" className="nav-link-custom gradient-link">
//                   🛠️ <span className="gradient-text">Skills</span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/admin/users" className="nav-link-custom gradient-link">
//                   👥 <span className="gradient-text">Users</span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/profile" className="nav-link-custom gradient-link">
//                   👤 <span className="gradient-text">Profile</span>
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </nav>

//       {/* Embedded CSS */}
//       <style>{`
//         /* ===== Wrapper ===== */
//         .nav-wrapper {
//           position: sticky;
//           top: 0;
//           z-index: 9999;
//           width: 100%;
//         }

//         /* ===== Navbar Styling ===== */
//         .custom-navbar {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           backdrop-filter: blur(12px);
//           background: rgba(255, 255, 255, 0.85);
//           border-bottom: 1px solid rgba(0, 0, 0, 0.05);
//           box-shadow: 0 4px 10px rgba(0,0,0,0.05);
//           padding: 0.8rem 1.5rem;
//           transition: all 0.3s ease;
//           flex-wrap: wrap;
//         }

//         /* ===== Logo ===== */
//         .nav-logo-link {
//           text-decoration: none;
//         }

//         .nav-logo {
//           font-size: 1.8rem;
//           font-weight: 800;
//           background: linear-gradient(90deg, #007bff, #6610f2);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           letter-spacing: 0.5px;
//           margin-right: 1rem;
//           white-space: nowrap;
//         }

//         /* ===== Nav Links ===== */
//         .nav-links {
//           display: flex;
//           flex-wrap: wrap;
//           justify-content: flex-end;
//           gap: 1.5rem;
//         }

//         .nav-item {
//           list-style: none;
//         }

//         .nav-link-custom {
//           text-decoration: none;
//           font-weight: 500;
//           color: #0a58ca;
//           font-size: 1rem;
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           position: relative;
//           transition: all 0.3s ease;
//           background: none;
//           border: none;
//           cursor: pointer;
//           font-family: inherit;
//         }

//         .nav-link-custom::after {
//           content: "";
//           position: absolute;
//           bottom: -3px;
//           left: 0;
//           width: 0%;
//           height: 2px;
//           background: linear-gradient(90deg, #007bff, #6610f2);
//           transition: width 0.3s ease;
//         }

//         .nav-link-custom:hover::after {
//           width: 100%;
//         }

//         .gradient-text {
//           background: linear-gradient(90deg, #007bff, #6610f2);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           font-weight: 600;
//         }

//         /* ===== Logout Link ===== */
//         .logout-link {
//           color: #d82013ff;
//           font-weight: 500;
//         }

//         .logout-link:hover {
//           color: #d46918ff;
//         }

//         /* ===== Responsive ===== */
//         @media (max-width: 992px) {
//           .custom-navbar {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 0.8rem;
//           }

//           .nav-links {
//             width: 100%;
//             justify-content: center;
//             gap: 1rem;
//             flex-wrap: wrap;
//           }

//           .nav-logo {
//             font-size: 1.6rem;
//           }
//         }

//         @media (max-width: 600px) {
//           .custom-navbar {
//             padding: 0.8rem 1rem;
//           }

//           .nav-links {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 0.6rem;
//           }

//           .nav-logo {
//             font-size: 1.4rem;
//           }

//           .nav-link-custom {
//             font-size: 0.95rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Nav;
