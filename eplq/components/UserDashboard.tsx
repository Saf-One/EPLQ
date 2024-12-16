import React, { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { log } from '../utils/logger';
import { encryptData, decryptData } from '../utils/crypto';

const UserDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSearchResults([]);

    if (!searchField) {
      setError('Please select a field to search');
      return;
    }

    try {
      const encryptedQuery = encryptData(searchQuery.toLowerCase());
      const q = query(
        collection(db, 'locations'), 
        where(`searchableFields.${searchField}`, '==', encryptedQuery)
      );
      const querySnapshot = await getDocs(q);
      
      const results = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return JSON.parse(decryptData(data.data));
      });

      setSearchResults(results);
      log('info', 'User performed search', { field: searchField, query: searchQuery });
    } catch (error: any) {
      setError(error.message);
      log('error', 'Search failed', { error: error.message });
    }
  };

  return (
    <div className="container mx-auto mt-8 max-w-md">
      <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
      <form onSubmit={handleSearch} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchField">
            Search Field
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="searchField"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            required
          >
            <option value="">Select field to search</option>
            <option value="name">Name</option>
            <option value="address">Address</option>
            <option value="type">Type</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchQuery">
            Search Query
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="searchQuery"
            type="text"
            placeholder="Enter search query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
      {searchResults.length > 0 && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h3 className="text-xl font-bold mb-4">Search Results:</h3>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index} className="mb-2 p-2 bg-gray-100 rounded">
                {JSON.stringify(result)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

