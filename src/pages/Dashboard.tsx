import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Calendar, Search, AlertTriangle, Clock, CalendarDays, Activity, Plus, BarChart3, Pill } from 'lucide-react';
import { mockPatients, mockScheduledTransfusions } from '../data/mockData';

const Dashboard: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

  const totalPatients = mockPatients.length;
  const scheduledTransfusions = mockScheduledTransfusions.length;
  const overdueTransfusions = mockScheduledTransfusions.filter(t => t.status === 'Overdue').length;
  const highRiskPatients = mockPatients.filter(p => p.riskLevel === 'High').length;
  const activeChelationTherapy = 0; // Since mockPatients don't have chelationTherapy property yet

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

  // Get upcoming appointments for the next 7 days
  const getUpcomingAppointments = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return mockScheduledTransfusions
      .filter(t => {
        const appointmentDate = new Date(t.scheduledDate);
        return appointmentDate >= today && appointmentDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
  };

  const upcomingAppointments = getUpcomingAppointments();

  // Generate calendar days for current week
  const getCalendarDays = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const calendarDays = getCalendarDays();

  const getAppointmentsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockScheduledTransfusions.filter(t => t.scheduledDate === dateStr);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Total Patients
                </h3>
              </div>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {totalPatients}
              </p>
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
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/30 transition-colors">
                  <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Scheduled
                </h3>
              </div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {scheduledTransfusions}
              </p>
            </div>
          </div>
        </Link>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
              <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Overdue
            </h3>
          </div>
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {overdueTransfusions}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Pill className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Iron Chelation Active
            </h3>
          </div>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {activeChelationTherapy}
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Calendar & Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Calendar Widget */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                <CalendarDays className="h-5 w-5 text-red-600 dark:text-red-400" />
                <span>This Week's Schedule</span>
              </h3>
              <Link 
                to="/schedule" 
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
              >
                View Full Schedule →
              </Link>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                const dayAppointments = getAppointmentsForDay(day);
                const isToday = day.toDateString() === new Date().toDateString();
                
                return (
                  <div key={index} className={`relative min-h-[80px] p-2 rounded-lg border transition-colors ${
                    isToday 
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' 
                      : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}>
                    <div className={`text-sm font-medium ${
                      isToday ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'
                    }`}>
                      {day.getDate()}
                    </div>
                    <div className="mt-1 space-y-1">
                      {dayAppointments.slice(0, 2).map((appointment, idx) => (
                        <div key={idx} className={`text-xs px-1 py-0.5 rounded text-white truncate ${
                          appointment.priority === 'High' ? 'bg-red-500' :
                          appointment.priority === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                        }`}>
                          {appointment.scheduledTime}
                        </div>
                      ))}
                      {dayAppointments.length > 2 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          +{dayAppointments.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Activity className="h-5 w-5 text-red-600 dark:text-red-400" />
              <span>Quick Actions</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Patient Search */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Search Patient by ID
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    placeholder="Enter Patient ID (e.g., TH001)"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center space-x-1 transition-colors text-sm"
                  >
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quick Actions
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/add-patient"
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Patient</span>
                  </Link>
                  <Link
                    to="/schedule"
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Schedule</span>
                  </Link>
                  <Link
                    to="/patients"
                    className="flex items-center justify-center space-x-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
                  >
                    <Users className="h-4 w-4" />
                    <span>All Patients</span>
                  </Link>
                  <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm">
                    <BarChart3 className="h-4 w-4" />
                    <span>Reports</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Upcoming Appointments & Recent Activity */}
        <div className="space-y-6">
          {/* Upcoming Appointments */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Upcoming Appointments
            </h3>
            <div className="space-y-3">
              {upcomingAppointments.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                  No appointments in the next 7 days
                </p>
              ) : (
                upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        appointment.status === 'Overdue' ? 'bg-red-500' :
                        appointment.priority === 'High' ? 'bg-amber-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {appointment.patientName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(appointment.scheduledDate).toLocaleDateString()} at {appointment.scheduledTime}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      appointment.status === 'Overdue' 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {mockScheduledTransfusions.slice(0, 4).map((transfusion) => (
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
      </div>
    </div>
  );
};

export default Dashboard;