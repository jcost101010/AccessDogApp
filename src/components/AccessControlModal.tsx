import React, { useState, useEffect } from 'react';
import { X, Save, Shield, User, AppWindow } from 'lucide-react';
import { User as UserType, Application, AccessLevel, UserAccess, Permission } from '../types';

interface AccessControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (access: Omit<UserAccess, 'id' | 'grantedAt'>) => void;
  access: UserAccess | null;
  users: UserType[];
  applications: Application[];
  accessLevels: AccessLevel[];
}

const AccessControlModal: React.FC<AccessControlModalProps> = ({
  isOpen,
  onClose,
  onSave,
  access,
  users,
  applications,
  accessLevels
}) => {
  const [formData, setFormData] = useState({
    userId: '',
    applicationId: '',
    accessLevelId: '',
    customPermissions: [] as string[],
    isActive: true,
    expiresAt: ''
  });

  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  useEffect(() => {
    if (access) {
      setFormData({
        userId: access.userId,
        applicationId: access.applicationId,
        accessLevelId: access.accessLevelId,
        customPermissions: access.customPermissions,
        isActive: access.isActive,
        expiresAt: access.expiresAt ? access.expiresAt.toISOString().split('T')[0] : ''
      });
      setSelectedApplication(applications.find(app => app.id === access.applicationId) || null);
    } else {
      setFormData({
        userId: '',
        applicationId: '',
        accessLevelId: '',
        customPermissions: [],
        isActive: true,
        expiresAt: ''
      });
      setSelectedApplication(null);
    }
  }, [access, applications]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      grantedBy: 'admin@company.com', // Default admin user
      expiresAt: formData.expiresAt ? new Date(formData.expiresAt) : undefined
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleApplicationChange = (applicationId: string) => {
    setFormData(prev => ({ ...prev, applicationId, accessLevelId: '', customPermissions: [] }));
    setSelectedApplication(applications.find(app => app.id === applicationId) || null);
  };

  const handleCustomPermissionToggle = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      customPermissions: prev.customPermissions.includes(permissionId)
        ? prev.customPermissions.filter(id => id !== permissionId)
        : [...prev.customPermissions, permissionId]
    }));
  };

  const handleCheckAllPermissions = () => {
    const allPermissionIds = getAvailableCustomPermissions().map(p => p.id);
    setFormData(prev => ({
      ...prev,
      customPermissions: allPermissionIds
    }));
  };

  const handleCheckNonePermissions = () => {
    setFormData(prev => ({
      ...prev,
      customPermissions: []
    }));
  };

  const getAvailableCustomPermissions = () => {
    if (!selectedApplication) return [];
    return selectedApplication.customPermissions;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {access ? 'Edit Access Control' : 'Grant New Access'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">
                User *
              </label>
              <select
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                required
                className="input-field"
              >
                <option value="">Select a user</option>
                {users.filter(user => user.isActive).map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="applicationId" className="block text-sm font-medium text-gray-700 mb-2">
                Application *
              </label>
              <select
                id="applicationId"
                name="applicationId"
                value={formData.applicationId}
                onChange={(e) => handleApplicationChange(e.target.value)}
                required
                className="input-field"
              >
                <option value="">Select an application</option>
                {applications.filter(app => app.isActive).map(app => (
                  <option key={app.id} value={app.id}>
                    {app.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="accessLevelId" className="block text-sm font-medium text-gray-700 mb-2">
              Access Level *
            </label>
            <select
              id="accessLevelId"
              name="accessLevelId"
              value={formData.accessLevelId}
              onChange={handleInputChange}
              required
              className="input-field"
            >
              <option value="">Select an access level</option>
              {accessLevels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.name} - {level.description}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Permissions */}
          {selectedApplication && selectedApplication.customPermissions.length > 0 && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Custom Permissions</h3>
              <p className="text-sm text-gray-600 mb-4">
                Select additional custom permissions for this user on {selectedApplication.name}:
              </p>
              
              {/* Check All/None Buttons */}
              <div className="flex space-x-3 mb-4">
                <button
                  type="button"
                  onClick={handleCheckAllPermissions}
                  className="px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                >
                  Check All
                </button>
                <button
                  type="button"
                  onClick={handleCheckNonePermissions}
                  className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                >
                  Check None
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {getAvailableCustomPermissions().map((permission) => (
                  <label key={permission.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.customPermissions.includes(permission.id)}
                      onChange={() => handleCustomPermissionToggle(permission.id)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{permission.name}</p>
                      <p className="text-xs text-gray-500">{permission.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700 mb-2">
                Expiration Date
              </label>
              <input
                type="date"
                id="expiresAt"
                name="expiresAt"
                value={formData.expiresAt}
                onChange={handleInputChange}
                className="input-field"
                min={new Date().toISOString().split('T')[0]}
              />
              <p className="text-sm text-gray-500 mt-1">Optional: Set when this access should expire</p>
            </div>

            <div className="flex items-center space-x-3 pt-6">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                Access is active and user can use the application
              </label>
            </div>
          </div>

          {/* Access Level Details */}
          {formData.accessLevelId && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Access Level Details</h3>
              {(() => {
                const selectedLevel = accessLevels.find(level => level.id === formData.accessLevelId);
                if (!selectedLevel) return null;
                
                return (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{selectedLevel.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{selectedLevel.description}</p>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-700 uppercase tracking-wide">Permissions:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedLevel.permissions.map((permission) => (
                          <span
                            key={permission.id}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                          >
                            {permission.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{access ? 'Update' : 'Grant'} Access</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccessControlModal;
