import React, { useState } from 'react';
import { useAccess } from '../contexts/AccessContext';
import { AppWindow, Plus, Edit, Trash2, ExternalLink, Shield } from 'lucide-react';
import { Application, AccessLevel } from '../types';
import ApplicationModal from '../components/ApplicationModal';

const Applications: React.FC = () => {
  const { state, dispatch } = useAccess();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const handleAddApplication = () => {
    setEditingApplication(null);
    setIsModalOpen(true);
  };

  const handleEditApplication = (application: Application) => {
    setEditingApplication(application);
    setIsModalOpen(true);
  };

  const handleDeleteApplication = (applicationId: string) => {
    if (window.confirm('Are you sure you want to delete this application? This will also remove all user access to it.')) {
      dispatch({ type: 'DELETE_APPLICATION', payload: applicationId });
    }
  };

  const handleSaveApplication = (application: Omit<Application, 'id' | 'createdAt'>) => {
    if (editingApplication) {
      dispatch({
        type: 'UPDATE_APPLICATION',
        payload: { ...editingApplication, ...application }
      });
    } else {
      const newApplication: Application = {
        ...application,
        id: Date.now().toString(),
        createdAt: new Date(),
        accessLevels: state.accessLevels,
        customPermissions: []
      };
      dispatch({ type: 'ADD_APPLICATION', payload: newApplication });
    }
    setIsModalOpen(false);
    setEditingApplication(null);
  };

  const getAccessLevelsForApp = (application: Application) => {
    return application.accessLevels.map(level => level.name).join(', ');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-600">Manage your applications and their access levels</p>
        </div>
        <button
          onClick={handleAddApplication}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Application</span>
        </button>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.applications.map((application) => (
          <div key={application.id} className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <AppWindow className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{application.name}</h3>
                  <p className="text-sm text-gray-500">{application.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditApplication(application)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteApplication(application.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{application.description}</p>

            {application.url && (
              <div className="flex items-center space-x-2 mb-4">
                <ExternalLink className="h-4 w-4 text-gray-400" />
                <a
                  href={application.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm"
                >
                  {application.url}
                </a>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {application.accessLevels.length} access levels
                </span>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  application.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {application.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Access Levels:</p>
              <div className="flex flex-wrap gap-1">
                {application.accessLevels.slice(0, 3).map((level) => (
                  <span
                    key={level.id}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {level.name}
                  </span>
                ))}
                {application.accessLevels.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    +{application.accessLevels.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Custom Permissions:</p>
              <div className="flex flex-wrap gap-1">
                {application.customPermissions.length > 0 ? (
                  application.customPermissions.map((permission) => (
                    <span
                      key={permission.id}
                      className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded"
                    >
                      {permission.name}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-400">None</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingApplication(null);
        }}
        onSave={handleSaveApplication}
        application={editingApplication}
        accessLevels={state.accessLevels}
      />
    </div>
  );
};

export default Applications;

