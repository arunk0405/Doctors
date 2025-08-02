import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Calendar, Search, UserPlus, AlertTriangle, Clock } from 'lucide-react';
import { mockPatients, mockScheduledTransfusions } from '../data/mockData';

const Dashboard: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

  const totalPatients = mockPatients.length;
  const scheduledTransfusions = mockScheduledTransfusions.length;
  const overdueTransfusions = mockScheduledTransfusions.filter(t => t.status === 'Overdue').length;
  const highRiskPatients = mockPatients.filter(p => p.riskLevel === 'High').length;

  const handleSearch = () => {
    if (searchId.trim()) {
      navigate(`/patient/${searchId.toUpperCase()}`);
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <span className="text-red-600 dark:text-red-400 text-xl font-bold">SJ</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, Dr. Johnson! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Thank you for providing exceptional care. Your expertise saves lives.
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Today</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Alert Section */}
      {(overdueTransfusions > 0 || highRiskPatients > 0) && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <h3 className="font-semibold text-amber-800 dark:text-amber-200">
              Urgent Attention Required
            </h3>
          </div>
          <div className="mt-2 flex flex-wrap gap-4">
            {overdueTransfusions > 0 && (
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span className="text-amber-700 dark:text-amber-300">
                  {overdueTransfusions} overdue transfusion{overdueTransfusions > 1 ? 's' : ''}
                </span>
              </div>
            )}
            {highRiskPatients > 0 && (
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span className="text-red-700 dark:text-red-300">
                  {highRiskPatients} high-risk patient{highRiskPatients > 1 ? 's' : ''} require monitoring
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          to="/patients"
          className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-red-300 dark:hover:border-red-600 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-800/30 transition-colors">
                  <Users className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Total Patients
                </h3>
              </div>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {totalPatients}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Click to view all patients
              </p>
            </div>
            <div className="text-red-300 dark:text-red-600 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </Link>

        <Link 
          to="/schedule"
          className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-red-300 dark:hover:border-red-600 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-800/30 transition-colors">
                  <Calendar className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Transfusions Scheduled
                </h3>
              </div>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {scheduledTransfusions}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Click to view schedule
              </p>
            </div>
            <div className="text-red-300 dark:text-red-600 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Search and Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Patient by ID
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                placeholder="Enter Patient ID (e.g., TH001)"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Add Patient */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Patient Management
            </label>
            <Link
              to="/add-patient"
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span>Add New Patient</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {mockScheduledTransfusions.slice(0, 3).map((transfusion) => (
            <div key={transfusion.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  transfusion.status === 'Overdue' ? 'bg-red-500' :
                  transfusion.priority === 'High' ? 'bg-amber-500' : 'bg-green-500'
                }`} />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {transfusion.patientName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {transfusion.scheduledDate} at {transfusion.scheduledTime}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                transfusion.status === 'Overdue' 
                  ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              }`}>
                {transfusion.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;