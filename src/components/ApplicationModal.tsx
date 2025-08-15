import React, { useState, useEffect } from 'react';
import { X, Save, AppWindow } from 'lucide-react';
import { Application, AccessLevel } from '../types';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (application: Omit<Application, 'id' | 'createdAt'>) => void;
  application: Application | null;
  accessLevels: AccessLevel[];
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  application,
  accessLevels
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    category: '',
    isActive: true
  });

  useEffect(() => {
    if (application) {
      setFormData({
        name: application.name,
        description: application.description,
        url: application.url || '',
        category: application.category,
        isActive: application.isActive
      });
    } else {
      setFormData({
        name: '',
        description: '',
        url: '',
        category: '',
        isActive: true
      });
    }
  }, [application]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <AppWindow className="h-5 w-5 text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {application ? 'Edit Application' : 'Add New Application'}
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Application Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="Enter application name"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="input-field"
              >
                <option value="">Select a category</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Productivity">Productivity</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Engineering">Engineering</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="input-field"
              placeholder="Describe what this application does"
            />
          </div>

          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Application URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              className="input-field"
              placeholder="https://example.com"
            />
            <p className="text-sm text-gray-500 mt-1">Optional: The URL where users can access this application</p>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
              Application is active and available for access
            </label>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Access Levels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accessLevels.map((level) => (
                <div key={level.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">{level.name}</p>
                    <p className="text-sm text-gray-600">{level.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              All applications use the same set of access levels. You can customize permissions per application later.
            </p>
          </div>

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
              <span>{application ? 'Update' : 'Create'} Application</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationModal;

