import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User, Phone, MapPin, AlertTriangle, FileText, 
  Activity, Plus, Edit3, Clock, Stethoscope, TestTube,
  Heart, ChevronRight, Save, X, StopCircle, Pill
} from 'lucide-react';
import { mockPatients, mockScheduledTransfusions } from '../data/mockData';
import { format } from 'date-fns';

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patient = mockPatients.find((p: any) => p.id === id);
  
  // Check if patient has an active transfusion plan
  const hasActiveTransfusionPlan = patient ? 
    mockScheduledTransfusions.some(schedule => 
      schedule.patientId === patient.id && 
      (schedule.status === 'Scheduled' || schedule.status === 'Overdue')
    ) : false;
  
  const [isEditingInterval, setIsEditingInterval] = useState(false);
  const [newInterval, setNewInterval] = useState(patient?.transfusionInterval || 21);
  const [notes, setNotes] = useState('');
  const [showAIPrediction, setShowAIPrediction] = useState(false);
  const [aiPredictedDays, setAiPredictedDays] = useState(18);
  const [showStopCycleModal, setShowStopCycleModal] = useState(false);
  const [showChelationModal, setShowChelationModal] = useState(false);
  const [chelationForm, setChelationForm] = useState({
    days: '',
    timing: '',
    dose: ''
  });

  if (!patient) {
    return (
      <div className="text-center py-12">
        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Patient not found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          The patient with ID "{id}" could not be found.
        </p>
        <Link
          to="/patients"
          className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Back to Patients
        </Link>
      </div>
    );
  }

  const handleUpdateInterval = () => {
    // Simulate API call
    console.log('Updating interval to:', newInterval, 'Notes:', notes);
    setIsEditingInterval(false);
    setNotes('');
  };

  const handleAIPrediction = () => {
    // Simulate AI prediction
    const predictions = [14, 16, 18, 21, 24];
    const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
    setAiPredictedDays(randomPrediction);
    setShowAIPrediction(true);
  };

  const handleStopCycle = () => {
    if (patient) {
      // Simulate updating patient - in real app this would call an API
      console.log('Stopping transfusion cycle for patient:', patient.id);
      setShowStopCycleModal(false);
      // You could show a success message here
    }
  };

  const handleCreateChelation = () => {
    if (patient) {
      const chelationSchedule = {
        id: Date.now().toString(),
        patientId: patient.id,
        days: parseInt(chelationForm.days),
        timing: chelationForm.timing,
        dose: chelationForm.dose,
        startDate: new Date().toISOString().split('T')[0],
        status: 'active' as const
      };

      // Simulate updating patient - in real app this would call an API
      console.log('Creating chelation schedule:', chelationSchedule);
      setShowChelationModal(false);
      setChelationForm({ days: '', timing: '', dose: '' });
      // You could show a success message here
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <Link to="/patients" className="hover:text-red-600 dark:hover:text-red-400">
          Patients
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900 dark:text-white font-medium">{patient.name}</span>
      </nav>

      {/* Patient Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <span className="text-red-600 dark:text-red-400 text-xl font-bold">
                {patient.name.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {patient.name}
              </h1>
              <p className="text-red-600 dark:text-red-400 font-medium">
                {patient.id}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {patient.age} years • {patient.gender} • {patient.bloodGroup}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(patient.riskLevel)}`}>
                  {patient.riskLevel} Risk
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {patient.riskLevel === 'High' && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-red-700 dark:text-red-400">
                  Requires Close Monitoring
                </span>
              </div>
            )}
            <Link
              to={`/transfusion-cycle/${patient.id}`}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              View Transfusion Cycle
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Contact Number
                </label>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900 dark:text-white">{patient.contactNumber}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Emergency Contact
                </label>
                <span className="text-gray-900 dark:text-white">{patient.emergencyContact}</span>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Address
                </label>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-900 dark:text-white">{patient.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Stethoscope className="h-5 w-5 mr-2" />
              Medical Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Diagnosis
                </label>
                <span className="text-gray-900 dark:text-white font-medium">{patient.diagnosis}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Treatment Type
                </label>
                <span className="text-gray-900 dark:text-white">{patient.treatmentType}</span>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Medical History
                </label>
                <div className="flex flex-wrap gap-2">
                  {patient.medicalHistory.map((condition: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lab Reports Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <TestTube className="h-5 w-5 mr-2" />
                Lab Reports
              </h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                <Plus className="h-4 w-4" />
                <span>Add Report</span>
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Complete Blood Count</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {format(new Date('2024-01-15'), 'MMM dd, yyyy')}
                  </p>
                </div>
                <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium">
                  View
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Iron Studies</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {format(new Date('2024-01-10'), 'MMM dd, yyyy')}
                  </p>
                </div>
                <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium">
                  View
                </button>
              </div>
            </div>
          </div>

          {/* Transfusion History */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Transfusion History
            </h3>
            <div className="space-y-4">
              {patient.transfusionHistory.map((record: any) => (
                <div key={record.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {format(new Date(record.date), 'MMM dd, yyyy')}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Dr. {record.doctorName}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded-full">
                      {record.bloodType} • {record.volume}ml
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    {record.notes}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Reactions: {record.reactions}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Last Transfusion</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {format(new Date(patient.lastTransfusion), 'MMM dd')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Next Scheduled</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {format(new Date(patient.nextTransfusion), 'MMM dd')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Current Interval</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {patient.transfusionInterval} days
                </span>
              </div>
            </div>
          </div>

          {/* AI Prediction & Schedule Transfusion */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Heart className="h-5 w-5 mr-2 text-red-500" />
              AI Scheduling Assistant
            </h3>
            
            {!showAIPrediction ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Let AI analyze the patient's current condition and predict the optimal transfusion schedule.
                </p>
                <button
                  onClick={handleAIPrediction}
                  className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Activity className="h-4 w-4" />
                  <span>Get AI Prediction</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                      AI Recommendation
                    </span>
                  </div>
                  <p className="text-lg font-bold text-blue-900 dark:text-blue-100">
                    {aiPredictedDays} days interval
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                    Based on current health metrics and treatment response
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setNewInterval(aiPredictedDays);
                      setIsEditingInterval(true);
                      setShowAIPrediction(false);
                    }}
                    className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingInterval(true);
                      setShowAIPrediction(false);
                    }}
                    className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
                  >
                    Customize
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Doctor Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Edit3 className="h-5 w-5 mr-2" />
              Doctor Actions
            </h3>
            
            {!isEditingInterval ? (
              <button
                onClick={() => setIsEditingInterval(true)}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Clock className="h-4 w-4" />
                <span>Update Transfusion Interval</span>
              </button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Days between transfusions
                  </label>
                  <input
                    type="number"
                    value={newInterval}
                    onChange={(e) => setNewInterval(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    min="1"
                    max="90"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notes (optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    rows={3}
                    placeholder="Reason for interval change..."
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleUpdateInterval}
                    className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-1"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingInterval(false);
                      setNewInterval(patient.transfusionInterval);
                      setNotes('');
                    }}
                    className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-1"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Patient Management Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Patient Management
            </h3>
            <div className="space-y-3">
              {hasActiveTransfusionPlan && (
                <button
                  onClick={() => setShowStopCycleModal(true)}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  <StopCircle className="h-4 w-4" />
                  <span>Stop Current Transfusion Cycle</span>
                </button>
              )}
              <button
                onClick={() => setShowChelationModal(true)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Pill className="h-4 w-4" />
                <span>Create Iron Chelation Schedule</span>
              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Clinical Notes
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              {patient.notes}
            </p>
          </div>
        </div>
      </div>

      {/* Stop Cycle Modal */}
      {showStopCycleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
              Stop Transfusion Cycle
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to stop the current transfusion cycle? This action will mark the cycle as completed and update the patient's status.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleStopCycle}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Yes, Stop Cycle
              </button>
              <button
                onClick={() => setShowStopCycleModal(false)}
                className="flex-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Iron Chelation Modal */}
      {showChelationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Pill className="h-5 w-5 mr-2 text-blue-600" />
              Create Iron Chelation Schedule
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of Days
                </label>
                <input
                  type="number"
                  value={chelationForm.days}
                  onChange={(e) => setChelationForm({...chelationForm, days: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Daily Timing
                </label>
                <input
                  type="time"
                  value={chelationForm.timing}
                  onChange={(e) => setChelationForm({...chelationForm, timing: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dose
                </label>
                <input
                  type="text"
                  value={chelationForm.dose}
                  onChange={(e) => setChelationForm({...chelationForm, dose: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 500mg or 2 tablets"
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={handleCreateChelation}
                disabled={!chelationForm.days || !chelationForm.timing || !chelationForm.dose}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Create Schedule
              </button>
              <button
                onClick={() => {
                  setShowChelationModal(false);
                  setChelationForm({ days: '', timing: '', dose: '' });
                }}
                className="flex-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetails;