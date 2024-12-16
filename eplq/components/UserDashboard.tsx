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
    <div className="user-dashboard">
      <h2>User Dashboard</h2>
      <form onSubmit={handleSearch}>
        <select 
          value={searchField} 
          onChange={(e) => setSearchField(e.target.value)}
          required
        >
          <option value="">Select field to search</option>
          <option value="name">Name</option>
          <option value="address">Address</option>
          <option value="type">Type</option>
        </select>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search query"
          required
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{JSON.stringify(result)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

