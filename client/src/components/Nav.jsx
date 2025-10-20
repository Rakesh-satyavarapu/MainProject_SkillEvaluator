import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Nav = () => {
  const { logout, authUser, isAdmin } = useAuthStore();

  return (
    <div className="nav-wrapper">
      <nav className="navbar d-flex justify-content-between align-items-center p-3 custom-navbar">
        {/* Logo */}
        <div>
          <Link to="/" className="nav-logo-link">
            <h1 className="nav-logo m-0">Skill Evaluator</h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <div>
          <ul className="navbar-nav d-flex flex-row gap-3 align-items-center m-0 nav-links">
            {!authUser && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link-custom">
                    🔑 Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link-custom">
                    📝 Register
                  </Link>
                </li>
              </>
            )}

            {authUser && !isAdmin() && (
              <>
                <li className="nav-item">
                  <Link to="/skills" className="nav-link-custom gradient-link">
                    <span className="emoji">💡</span>
                    <span className="gradient-text"> Skills Dashboard</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/assist" className="nav-link-custom gradient-link">
                    <span className="emoji">🤖</span>
                    <span className="gradient-text"> AI Assistant</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn logout-btn" onClick={logout}>
                    🚪 Logout
                  </button>
                </li>
              </>
            )}

            {authUser && isAdmin() && (
              <>
                <li className="nav-item">
                  <Link to="/admin/dashboard" className="nav-link-custom gradient-link">
                    <span className="emoji">📊</span>
                    <span className="gradient-text"> Dashboard</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/skills" className="nav-link-custom gradient-link">
                    <span className="emoji">🛠️</span>
                    <span className="gradient-text"> Skills</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/users" className="nav-link-custom gradient-link">
                    <span className="emoji">👥</span>
                    <span className="gradient-text"> Users</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn logout-btn" onClick={logout}>
                    🚪 Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Embedded CSS */}
      <style>{`
        /* ===== Overall Navbar Wrapper ===== */
        .nav-wrapper {
          position: sticky;
          top: 0;
          z-index: 9999;
        }

        /* ===== Main Navbar ===== */
        .custom-navbar {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.7);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          width: 100%;
        }

        /* ===== Logo ===== */
        .nav-logo-link {
          text-decoration: none;
        }

        .nav-logo {
          font-size: 1.8rem;
          font-weight: 800;
          background: linear-gradient(90deg, #007bff, #6610f2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.5px;
          transition: transform 0.3s ease;
        }

        .nav-logo:hover {
          transform: scale(1.05);
        }

        /* ===== Links ===== */
        .nav-links .nav-item {
          list-style: none;
        }

        .nav-link-custom {
          text-decoration: none;
          font-weight: 500;
          color: #0a58ca;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 4px;
          position: relative;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .nav-link-custom::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, #007bff, #6610f2);
          transition: width 0.3s ease;
        }

        .nav-link-custom:hover::after {
          width: 100%;
        }

        .nav-link-custom:hover {
          transform: translateY(-2px);
        }

        /* ===== Gradient Text (not emoji) ===== */
        .gradient-text {
          background: linear-gradient(90deg, #007bff, #6610f2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 600;
        }

        /* ===== Emoji kept normal color ===== */
        .emoji {
          font-size: 1.1rem;
        }

        .gradient-link:hover .gradient-text {
          transform: scale(1.05);
        }

        /* ===== Logout Button ===== */
        .logout-btn {
          color: #ff4d4f;
          font-weight: 600;
          border: 1px solid #ff4d4f;
          background: transparent;
          padding: 4px 10px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: #ff4d4f;
          color: #fff;
        }

        /* ===== Responsive Styles ===== */
        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 10px;
            padding: 1rem;
          }

          .nav-links {
            flex-direction: column;
            gap: 8px;
            width: 100%;
          }

          .nav-logo {
            font-size: 1.5rem;
          }

          .nav-link-custom {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .nav-logo {
            font-size: 1.3rem;
          }

          .nav-link-custom {
            font-size: 0.9rem;
          }

          .logout-btn {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Nav;
