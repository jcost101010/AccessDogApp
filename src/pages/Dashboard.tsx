import React from 'react';
import { useAccess } from '../contexts/AccessContext';
import { Users as UsersIcon, AppWindow, Shield, BarChart3, Plus, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { state } = useAccess();

  const stats = [
    {
      label: 'Total Users',
      value: state.users.length,
      icon: UsersIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Active Applications',
      value: state.applications.filter(app => app.isActive).length,
      icon: AppWindow,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Access Levels',
      value: state.accessLevels.length,
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      label: 'Active Access Grants',
      value: state.userAccess.filter(access => access.isActive).length,
      icon: BarChart3,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const quickActions = [
    {
      title: 'Add New User',
      description: 'Create a new user account',
      icon: UsersIcon,
      link: '/users',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Add Application',
      description: 'Register a new application',
      icon: AppWindow,
      link: '/applications',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Manage Access',
      description: 'Grant or revoke user access',
      icon: Shield,
      link: '/access-control',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Generate Report',
      description: 'Create access control reports',
      icon: BarChart3,
      link: '/reports',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  const recentActivity = state.userAccess
    .filter(access => access.isActive)
    .sort((a, b) => new Date(b.grantedAt).getTime() - new Date(a.grantedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your Access Control Hub</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.title}
                to={action.link}
                className={`${action.color} text-white p-4 rounded-lg transition-colors duration-200`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-6 w-6" />
                  <div>
                    <h3 className="font-medium">{action.title}</h3>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Access Grants</h2>
        <div className="space-y-3">
          {recentActivity.map((access) => {
            const user = state.users.find(u => u.id === access.userId);
            const application = state.applications.find(a => a.id === access.applicationId);
            const accessLevel = state.accessLevels.find(l => l.id === access.accessLevelId);
            
            if (!user || !application || !accessLevel) return null;
            
            return (
              <div key={access.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <UsersIcon className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {user.name} granted {accessLevel.name} access to {application.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(access.grantedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  by {access.grantedBy}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
