import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import { log } from '../utils/logger';

const Header: React.FC = () => {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    auth.signOut()
      .then(() => log('info', 'User logged out', { userId: user?.uid }))
      .catch((error) => log('error', 'Logout failed', { error }));
  };

  return (
    <header className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">EPLQ System</h1>
        <nav>
          {user ? (
            <>
              <span className="mr-4">Welcome, {user.email}</span>
              <button onClick={handleLogout} className="bg-white text-indigo-600 px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/admin/login" className="mr-4">Admin Login</Link>
              <Link to="/user/login">User Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

