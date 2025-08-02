import React from 'react';
import { Moon, Sun, Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/patients':
        return 'Patient Management';
      case '/schedule':
        return 'Transfusion Schedule';
      case '/add-patient':
        return 'Add New Patient';
      default:
        if (location.pathname.startsWith('/patient/')) {
          return 'Patient Details';
        }
        if (location.pathname.startsWith('/transfusion-cycle/')) {
          return 'Transfusion Cycle';
        }
        return 'Dashboard';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-red-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white fill-current" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  ThalCare
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Management System
                </p>
              </div>
            </Link>
            <div className="hidden md:block h-6 w-px bg-gray-300 dark:bg-gray-600" />
            <h2 className="hidden md:block text-lg font-semibold text-gray-700 dark:text-gray-300">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Dr. Sarah Johnson
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Hematologist
                </p>
              </div>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">SJ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;