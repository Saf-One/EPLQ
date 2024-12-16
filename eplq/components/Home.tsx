import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="home">
      <h2>Welcome to EPLQ System</h2>
      <p>Efficient Privacy-Preserving Location-Based Query</p>
      <div className="auth-options">
        <div className="auth-option">
          <h3>Admin</h3>
          <Link to="/admin/login">Login</Link>
          <Link to="/admin/register">Register</Link>
        </div>
        <div className="auth-option">
          <h3>User</h3>
          <Link to="/user/login">Login</Link>
          <Link to="/user/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

