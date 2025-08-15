import React, { useState, useEffect } from 'react';
import { useAccess } from '../contexts/AccessContext';
import { Users as UsersIcon, Plus, Edit, Trash2, Mail, Building, Calendar, Shield } from 'lucide-react';
import { User } from '../types';
import UserModal from '../components/UserModal';

const Users: React.FC = () => {
  const { state, dispatch } = useAccess();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Debug: Log current users state
  console.log('Users component rendered with users:', state.users);

  // Debug: Monitor state changes
  useEffect(() => {
    console.log('Users state changed:', state.users);
  }, [state.users]);

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This will also remove all their application access.')) {
      dispatch({ type: 'DELETE_USER', payload: userId });
    }
  };

  const handleSaveUser = (user: Omit<User, 'id' | 'createdAt'>) => {
    console.log('handleSaveUser called with:', user);
    if (editingUser) {
      console.log('Updating existing user:', editingUser);
      dispatch({
        type: 'UPDATE_USER',
        payload: { ...editingUser, ...user }
      });
    } else {
      const newUser: User = {
        ...user,
        id: Date.now().toString(),
        createdAt: new Date(),
        lastLogin: undefined // New users haven't logged in yet
      };
      console.log('Creating new user:', newUser);
      dispatch({ type: 'ADD_USER', payload: newUser });
    }
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const getUserAccessCount = (userId: string) => {
    return state.userAccess.filter(access => access.userId === userId && access.isActive).length;
  };

  const getUserApplications = (userId: string) => {
    const accessEntries = state.userAccess.filter(access => access.userId === userId && access.isActive);
    return accessEntries.map(access => {
      const app = state.applications.find(a => a.id === access.applicationId);
      const level = state.accessLevels.find(l => l.id === access.accessLevelId);
      return { app, level, access };
    }).filter(item => item.app && item.level);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage user accounts and their access permissions</p>
          <p className="text-sm text-gray-500 mt-1">Total Users: {state.users.length}</p>
        </div>
        <button
          onClick={handleAddUser}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      {/* Users Grid */}
      <div key={state.users.length} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.users.map((user) => (
          <div key={user.id} className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary-600">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditUser(user)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              
              {user.department && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Building className="h-4 w-4" />
                  <span>{user.department}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Joined {user.createdAt.toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {getUserAccessCount(user.id)} applications
                </span>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            {/* User's Application Access */}
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-500 mb-2">Application Access:</p>
              <div className="space-y-2">
                {getUserApplications(user.id).slice(0, 3).map(({ app, level, access }) => (
                  <div key={access.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
                    <span className="font-medium text-gray-700">{app?.name}</span>
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded">
                      {level?.name}
                    </span>
                  </div>
                ))}
                {getUserApplications(user.id).length > 3 && (
                  <div className="text-xs text-gray-500 text-center py-1">
                    +{getUserApplications(user.id).length - 3} more applications
                  </div>
                )}
                {getUserApplications(user.id).length === 0 && (
                  <div className="text-xs text-gray-400 text-center py-2">
                    No application access
                  </div>
                )}
              </div>
            </div>

            {user.lastLogin && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Last login: {user.lastLogin.toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* User Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        onSave={handleSaveUser}
        user={editingUser}
      />
    </div>
  );
};

export default Users;
