import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Application, AccessLevel, Permission, UserAccess, AccessReport } from '../types';
import { mockUsers, mockApplications, mockAccessLevels, mockPermissions, mockUserAccess } from '../data/mockData';

interface AccessState {
  users: User[];
  applications: Application[];
  accessLevels: AccessLevel[];
  permissions: Permission[];
  userAccess: UserAccess[];
  selectedApplication: Application | null;
  selectedUser: User | null;
}

type AccessAction =
  | { type: 'SET_SELECTED_APPLICATION'; payload: Application | null }
  | { type: 'SET_SELECTED_USER'; payload: User | null }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'ADD_APPLICATION'; payload: Application }
  | { type: 'UPDATE_APPLICATION'; payload: Application }
  | { type: 'DELETE_APPLICATION'; payload: string }
  | { type: 'ADD_ACCESS_LEVEL'; payload: AccessLevel }
  | { type: 'UPDATE_ACCESS_LEVEL'; payload: AccessLevel }
  | { type: 'DELETE_ACCESS_LEVEL'; payload: string }
  | { type: 'GRANT_ACCESS'; payload: UserAccess }
  | { type: 'REVOKE_ACCESS'; payload: string }
  | { type: 'UPDATE_USER_ACCESS'; payload: UserAccess };

const initialState: AccessState = {
  users: mockUsers,
  applications: mockApplications,
  accessLevels: mockAccessLevels,
  permissions: mockPermissions,
  userAccess: mockUserAccess,
  selectedApplication: null,
  selectedUser: null,
};

function accessReducer(state: AccessState, action: AccessAction): AccessState {
  switch (action.type) {
    case 'SET_SELECTED_APPLICATION':
      return { ...state, selectedApplication: action.payload };
    case 'SET_SELECTED_USER':
      return { ...state, selectedUser: action.payload };
    case 'ADD_USER':
      console.log('ADD_USER reducer called with:', action.payload);
      console.log('Current users state:', state.users);
      const newState = {
        ...state,
        users: [...state.users, action.payload]
      };
      console.log('New users state:', newState.users);
      return newState;
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user => user.id === action.payload.id ? action.payload : user)
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        userAccess: state.userAccess.filter(access => access.userId !== action.payload)
      };
    case 'ADD_APPLICATION':
      return { ...state, applications: [...state.applications, action.payload] };
    case 'UPDATE_APPLICATION':
      return {
        ...state,
        applications: state.applications.map(app => app.id === action.payload.id ? action.payload : app)
      };
    case 'DELETE_APPLICATION':
      return {
        ...state,
        applications: state.applications.filter(app => app.id !== action.payload),
        userAccess: state.userAccess.filter(access => access.applicationId !== action.payload)
      };
    case 'ADD_ACCESS_LEVEL':
      return { ...state, accessLevels: [...state.accessLevels, action.payload] };
    case 'UPDATE_ACCESS_LEVEL':
      return {
        ...state,
        accessLevels: state.accessLevels.map(level => level.id === action.payload.id ? action.payload : level)
      };
    case 'DELETE_ACCESS_LEVEL':
      return {
        ...state,
        accessLevels: state.accessLevels.filter(level => level.id !== action.payload),
        userAccess: state.userAccess.filter(access => access.accessLevelId !== action.payload)
      };
    case 'GRANT_ACCESS':
      return { ...state, userAccess: [...state.userAccess, action.payload] };
    case 'REVOKE_ACCESS':
      return {
        ...state,
        userAccess: state.userAccess.filter(access => access.id !== action.payload)
      };
    case 'UPDATE_USER_ACCESS':
      return {
        ...state,
        userAccess: state.userAccess.map(access => access.id === action.payload.id ? action.payload : access)
      };
    default:
      return state;
  }
}

interface AccessContextType {
  state: AccessState;
  dispatch: React.Dispatch<AccessAction>;
  getUsersForApplication: (applicationId: string) => User[];
  getApplicationsForUser: (userId: string) => Application[];
  generateAccessReport: (applicationId: string) => AccessReport;
}

const AccessContext = createContext<AccessContextType | undefined>(undefined);

export function AccessProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(accessReducer, initialState);

  const getUsersForApplication = (applicationId: string): User[] => {
    const accessEntries = state.userAccess.filter(access => access.applicationId === applicationId && access.isActive);
    return accessEntries.map(access => state.users.find(user => user.id === access.userId)!);
  };

  const getApplicationsForUser = (userId: string): Application[] => {
    const accessEntries = state.userAccess.filter(access => access.userId === userId && access.isActive);
    return accessEntries.map(access => state.applications.find(app => app.id === access.applicationId)!);
  };

  const generateAccessReport = (applicationId: string): AccessReport => {
    const application = state.applications.find(app => app.id === applicationId);
    if (!application) throw new Error('Application not found');

    const accessEntries = state.userAccess.filter(access => access.applicationId === applicationId && access.isActive);
    const usersByAccessLevel = state.accessLevels.map(level => {
      const usersWithLevel = accessEntries
        .filter(access => access.accessLevelId === level.id)
        .map(access => state.users.find(user => user.id === access.userId)!);
      
      return {
        accessLevelId: level.id,
        accessLevelName: level.name,
        userCount: usersWithLevel.length,
        users: usersWithLevel
      };
    });

    return {
      applicationId,
      applicationName: application.name,
      totalUsers: accessEntries.length,
      usersByAccessLevel,
      customPermissions: application.customPermissions,
      reportGeneratedAt: new Date()
    };
  };

  const value: AccessContextType = {
    state,
    dispatch,
    getUsersForApplication,
    getApplicationsForUser,
    generateAccessReport,
  };

  return (
    <AccessContext.Provider value={value}>
      {children}
    </AccessContext.Provider>
  );
}

export function useAccess() {
  const context = useContext(AccessContext);
  if (context === undefined) {
    throw new Error('useAccess must be used within an AccessProvider');
  }
  return context;
}
