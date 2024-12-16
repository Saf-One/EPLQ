import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto mt-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Welcome to EPLQ System</h2>
      <p className="mb-8">Efficient Privacy-Preserving Location-Based Query</p>
      <div className="flex justify-center space-x-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Admin</h3>
          <Link to="/admin/login" className="block mb-2 text-indigo-600">Login</Link>
          <Link to="/admin/register" className="block text-indigo-600">Register</Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">User</h3>
          <Link to="/user/login" className="block mb-2 text-indigo-600">Login</Link>
          <Link to="/user/register" className="block text-indigo-600">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

