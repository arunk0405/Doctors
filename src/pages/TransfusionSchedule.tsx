import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, AlertTriangle, User, Filter } from 'lucide-react';
import { mockScheduledTransfusions } from '../data/mockData';
import { format } from 'date-fns';

const TransfusionSchedule: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<'All' | 'Scheduled' | 'Overdue' | 'Completed' | 'Cancelled'>('All');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'patient'>('date');

  const filteredAndSortedTransfusions = useMemo(() => {
    let filtered = mockScheduledTransfusions;

    if (filterStatus !== 'All') {
      filtered = filtered.filter(transfusion => transfusion.status === filterStatus);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'patient':
          return a.patientName.localeCompare(b.patientName);
        default:
          return new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime();
      }
    });
  }, [filterStatus, sortBy]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Cancelled':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Transfusion Schedule
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor and manage upcoming transfusion appointments
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="All">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Overdue">Overdue</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="patient">Sort by Patient</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['All', 'Scheduled', 'Overdue', 'Completed'].map((status) => {
          const count = status === 'All' 
            ? mockScheduledTransfusions.length 
            : mockScheduledTransfusions.filter(t => t.status === status).length;
          
          return (
            <div
              key={status}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {status}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {count}
                  </p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  status === 'Overdue' ? 'bg-red-500' :
                  status === 'Completed' ? 'bg-green-500' :
                  status === 'Scheduled' ? 'bg-blue-500' : 'bg-gray-500'
                }`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing {filteredAndSortedTransfusions.length} of {mockScheduledTransfusions.length} transfusions
      </div>

      {/* Transfusion List */}
      <div className="space-y-4">
        {filteredAndSortedTransfusions.map((transfusion) => (
          <div
            key={transfusion.id}
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-l-4 p-6 ${
              transfusion.status === 'Overdue' 
                ? 'border-l-red-500 bg-red-50/50 dark:bg-red-900/10' 
                : transfusion.priority === 'High'
                ? 'border-l-amber-500'
                : 'border-l-blue-500'
            } border-r border-t border-b border-gray-200 dark:border-gray-700`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/patient/${transfusion.patientId}`}
                      className="text-lg font-semibold text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      {transfusion.patientName}
                    </Link>
                    <Link
                      to={`/patient/${transfusion.patientId}`}
                      className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                    >
                      ({transfusion.patientId})
                    </Link>
                  </div>
                  {transfusion.status === 'Overdue' && (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Blood Type</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {transfusion.bloodType}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Stage</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {transfusion.stage}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Date & Time</p>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatDate(transfusion.scheduledDate)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {transfusion.scheduledTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(transfusion.priority)}`}>
                  {transfusion.priority} Priority
                </span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(transfusion.status)}`}>
                  {transfusion.status}
                </span>
                <Link
                  to={`/patient/${transfusion.patientId}`}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium transition-colors"
                >
                  View Patient →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedTransfusions.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No transfusions found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default TransfusionSchedule;