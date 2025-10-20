import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Nav = () => {
  const { logout, authUser, isAdmin } = useAuthStore();

  return (
    <div className='container-fluid'>
      <nav className='navbar d-flex justify-content-between align-items-center p-3 fixed-top-70'>
        <div>
          <Link to='/'><h1 className='nav-logo m-0'>Skill Evaluator</h1></Link>
        </div>
        <div>
          <ul className='navbar-nav d-flex flex-row gap-3 align-items-center m-0'>
            {!authUser && (
              <>
                <li className='nav-item'>
                  <Link to='/login'>Login</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/register'>Register</Link>
                </li>
              </>
            )}

            {authUser && !isAdmin() && (
              <>
                <li className='nav-item'>
                  <Link to='/skills'>Skills Dashboard</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/assist'>AI Assistant</Link>
                </li>
                <li className='nav-item'>
                  <button className='btn text-danger' onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            )}

            {authUser && isAdmin() && (
              <>
                <li className="nav-item">
                  <Link to="/admin/dashboard">Dashboard</Link>
              </li>
                <li className='nav-item'>
                  <Link to='/admin/skills'>Skills</Link>
                </li>
                <li className='nav-item'>
                  <Link to='/admin/users'>Users</Link>
                </li>
                <li className='nav-item'>
                  <button className='btn text-danger' onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
