'use client';

import React, { useState } from 'react';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AdminDashboard() {
  // Always call hooks at the top.
  const { data, error } = useSWR('/api/participants', fetcher, {
    refreshInterval: 5000,
  });
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Conditional rendering after hooks have been called.
  if (error)
    return <div className="text-center py-10">Error loading data.</div>;
  if (!data)
    return <div className="text-center py-10">Loading...</div>;

  const capacity = 60;
  const participants = data.participants || [];
  const overallCount = participants.length;
  const seatsRemaining = capacity - overallCount;

  // Unique departments and years.
  const departments = Array.from(new Set(participants.map((p) => p.department)));
  const years = Array.from(new Set(participants.map((p) => p.year))).sort();

  // Filter participants.
  const filteredParticipants = participants.filter((p) => {
    const matchDept =
      selectedDepartment === 'all' || p.department === selectedDepartment;
    const matchYear =
      selectedYear === 'all' || p.year === selectedYear;
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchDept && matchYear && matchSearch;
  });

  // Compute summary counts by department.
  const summary = participants.reduce((acc, p) => {
    acc[p.department] = (acc[p.department] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Banner: Seats remaining or full */}
        {seatsRemaining <= 0 ? (
          <div className="bg-red-600 text-white text-center p-4 rounded-lg mb-6 animate-pulse shadow-lg">
            <span role="img" aria-label="confetti">🎉</span> Registrations are FULL! <span role="img" aria-label="confetti">🎉</span>
          </div>
        ) : (
          <div className="bg-green-600 text-white text-center p-4 rounded-lg mb-6 shadow-lg">
            <span role="img" aria-label="seats">💺</span> Total Seats Remaining: {seatsRemaining}
          </div>
        )}

        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <p className="text-sm text-gray-600">Total Participants</p>
            <p className="text-3xl font-bold text-blue-600">{overallCount}</p>
          </div>
          {Object.entries(summary).map(([dept, count]) => (
            <div key={dept} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <p className="text-sm text-gray-600">{dept}</p>
              <p className="text-3xl font-bold text-blue-600">{count}</p>
            </div>
          ))}
        </div>

        {/* Filter Panel */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-600 mb-1">Department</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-600 mb-1">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or email"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Participants Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-purple-500 to-blue-500">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  USN
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                  Year
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredParticipants.length > 0 ? (
                filteredParticipants.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-100 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{p.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{p.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{p.usn}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{p.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">{p.year}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No participants found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
