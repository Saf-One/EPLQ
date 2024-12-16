import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/config';
import { log } from '../utils/logger';

interface HeaderProps {
  user: any;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const handleLogout = () => {
    auth.signOut()
      .then(() => log('info', 'User logged out', { userId: user.uid }))
      .catch((error) => log('error', 'Logout failed', { error }));
  };

  return (
    <header className="app-header">
      <h1>EPLQ System</h1>
      <nav>
        {user ? (
          <>
            <span>Welcome, {user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/admin/login">Admin Login</Link>
            <Link to="/user/login">User Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

