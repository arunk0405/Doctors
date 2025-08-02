import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Clock, CheckCircle, Circle, AlertCircle,
  User, Heart, Activity, ChevronRight
} from 'lucide-react';
import { mockPatients } from '../data/mockData';

const TransfusionCycle: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const patient = mockPatients.find(p => p.id === patientId);

  // Mock cycle data - in a real app, this would come from the backend
  const cycleStages = [
    {
      id: 1,
      name: 'Pre-Assessment',
      description: 'Initial health check and blood work',
      duration: '1-2 days',
      status: 'completed',
      startDate: '2024-01-13',
      endDate: '2024-01-14'
    },
    {
      id: 2,
      name: 'Blood Matching',
      description: 'Cross-matching and compatibility testing',
      duration: '1 day',
      status: 'completed',
      startDate: '2024-01-14',
      endDate: '2024-01-15'
    },
    {
      id: 3,
      name: 'Pre-Transfusion',
      description: 'Pre-medication and preparation',
      duration: '2-4 hours',
      status: 'current',
      startDate: '2024-01-15',
      endDate: null
    },
    {
      id: 4,
      name: 'Transfusion',
      description: 'Blood transfusion procedure',
      duration: '3-4 hours',
      status: 'pending',
      startDate: null,
      endDate: null
    },
    {
      id: 5,
      name: 'Post-Transfusion Monitoring',
      description: 'Observation and recovery monitoring',
      duration: '2-4 hours',
      status: 'pending',
      startDate: null,
      endDate: null
    },
    {
      id: 6,
      name: 'Follow-up Assessment',
      description: 'Post-transfusion health evaluation',
      duration: '1-2 days',
      status: 'pending',
      startDate: null,
      endDate: null
    }
  ];

  const currentStageIndex = cycleStages.findIndex(stage => stage.status === 'current');
  const progressPercent = ((currentStageIndex + 1) / cycleStages.length) * 100;

  if (!patient) {
    return (
      <div className="text-center py-12">
        <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Patient not found
        </h3>
        <Link
          to="/patients"
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Back to Patients
        </Link>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'current':
        return <Activity className="h-6 w-6 text-blue-500 animate-pulse" />;
      default:
        return <Circle className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'current':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 ring-2 ring-blue-500/20';
      default:
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to={`/patient/${patientId}`}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Transfusion Cycle
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {patient.name} ({patient.id})
            </p>
          </div>
        </div>
      </div>

      {/* Patient Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <span className="text-red-600 dark:text-red-400 font-semibold">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {patient.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {patient.bloodGroup} • {patient.age} years • {patient.gender}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Cycle Progress
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(progressPercent)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Current Stage:</span>
            <p className="font-medium text-gray-900 dark:text-white">
              {cycleStages[currentStageIndex]?.name || 'Cycle Complete'}
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Treatment Type:</span>
            <p className="font-medium text-gray-900 dark:text-white">
              {patient.treatmentType}
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Risk Level:</span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              patient.riskLevel === 'High' 
                ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                : patient.riskLevel === 'Medium'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
            }`}>
              {patient.riskLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Cycle Stages */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Transfusion Cycle Stages
        </h2>
        
        <div className="space-y-4">
          {cycleStages.map((stage, index) => (
            <div
              key={stage.id}
              className={`p-6 rounded-xl border-2 transition-all ${getStatusColor(stage.status)}`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(stage.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Stage {stage.id}: {stage.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {stage.status === 'current' && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs font-medium rounded-full animate-pulse">
                          In Progress
                        </span>
                      )}
                      {stage.status === 'completed' && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-xs font-medium rounded-full">
                          Completed
                        </span>
                      )}
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {stage.duration}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {stage.description}
                  </p>

                  {stage.startDate && (
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Started: {new Date(stage.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      {stage.endDate && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-gray-600 dark:text-gray-400">
                            Completed: {new Date(stage.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {stage.status === 'current' && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center space-x-2 mb-2">
                        <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                          Current Activity
                        </span>
                      </div>
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        Patient is currently undergoing pre-transfusion preparation. 
                        Monitoring vital signs and administering pre-medications as prescribed.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {index < cycleStages.length - 1 && stage.status !== 'pending' && (
                <div className="mt-4 ml-7 flex items-center">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                  <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600 ml-2" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
        <Link
          to={`/patient/${patientId}`}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Patient Details</span>
        </Link>
        
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
            Update Stage
          </button>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
            Complete Current Stage
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransfusionCycle;