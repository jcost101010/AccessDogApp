import React, { useState } from 'react';
import { useAccess } from '../contexts/AccessContext';
import { BarChart3, Download, Eye, Users as UsersIcon, Shield, AppWindow } from 'lucide-react';
import { AccessReport } from '../types';

const Reports: React.FC = () => {
  const { state, generateAccessReport } = useAccess();
  const [selectedApplication, setSelectedApplication] = useState<string>('');
  const [currentReport, setCurrentReport] = useState<AccessReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = () => {
    if (!selectedApplication) return;
    
    setIsGenerating(true);
    try {
      const report = generateAccessReport(selectedApplication);
      setCurrentReport(report);
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error generating report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportReport = () => {
    if (!currentReport) return;
    
    const reportData = {
      applicationName: currentReport.applicationName,
      totalUsers: currentReport.totalUsers,
      reportGeneratedAt: currentReport.reportGeneratedAt.toLocaleString(),
      usersByAccessLevel: currentReport.usersByAccessLevel.map(level => ({
        accessLevel: level.accessLevelName,
        userCount: level.userCount,
        users: level.users.map(user => ({
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department
        }))
      })),
      customPermissions: currentReport.customPermissions.map(permission => ({
        name: permission.name,
        description: permission.description,
        resource: permission.resource,
        action: permission.action
      }))
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `access-report-${currentReport.applicationName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getApplicationStats = (applicationId: string) => {
    const accessEntries = state.userAccess.filter(access => access.applicationId === applicationId && access.isActive);
    const usersByLevel = state.accessLevels.map(level => {
      const count = accessEntries.filter(access => access.accessLevelId === level.id).length;
      return { level, count };
    });
    
    return {
      totalUsers: accessEntries.length,
      usersByLevel: usersByLevel.filter(item => item.count > 0)
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Generate access control reports for applications</p>
        </div>
      </div>

      {/* Report Generator */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Access Report</h2>
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <label htmlFor="application-select" className="block text-sm font-medium text-gray-700 mb-2">
              Select Application
            </label>
            <select
              id="application-select"
              value={selectedApplication}
              onChange={(e) => setSelectedApplication(e.target.value)}
              className="input-field"
            >
              <option value="">Choose an application</option>
              {state.applications.filter(app => app.isActive).map(app => (
                <option key={app.id} value={app.id}>{app.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleGenerateReport}
            disabled={!selectedApplication || isGenerating}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BarChart3 className="h-4 w-4" />
            <span>{isGenerating ? 'Generating...' : 'Generate Report'}</span>
          </button>
        </div>
      </div>

      {/* Application Overview Cards */}
      {selectedApplication && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {state.applications
            .filter(app => app.id === selectedApplication)
            .map(app => {
              const stats = getApplicationStats(app.id);
              return (
                <div key={app.id} className="card">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <AppWindow className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{app.name}</h3>
                      <p className="text-sm text-gray-500">{app.category}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Users</span>
                      <span className="font-semibold text-gray-900">{stats.totalUsers}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Access Levels</span>
                      <span className="font-semibold text-gray-900">{stats.usersByLevel.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Custom Permissions</span>
                      <span className="font-semibold text-gray-900">{app.customPermissions.length}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Generated Report */}
      {currentReport && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Access Report: {currentReport.applicationName}
            </h2>
            <button
              onClick={handleExportReport}
              className="btn-primary flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <UsersIcon className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Total Users</p>
                  <p className="text-2xl font-bold text-blue-900">{currentReport.totalUsers}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-900">Access Levels</p>
                  <p className="text-2xl font-bold text-green-900">{currentReport.usersByAccessLevel.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <AppWindow className="h-6 w-6 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-purple-900">Custom Permissions</p>
                  <p className="text-2xl font-bold text-purple-900">{currentReport.customPermissions.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Users by Access Level */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Users by Access Level</h3>
            {currentReport.usersByAccessLevel.map((level) => (
              <div key={level.accessLevelId} className="border border-gray-200 rounded-lg">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">{level.accessLevelName}</h4>
                    <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                      {level.userCount} users
                    </span>
                  </div>
                </div>
                
                {level.users.length > 0 ? (
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {level.users.map((user) => (
                        <div key={user.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary-600">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                            {user.department && (
                              <p className="text-xs text-gray-400">{user.department}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No users with this access level
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Custom Permissions */}
          {currentReport.customPermissions.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Custom Permissions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentReport.customPermissions.map((permission) => (
                  <div key={permission.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{permission.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        permission.action === 'read' ? 'bg-blue-100 text-blue-800' :
                        permission.action === 'write' ? 'bg-green-100 text-green-800' :
                        permission.action === 'delete' ? 'bg-red-100 text-red-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {permission.action}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{permission.description}</p>
                    <p className="text-xs text-gray-500 mt-2">Resource: {permission.resource}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-500">
            Report generated on {currentReport.reportGeneratedAt.toLocaleString()}
          </div>
        </div>
      )}

      {/* Quick Stats for All Applications */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats - All Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {state.applications.filter(app => app.isActive).map(app => {
            const stats = getApplicationStats(app.id);
            return (
              <div key={app.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                   onClick={() => setSelectedApplication(app.id)}>
                <div className="flex items-center space-x-3 mb-2">
                  <AppWindow className="h-4 w-4 text-gray-400" />
                  <h3 className="font-medium text-gray-900 text-sm">{app.name}</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                <p className="text-xs text-gray-500">active users</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reports;
