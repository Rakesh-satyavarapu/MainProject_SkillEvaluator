import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Nav = () => {
  const { logout, authUser, isAdmin } = useAuthStore();

  return (
    <div className="nav-wrapper">
      <nav className="navbar custom-navbar px-3 px-md-5">
        {/* Logo */}
        <Link to="/" className="nav-logo-link">
          <h1 className="nav-logo m-0">Skill Evaluator</h1>
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-nav d-flex flex-row align-items-center m-0 nav-links">
          {!authUser && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link-custom">🔑 Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link-custom">📝 Register</Link>
              </li>
            </>
          )}

          {authUser && !isAdmin() && (
            <>
              <li className="nav-item">
                <Link to="/skills" className="nav-link-custom gradient-link">
                  💡 <span className="gradient-text">Skills Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/assist" className="nav-link-custom gradient-link">
                  🤖 <span className="gradient-text">AI Assistant</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/request" className="nav-link-custom gradient-link">
                  @ <span className="gradient-text">Request Skill</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link-custom gradient-link">
                  👤 <span className="gradient-text">Profile</span>
                </Link>
              </li>
            </>
          )}

          {authUser && isAdmin() && (
            <>
              <li className="nav-item">
                <Link to="/admin/dashboard" className="nav-link-custom gradient-link">
                  📊 <span className="gradient-text">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/skills" className="nav-link-custom gradient-link">
                  🛠️ <span className="gradient-text">Skills</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/users" className="nav-link-custom gradient-link">
                  👥 <span className="gradient-text">Users</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link-custom gradient-link">
                  👤 <span className="gradient-text">Profile</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Embedded CSS */}
      <style>{`
        /* ===== Wrapper ===== */
        .nav-wrapper {
          position: sticky;
          top: 0;
          z-index: 9999;
          width: 100%;
        }

        /* ===== Navbar Styling ===== */
        .custom-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.85);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          padding: 0.8rem 1.5rem;
          transition: all 0.3s ease;
          flex-wrap: wrap;
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
          margin-right: 1rem;
          white-space: nowrap;
        }

        /* ===== Nav Links ===== */
        .nav-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 1.5rem;
        }

        .nav-item {
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
          transition: all 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }

        .nav-link-custom::after {
          content: "";
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, #007bff, #6610f2);
          transition: width 0.3s ease;
        }

        .nav-link-custom:hover::after {
          width: 100%;
        }

        .gradient-text {
          background: linear-gradient(90deg, #007bff, #6610f2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 600;
        }

        /* ===== Logout Link ===== */
        .logout-link {
          color: #d82013ff;
          font-weight: 500;
        }

        .logout-link:hover {
          color: #d46918ff;
        }

        /* ===== Responsive ===== */
        @media (max-width: 992px) {
          .custom-navbar {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.8rem;
          }

          .nav-links {
            width: 100%;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
          }

          .nav-logo {
            font-size: 1.6rem;
          }
        }

        @media (max-width: 600px) {
          .custom-navbar {
            padding: 0.8rem 1rem;
          }

          .nav-links {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.6rem;
          }

          .nav-logo {
            font-size: 1.4rem;
          }

          .nav-link-custom {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Nav;
