import React, { useState } from 'react';
import { useAccess } from '../contexts/AccessContext';
import { Shield, Users as UsersIcon, AppWindow, Plus, Trash2, Edit, Check, X } from 'lucide-react';
import { User, Application, AccessLevel, UserAccess } from '../types';
import AccessControlModal from '../components/AccessControlModal';

const AccessControl: React.FC = () => {
  const { state, dispatch } = useAccess();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccess, setEditingAccess] = useState<UserAccess | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<string>('all');

  const handleGrantAccess = () => {
    setEditingAccess(null);
    setIsModalOpen(true);
  };

  const handleEditAccess = (access: UserAccess) => {
    setEditingAccess(access);
    setIsModalOpen(true);
  };

  const handleRevokeAccess = (accessId: string) => {
    if (window.confirm('Are you sure you want to revoke this access?')) {
      dispatch({ type: 'REVOKE_ACCESS', payload: accessId });
    }
  };

  const handleSaveAccess = (access: Omit<UserAccess, 'id' | 'grantedAt'>) => {
    if (editingAccess) {
      dispatch({
        type: 'UPDATE_USER_ACCESS',
        payload: { ...editingAccess, ...access }
      });
    } else {
      const newAccess: UserAccess = {
        ...access,
        id: Date.now().toString(),
        grantedAt: new Date(),
        grantedBy: 'admin@company.com' // In a real app, this would come from auth context
      };
      dispatch({ type: 'GRANT_ACCESS', payload: newAccess });
    }
    setIsModalOpen(false);
    setEditingAccess(null);
  };

  const filteredAccess = state.userAccess.filter(access => {
    if (selectedApplication !== 'all' && access.applicationId !== selectedApplication) return false;
    if (selectedUser !== 'all' && access.userId !== selectedUser) return false;
    return access.isActive;
  });

  const getAccessDetails = (access: UserAccess) => {
    const user = state.users.find(u => u.id === access.userId);
    const application = state.applications.find(a => a.id === access.applicationId);
    const accessLevel = state.accessLevels.find(l => l.id === access.accessLevelId);
    return { user, application, accessLevel };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Access Control</h1>
          <p className="text-gray-600">Manage user access to applications and set privileges</p>
        </div>
        <button
          onClick={handleGrantAccess}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Grant Access</span>
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="application-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Application
            </label>
            <select
              id="application-filter"
              value={selectedApplication}
              onChange={(e) => setSelectedApplication(e.target.value)}
              className="input-field"
            >
              <option value="all">All Applications</option>
              {state.applications.map(app => (
                <option key={app.id} value={app.id}>{app.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="user-filter" className="block text-sm font-medium text-gray-700 mb-2">
              User
            </label>
            <select
              id="user-filter"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="input-field"
            >
              <option value="all">All Users</option>
              {state.users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Access Control Table */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Access Grants</h2>
        
        {filteredAccess.length === 0 ? (
          <div className="text-center py-8">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No access grants found for the selected filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Access Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Custom Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Granted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAccess.map((access) => {
                  const { user, application, accessLevel } = getAccessDetails(access);
                  if (!user || !application || !accessLevel) return null;
                  
                  return (
                    <tr key={access.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary-600">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <AppWindow className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{application.name}</span>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                          {accessLevel.name}
                        </span>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {access.customPermissions.length > 0 ? (
                            access.customPermissions.map(permissionId => {
                              const permission = application.customPermissions.find(p => p.id === permissionId);
                              return permission ? (
                                <span
                                  key={permission.id}
                                  className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded"
                                >
                                  {permission.name}
                                </span>
                              ) : null;
                            })
                          ) : (
                            <span className="text-xs text-gray-400">None</span>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {access.grantedAt.toLocaleDateString()}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditAccess(access)}
                            className="text-primary-600 hover:text-primary-900 p-1"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRevokeAccess(access.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Access Control Modal */}
      <AccessControlModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAccess(null);
        }}
        onSave={handleSaveAccess}
        access={editingAccess}
        users={state.users}
        applications={state.applications}
        accessLevels={state.accessLevels}
      />
    </div>
  );
};

export default AccessControl;
