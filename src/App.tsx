import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AccessProvider } from './contexts/AccessContext';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import Users from './pages/Users';
import AccessControl from './pages/AccessControl';
import Reports from './pages/Reports';

// Simple placeholder components for testing
const Navigation = () => (
  <nav className="bg-white shadow-sm border-b border-gray-200">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-gray-900">Access Control Hub</span>
          </div>
        </div>
        
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <a href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              Dashboard
            </a>
            <a href="/applications" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              Applications
            </a>
            <a href="/users" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              Users
            </a>
            <a href="/access-control" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              Access Control
            </a>
            <a href="/reports" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              Reports
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
);

function App() {
  return (
    <AccessProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/users" element={<Users />} />
              <Route path="/access-control" element={<AccessControl />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AccessProvider>
  );
}

export default App;
