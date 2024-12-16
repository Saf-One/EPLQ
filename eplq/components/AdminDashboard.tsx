import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { log } from '../utils/logger';
import { validateLocationData } from '../utils/validation';

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateLocationData(data)) {
      setError('Invalid data format. Please enter valid JSON.');
      return;
    }

    try {
      const locationData = JSON.parse(data);
      const encryptedData = encryptData(JSON.stringify(locationData));
      
      // Create searchable encrypted fields
      const searchableFields = Object.keys(locationData).reduce((acc, key) => {
        acc[key] = encryptData(locationData[key].toString().toLowerCase());
        return acc;
      }, {} as Record<string, string>);

      await addDoc(collection(db, 'locations'), { 
        data: encryptedData,
        searchableFields
      });

      setSuccess('Data uploaded successfully');
      setData('');
      log('info', 'Admin uploaded location data');
    } catch (error: any) {
      setError(error.message);
      log('error', 'Data upload failed', { error: error.message });
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter location data (JSON format)"
          required
        />
        <button type="submit">Upload Data</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default AdminDashboard;

