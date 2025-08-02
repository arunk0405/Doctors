import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import TransfusionSchedule from './pages/TransfusionSchedule';
import PatientDetails from './pages/PatientDetails';
import AddPatient from './pages/AddPatient';
import TransfusionCycle from './pages/TransfusionCycle';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patients" element={<PatientList />} />
              <Route path="/schedule" element={<TransfusionSchedule />} />
              <Route path="/patient/:id" element={<PatientDetails />} />
              <Route path="/add-patient" element={<AddPatient />} />
              <Route path="/transfusion-cycle/:patientId" element={<TransfusionCycle />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;