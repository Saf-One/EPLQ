import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { log } from '../utils/logger';
import { validateLocationData } from '../utils/validation';
import { encryptData } from '../utils/crypto';

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
    <div className="container mx-auto mt-8 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="data">
            Location Data (JSON format)
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="data"
            rows={6}
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Enter location data in JSON format"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Upload Data
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
      {success && <p className="text-green-500 text-xs italic">{success}</p>}
    </div>
  );
};

export default AdminDashboard;

