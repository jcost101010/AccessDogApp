import { User, Application, AccessLevel, Permission, UserAccess } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Software Engineer',
    department: 'Engineering',
    isActive: true,
    createdAt: new Date('2023-01-15'),
    lastLogin: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'Product Manager',
    department: 'Product',
    isActive: true,
    createdAt: new Date('2023-02-20'),
    lastLogin: new Date('2024-01-19')
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@company.com',
    role: 'DevOps Engineer',
    department: 'Engineering',
    isActive: true,
    createdAt: new Date('2023-03-10'),
    lastLogin: new Date('2024-01-18')
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice.brown@company.com',
    role: 'UX Designer',
    department: 'Design',
    isActive: false,
    createdAt: new Date('2023-04-05'),
    lastLogin: new Date('2024-01-10')
  }
];

export const mockPermissions: Permission[] = [
  {
    id: '1',
    name: 'View Dashboard',
    description: 'Can view application dashboard',
    resource: 'dashboard',
    action: 'read'
  },
  {
    id: '2',
    name: 'Edit Settings',
    description: 'Can modify application settings',
    resource: 'settings',
    action: 'write'
  },
  {
    id: '3',
    name: 'Delete Records',
    description: 'Can delete application records',
    resource: 'records',
    action: 'delete'
  },
  {
    id: '4',
    name: 'Admin Access',
    description: 'Full administrative access',
    resource: 'all',
    action: 'admin'
  },
  {
    id: '5',
    name: 'Export Data',
    description: 'Can export application data',
    resource: 'data',
    action: 'read'
  },
  // GitHub-specific permissions
  {
    id: '6',
    name: 'View Salary Info',
    description: 'Can view employee salary information',
    resource: 'salary',
    action: 'read'
  },
  {
    id: '7',
    name: 'Repository Read',
    description: 'Can view repository contents and history',
    resource: 'repository',
    action: 'read'
  },
  {
    id: '8',
    name: 'Repository Write',
    description: 'Can push commits and create branches',
    resource: 'repository',
    action: 'write'
  },
  {
    id: '9',
    name: 'Repository Admin',
    description: 'Can manage repository settings and access',
    resource: 'repository',
    action: 'admin'
  },
  {
    id: '10',
    name: 'Issue Read',
    description: 'Can view issues and pull requests',
    resource: 'issues',
    action: 'read'
  },
  {
    id: '11',
    name: 'Issue Write',
    description: 'Can create and comment on issues',
    resource: 'issues',
    action: 'write'
  },
  {
    id: '12',
    name: 'Issue Admin',
    description: 'Can manage issue labels and milestones',
    resource: 'issues',
    action: 'admin'
  },
  {
    id: '13',
    name: 'Pull Request Read',
    description: 'Can view pull request details',
    resource: 'pull_requests',
    action: 'read'
  },
  {
    id: '14',
    name: 'Pull Request Write',
    description: 'Can create and review pull requests',
    resource: 'pull_requests',
    action: 'write'
  },
  {
    id: '15',
    name: 'Pull Request Admin',
    description: 'Can merge and manage pull requests',
    resource: 'pull_requests',
    action: 'admin'
  },
  {
    id: '16',
    name: 'Organization Read',
    description: 'Can view organization information',
    resource: 'organization',
    action: 'read'
  },
  {
    id: '17',
    name: 'Organization Write',
    description: 'Can manage team memberships',
    resource: 'organization',
    action: 'write'
  },
  {
    id: '18',
    name: 'Organization Admin',
    description: 'Can manage organization settings',
    resource: 'organization',
    action: 'admin'
  },
  {
    id: '19',
    name: 'Team Read',
    description: 'Can view team information',
    resource: 'team',
    action: 'read'
  },
  {
    id: '20',
    name: 'Team Write',
    description: 'Can manage team members',
    resource: 'team',
    action: 'write'
  },
  {
    id: '21',
    name: 'Team Admin',
    description: 'Can manage team settings and permissions',
    resource: 'team',
    action: 'admin'
  },
  {
    id: '22',
    name: 'Security Read',
    description: 'Can view security advisories',
    resource: 'security',
    action: 'read'
  },
  {
    id: '23',
    name: 'Security Write',
    description: 'Can create security advisories',
    resource: 'security',
    action: 'write'
  },
  {
    id: '24',
    name: 'Security Admin',
    description: 'Can manage security policies',
    resource: 'security',
    action: 'admin'
  },
  {
    id: '25',
    name: 'Actions Read',
    description: 'Can view GitHub Actions workflows',
    resource: 'actions',
    action: 'read'
  },
  {
    id: '26',
    name: 'Actions Write',
    description: 'Can trigger and manage workflows',
    resource: 'actions',
    action: 'write'
  },
  {
    id: '27',
    name: 'Actions Admin',
    description: 'Can manage Actions settings and secrets',
    resource: 'actions',
    action: 'admin'
  },
  {
    id: '28',
    name: 'Packages Read',
    description: 'Can view packages and containers',
    resource: 'packages',
    action: 'read'
  },
  {
    id: '29',
    name: 'Packages Write',
    description: 'Can publish packages and containers',
    resource: 'packages',
    action: 'write'
  },
  {
    id: '30',
    name: 'Packages Admin',
    description: 'Can manage package settings and access',
    resource: 'packages',
    action: 'admin'
  },
  {
    id: '31',
    name: 'Wiki Read',
    description: 'Can view repository wiki',
    resource: 'wiki',
    action: 'read'
  },
  {
    id: '32',
    name: 'Wiki Write',
    description: 'Can edit repository wiki',
    resource: 'wiki',
    action: 'write'
  },
  {
    id: '33',
    name: 'Wiki Admin',
    description: 'Can manage wiki settings',
    resource: 'wiki',
    action: 'admin'
  },
  {
    id: '34',
    name: 'Discussions Read',
    description: 'Can view repository discussions',
    resource: 'discussions',
    action: 'read'
  },
  {
    id: '35',
    name: 'Discussions Write',
    description: 'Can participate in discussions',
    resource: 'discussions',
    action: 'write'
  },
  {
    id: '36',
    name: 'Discussions Admin',
    description: 'Can manage discussion categories',
    resource: 'discussions',
    action: 'admin'
  },
  {
    id: '37',
    name: 'Projects Read',
    description: 'Can view project boards',
    resource: 'projects',
    action: 'read'
  },
  {
    id: '38',
    name: 'Projects Write',
    description: 'Can update project boards',
    resource: 'projects',
    action: 'write'
  },
  {
    id: '39',
    name: 'Projects Admin',
    description: 'Can manage project settings',
    resource: 'projects',
    action: 'admin'
  },
  {
    id: '40',
    name: 'Environments Read',
    description: 'Can view deployment environments',
    resource: 'environments',
    action: 'read'
  },
  {
    id: '41',
    name: 'Environments Write',
    description: 'Can deploy to environments',
    resource: 'environments',
    action: 'write'
  },
  {
    id: '42',
    name: 'Environments Admin',
    description: 'Can manage environment settings',
    resource: 'environments',
    action: 'admin'
  },
  // MongoDB-specific permissions
  {
    id: '43',
    name: 'Database Read',
    description: 'Can read database information and statistics',
    resource: 'database',
    action: 'read'
  },
  {
    id: '44',
    name: 'Database Write',
    description: 'Can create and modify databases',
    resource: 'database',
    action: 'write'
  },
  {
    id: '45',
    name: 'Database Admin',
    description: 'Can manage database settings and access',
    resource: 'database',
    action: 'admin'
  },
  {
    id: '46',
    name: 'Collection Read',
    description: 'Can read collection data and metadata',
    resource: 'collection',
    action: 'read'
  },
  {
    id: '47',
    name: 'Collection Write',
    description: 'Can insert, update, and delete documents',
    resource: 'collection',
    action: 'write'
  },
  {
    id: '48',
    name: 'Collection Admin',
    description: 'Can manage collection settings and indexes',
    resource: 'collection',
    action: 'admin'
  },
  {
    id: '49',
    name: 'Document Read',
    description: 'Can read individual documents',
    resource: 'document',
    action: 'read'
  },
  {
    id: '50',
    name: 'Document Write',
    description: 'Can create, update, and delete documents',
    resource: 'document',
    action: 'write'
  },
  {
    id: '51',
    name: 'Document Admin',
    description: 'Can manage document validation and schemas',
    resource: 'document',
    action: 'admin'
  },
  {
    id: '52',
    name: 'Index Read',
    description: 'Can view index information',
    resource: 'index',
    action: 'read'
  },
  {
    id: '53',
    name: 'Index Write',
    description: 'Can create and drop indexes',
    resource: 'index',
    action: 'write'
  },
  {
    id: '54',
    name: 'Index Admin',
    description: 'Can manage index settings and optimization',
    resource: 'index',
    action: 'admin'
  },
  {
    id: '55',
    name: 'Query Read',
    description: 'Can execute read queries',
    resource: 'query',
    action: 'read'
  },
  {
    id: '56',
    name: 'Query Write',
    description: 'Can execute write operations',
    resource: 'query',
    action: 'write'
  },
  {
    id: '57',
    name: 'Query Admin',
    description: 'Can manage query performance and optimization',
    resource: 'query',
    action: 'admin'
  },
  {
    id: '58',
    name: 'Aggregation Read',
    description: 'Can execute aggregation pipelines',
    resource: 'aggregation',
    action: 'read'
  },
  {
    id: '59',
    name: 'Aggregation Write',
    description: 'Can create and manage aggregation pipelines',
    resource: 'aggregation',
    action: 'write'
  },
  {
    id: '60',
    name: 'Aggregation Admin',
    description: 'Can manage aggregation settings and optimization',
    resource: 'aggregation',
    action: 'admin'
  },
  {
    id: '61',
    name: 'User Management Read',
    description: 'Can view user accounts and roles',
    resource: 'user_management',
    action: 'read'
  },
  {
    id: '62',
    name: 'User Management Write',
    description: 'Can create and modify user accounts',
    resource: 'user_management',
    action: 'write'
  },
  {
    id: '63',
    name: 'User Management Admin',
    description: 'Can manage user authentication and authorization',
    resource: 'user_management',
    action: 'admin'
  },
  {
    id: '64',
    name: 'Role Management Read',
    description: 'Can view role definitions and permissions',
    resource: 'role_management',
    action: 'read'
  },
  {
    id: '65',
    name: 'Role Management Write',
    description: 'Can create and modify roles',
    resource: 'role_management',
    action: 'write'
  },
  {
    id: '66',
    name: 'Role Management Admin',
    description: 'Can manage role hierarchies and inheritance',
    resource: 'role_management',
    action: 'admin'
  },
  {
    id: '67',
    name: 'Authentication Read',
    description: 'Can view authentication settings',
    resource: 'authentication',
    action: 'read'
  },
  {
    id: '68',
    name: 'Authentication Write',
    description: 'Can modify authentication methods',
    resource: 'authentication',
    action: 'write'
  },
  {
    id: '69',
    name: 'Authentication Admin',
    description: 'Can manage authentication policies and security',
    resource: 'authentication',
    action: 'admin'
  },
  {
    id: '70',
    name: 'Authorization Read',
    description: 'Can view authorization policies',
    resource: 'authorization',
    action: 'read'
  },
  {
    id: '71',
    name: 'Authorization Write',
    description: 'Can modify authorization rules',
    resource: 'authorization',
    action: 'write'
  },
  {
    id: '72',
    name: 'Authorization Admin',
    description: 'Can manage authorization policies and access control',
    resource: 'authorization',
    action: 'admin'
  },
  {
    id: '73',
    name: 'Backup Read',
    description: 'Can view backup information and status',
    resource: 'backup',
    action: 'read'
  },
  {
    id: '74',
    name: 'Backup Write',
    description: 'Can initiate and manage backups',
    resource: 'backup',
    action: 'write'
  },
  {
    id: '75',
    name: 'Backup Admin',
    description: 'Can manage backup policies and schedules',
    resource: 'backup',
    action: 'admin'
  },
  {
    id: '76',
    name: 'Restore Read',
    description: 'Can view restore information and history',
    resource: 'restore',
    action: 'read'
  },
  {
    id: '77',
    name: 'Restore Write',
    description: 'Can initiate restore operations',
    resource: 'restore',
    action: 'write'
  },
  {
    id: '78',
    name: 'Restore Admin',
    description: 'Can manage restore policies and procedures',
    resource: 'restore',
    action: 'admin'
  },
  {
    id: '79',
    name: 'Replication Read',
    description: 'Can view replication status and configuration',
    resource: 'replication',
    action: 'read'
  },
  {
    id: '80',
    name: 'Replication Write',
    description: 'Can modify replication settings',
    resource: 'replication',
    action: 'write'
  },
  {
    id: '81',
    name: 'Replication Admin',
    description: 'Can manage replication topology and failover',
    resource: 'replication',
    action: 'admin'
  },
  {
    id: '82',
    name: 'Sharding Read',
    description: 'Can view sharding configuration and status',
    resource: 'sharding',
    action: 'read'
  },
  {
    id: '83',
    name: 'Sharding Write',
    description: 'Can modify sharding settings',
    resource: 'sharding',
    action: 'write'
  },
  {
    id: '84',
    name: 'Sharding Admin',
    description: 'Can manage sharding topology and balancing',
    resource: 'sharding',
    action: 'admin'
  },
  {
    id: '85',
    name: 'Monitoring Read',
    description: 'Can view monitoring data and metrics',
    resource: 'monitoring',
    action: 'read'
  },
  {
    id: '86',
    name: 'Monitoring Write',
    description: 'Can configure monitoring and alerting',
    resource: 'monitoring',
    action: 'write'
  },
  {
    id: '87',
    name: 'Monitoring Admin',
    description: 'Can manage monitoring policies and thresholds',
    resource: 'monitoring',
    action: 'admin'
  },
  {
    id: '88',
    name: 'Logs Read',
    description: 'Can view system logs and audit trails',
    resource: 'logs',
    action: 'read'
  },
  {
    id: '89',
    name: 'Logs Write',
    description: 'Can configure logging settings',
    resource: 'logs',
    action: 'write'
  },
  {
    id: '90',
    name: 'Logs Admin',
    description: 'Can manage log retention and archival policies',
    resource: 'logs',
    action: 'admin'
  },
  {
    id: '91',
    name: 'Performance Read',
    description: 'Can view performance metrics and statistics',
    resource: 'performance',
    action: 'read'
  },
  {
    id: '92',
    name: 'Performance Write',
    description: 'Can configure performance tuning parameters',
    resource: 'performance',
    action: 'write'
  },
  {
    id: '93',
    name: 'Performance Admin',
    description: 'Can manage performance optimization and profiling',
    resource: 'performance',
    action: 'admin'
  },
  {
    id: '94',
    name: 'Security Read',
    description: 'Can view security settings and policies',
    resource: 'security',
    action: 'read'
  },
  {
    id: '95',
    name: 'Security Write',
    description: 'Can modify security configurations',
    resource: 'security',
    action: 'write'
  },
  {
    id: '96',
    name: 'Security Admin',
    description: 'Can manage security policies and compliance',
    resource: 'security',
    action: 'admin'
  },
  {
    id: '97',
    name: 'Network Read',
    description: 'Can view network configuration and connections',
    resource: 'network',
    action: 'read'
  },
  {
    id: '98',
    name: 'Network Write',
    description: 'Can modify network settings',
    resource: 'network',
    action: 'write'
  },
  {
    id: '99',
    name: 'Network Admin',
    description: 'Can manage network security and firewall rules',
    resource: 'network',
    action: 'admin'
  },
  {
    id: '100',
    name: 'Storage Read',
    description: 'Can view storage configuration and usage',
    resource: 'storage',
    action: 'read'
  },
  {
    id: '101',
    name: 'Storage Write',
    description: 'Can modify storage settings',
    resource: 'storage',
    action: 'write'
  },
  {
    id: '102',
    name: 'Storage Admin',
    description: 'Can manage storage allocation and optimization',
    resource: 'storage',
    action: 'admin'
  },
  {
    id: '103',
    name: 'Cluster Read',
    description: 'Can view cluster configuration and status',
    resource: 'cluster',
    action: 'read'
  },
  {
    id: '104',
    name: 'Cluster Write',
    description: 'Can modify cluster settings',
    resource: 'cluster',
    action: 'write'
  },
  {
    id: '105',
    name: 'Cluster Admin',
    description: 'Can manage cluster topology and scaling',
    resource: 'cluster',
    action: 'admin'
  },
  {
    id: '106',
    name: 'Schema Read',
    description: 'Can view data schemas and validation rules',
    resource: 'schema',
    action: 'read'
  },
  {
    id: '107',
    name: 'Schema Write',
    description: 'Can modify data schemas and validation',
    resource: 'schema',
    action: 'write'
  },
  {
    id: '108',
    name: 'Schema Admin',
    description: 'Can manage schema evolution and migration',
    resource: 'schema',
    action: 'admin'
  },
  {
    id: '109',
    name: 'Migration Read',
    description: 'Can view migration status and history',
    resource: 'migration',
    action: 'read'
  },
  {
    id: '110',
    name: 'Migration Write',
    description: 'Can initiate and manage migrations',
    resource: 'migration',
    action: 'write'
  },
  {
    id: '111',
    name: 'Migration Admin',
    description: 'Can manage migration policies and rollback procedures',
    resource: 'migration',
    action: 'admin'
  },
  {
    id: '112',
    name: 'Compliance Read',
    description: 'Can view compliance policies and audit reports',
    resource: 'compliance',
    action: 'read'
  },
  {
    id: '113',
    name: 'Compliance Write',
    description: 'Can modify compliance configurations',
    resource: 'compliance',
    action: 'write'
  },
  {
    id: '114',
    name: 'Compliance Admin',
    description: 'Can manage compliance policies and reporting',
    resource: 'compliance',
    action: 'admin'
  }
];

export const mockAccessLevels: AccessLevel[] = [
  {
    id: '1',
    name: 'Viewer',
    description: 'Basic read-only access',
    permissions: [mockPermissions[0], mockPermissions[4]],
    isCustom: false
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Can view and edit data',
    permissions: [mockPermissions[0], mockPermissions[1], mockPermissions[4]],
    isCustom: false
  },
  {
    id: '3',
    name: 'Manager',
    description: 'Full access except admin functions',
    permissions: [mockPermissions[0], mockPermissions[1], mockPermissions[2], mockPermissions[4]],
    isCustom: false
  },
  {
    id: '4',
    name: 'Administrator',
    description: 'Full access to all features',
    permissions: mockPermissions,
    isCustom: false
  }
];

// GitHub-specific access levels
export const githubAccessLevels: AccessLevel[] = [
  {
    id: '5',
    name: 'GitHub Viewer',
    description: 'Read-only access to repositories and issues',
    permissions: [
      mockPermissions.find(p => p.id === '7')!, // Repository Read
      mockPermissions.find(p => p.id === '10')!, // Issue Read
      mockPermissions.find(p => p.id === '13')!, // Pull Request Read
      mockPermissions.find(p => p.id === '16')!, // Organization Read
      mockPermissions.find(p => p.id === '19')!, // Team Read
      mockPermissions.find(p => p.id === '22')!, // Security Read
      mockPermissions.find(p => p.id === '25')!, // Actions Read
      mockPermissions.find(p => p.id === '28')!, // Packages Read
      mockPermissions.find(p => p.id === '31')!, // Wiki Read
      mockPermissions.find(p => p.id === '34')!, // Discussions Read
      mockPermissions.find(p => p.id === '37')!, // Projects Read
      mockPermissions.find(p => p.id === '40')!  // Environments Read
    ].filter(Boolean),
    isCustom: true
  },
  {
    id: '6',
    name: 'GitHub Contributor',
    description: 'Can contribute code and participate in discussions',
    permissions: [
      mockPermissions.find(p => p.id === '7')!, // Repository Read
      mockPermissions.find(p => p.id === '8')!, // Repository Write
      mockPermissions.find(p => p.id === '10')!, // Issue Read
      mockPermissions.find(p => p.id === '11')!, // Issue Write
      mockPermissions.find(p => p.id === '13')!, // Pull Request Read
      mockPermissions.find(p => p.id === '14')!, // Pull Request Write
      mockPermissions.find(p => p.id === '16')!, // Organization Read
      mockPermissions.find(p => p.id === '19')!, // Team Read
      mockPermissions.find(p => p.id === '22')!, // Security Read
      mockPermissions.find(p => p.id === '25')!, // Actions Read
      mockPermissions.find(p => p.id === '28')!, // Packages Read
      mockPermissions.find(p => p.id === '31')!, // Wiki Read
      mockPermissions.find(p => p.id === '32')!, // Wiki Write
      mockPermissions.find(p => p.id === '34')!, // Discussions Read
      mockPermissions.find(p => p.id === '35')!, // Discussions Write
      mockPermissions.find(p => p.id === '37')!, // Projects Read
      mockPermissions.find(p => p.id === '38')!, // Projects Write
      mockPermissions.find(p => p.id === '40')!, // Environments Read
      mockPermissions.find(p => p.id === '41')!  // Environments Write
    ].filter(Boolean),
    isCustom: true
  },
  {
    id: '7',
    name: 'GitHub Maintainer',
    description: 'Can manage repositories and moderate content',
    permissions: [
      mockPermissions.find(p => p.id === '7')!, // Repository Read
      mockPermissions.find(p => p.id === '8')!, // Repository Write
      mockPermissions.find(p => p.id === '9')!, // Repository Admin
      mockPermissions.find(p => p.id === '10')!, // Issue Read
      mockPermissions.find(p => p.id === '11')!, // Issue Write
      mockPermissions.find(p => p.id === '12')!, // Issue Admin
      mockPermissions.find(p => p.id === '13')!, // Pull Request Read
      mockPermissions.find(p => p.id === '14')!, // Pull Request Write
      mockPermissions.find(p => p.id === '15')!, // Pull Request Admin
      mockPermissions.find(p => p.id === '16')!, // Organization Read
      mockPermissions.find(p => p.id === '17')!, // Organization Write
      mockPermissions.find(p => p.id === '19')!, // Team Read
      mockPermissions.find(p => p.id === '20')!, // Team Write
      mockPermissions.find(p => p.id === '22')!, // Security Read
      mockPermissions.find(p => p.id === '23')!, // Security Write
      mockPermissions.find(p => p.id === '25')!, // Actions Read
      mockPermissions.find(p => p.id === '26')!, // Actions Write
      mockPermissions.find(p => p.id === '28')!, // Packages Read
      mockPermissions.find(p => p.id === '29')!, // Packages Write
      mockPermissions.find(p => p.id === '31')!, // Wiki Read
      mockPermissions.find(p => p.id === '32')!, // Wiki Write
      mockPermissions.find(p => p.id === '33')!, // Wiki Admin
      mockPermissions.find(p => p.id === '34')!, // Discussions Read
      mockPermissions.find(p => p.id === '35')!, // Discussions Write
      mockPermissions.find(p => p.id === '36')!, // Discussions Admin
      mockPermissions.find(p => p.id === '37')!, // Projects Read
      mockPermissions.find(p => p.id === '38')!, // Projects Write
      mockPermissions.find(p => p.id === '39')!, // Projects Admin
      mockPermissions.find(p => p.id === '40')!, // Environments Read
      mockPermissions.find(p => p.id === '41')!, // Environments Write
      mockPermissions.find(p => p.id === '42')!  // Environments Admin
    ].filter(Boolean),
    isCustom: true
  },
  {
    id: '8',
    name: 'GitHub Administrator',
    description: 'Full access to all GitHub features and settings',
    permissions: mockPermissions.filter(p => p.id !== '6'), // All permissions except salary info
    isCustom: true
  }
];

// MongoDB-specific access levels
export const mongoDBAccessLevels: AccessLevel[] = [
  {
    id: '9',
    name: 'MongoDB Viewer',
    description: 'Read-only access to databases and collections',
    permissions: [
      mockPermissions.find(p => p.id === '43')!, // Database Read
      mockPermissions.find(p => p.id === '46')!, // Collection Read
      mockPermissions.find(p => p.id === '49')!, // Document Read
      mockPermissions.find(p => p.id === '52')!, // Index Read
      mockPermissions.find(p => p.id === '55')!, // Query Read
      mockPermissions.find(p => p.id === '58')!, // Aggregation Read
      mockPermissions.find(p => p.id === '61')!, // User Management Read
      mockPermissions.find(p => p.id === '64')!, // Role Management Read
      mockPermissions.find(p => p.id === '67')!, // Authentication Read
      mockPermissions.find(p => p.id === '70')!, // Authorization Read
      mockPermissions.find(p => p.id === '73')!, // Backup Read
      mockPermissions.find(p => p.id === '76')!, // Restore Read
      mockPermissions.find(p => p.id === '79')!, // Replication Read
      mockPermissions.find(p => p.id === '82')!, // Sharding Read
      mockPermissions.find(p => p.id === '85')!, // Monitoring Read
      mockPermissions.find(p => p.id === '88')!, // Logs Read
      mockPermissions.find(p => p.id === '91')!, // Performance Read
      mockPermissions.find(p => p.id === '94')!, // Security Read
      mockPermissions.find(p => p.id === '97')!, // Network Read
      mockPermissions.find(p => p.id === '100')!, // Storage Read
      mockPermissions.find(p => p.id === '103')!, // Cluster Read
      mockPermissions.find(p => p.id === '106')!, // Schema Read
      mockPermissions.find(p => p.id === '109')!, // Migration Read
      mockPermissions.find(p => p.id === '112')!  // Compliance Read
    ].filter(Boolean),
    isCustom: true
  },
  {
    id: '10',
    name: 'MongoDB Developer',
    description: 'Can read and write data, create indexes and queries',
    permissions: [
      mockPermissions.find(p => p.id === '43')!, // Database Read
      mockPermissions.find(p => p.id === '44')!, // Database Write
      mockPermissions.find(p => p.id === '46')!, // Collection Read
      mockPermissions.find(p => p.id === '47')!, // Collection Write
      mockPermissions.find(p => p.id === '49')!, // Document Read
      mockPermissions.find(p => p.id === '50')!, // Document Write
      mockPermissions.find(p => p.id === '52')!, // Index Read
      mockPermissions.find(p => p.id === '53')!, // Index Write
      mockPermissions.find(p => p.id === '55')!, // Query Read
      mockPermissions.find(p => p.id === '56')!, // Query Write
      mockPermissions.find(p => p.id === '58')!, // Aggregation Read
      mockPermissions.find(p => p.id === '59')!, // Aggregation Write
      mockPermissions.find(p => p.id === '61')!, // User Management Read
      mockPermissions.find(p => p.id === '64')!, // Role Management Read
      mockPermissions.find(p => p.id === '67')!, // Authentication Read
      mockPermissions.find(p => p.id === '70')!, // Authorization Read
      mockPermissions.find(p => p.id === '73')!, // Backup Read
      mockPermissions.find(p => p.id === '76')!, // Restore Read
      mockPermissions.find(p => p.id === '79')!, // Replication Read
      mockPermissions.find(p => p.id === '82')!, // Sharding Read
      mockPermissions.find(p => p.id === '85')!, // Monitoring Read
      mockPermissions.find(p => p.id === '88')!, // Logs Read
      mockPermissions.find(p => p.id === '91')!, // Performance Read
      mockPermissions.find(p => p.id === '94')!, // Security Read
      mockPermissions.find(p => p.id === '97')!, // Network Read
      mockPermissions.find(p => p.id === '100')!, // Storage Read
      mockPermissions.find(p => p.id === '103')!, // Cluster Read
      mockPermissions.find(p => p.id === '106')!, // Schema Read
      mockPermissions.find(p => p.id === '107')!, // Schema Write
      mockPermissions.find(p => p.id === '109')!, // Migration Read
      mockPermissions.find(p => p.id === '110')!, // Migration Write
      mockPermissions.find(p => p.id === '112')!  // Compliance Read
    ].filter(Boolean),
    isCustom: true
  },
  {
    id: '11',
    name: 'MongoDB Administrator',
    description: 'Can manage databases, users, security, and performance',
    permissions: [
      mockPermissions.find(p => p.id === '43')!, // Database Read
      mockPermissions.find(p => p.id === '44')!, // Database Write
      mockPermissions.find(p => p.id === '45')!, // Database Admin
      mockPermissions.find(p => p.id === '46')!, // Collection Read
      mockPermissions.find(p => p.id === '47')!, // Collection Write
      mockPermissions.find(p => p.id === '48')!, // Collection Admin
      mockPermissions.find(p => p.id === '49')!, // Document Read
      mockPermissions.find(p => p.id === '50')!, // Document Write
      mockPermissions.find(p => p.id === '51')!, // Document Admin
      mockPermissions.find(p => p.id === '52')!, // Index Read
      mockPermissions.find(p => p.id === '53')!, // Index Write
      mockPermissions.find(p => p.id === '54')!, // Index Admin
      mockPermissions.find(p => p.id === '55')!, // Query Read
      mockPermissions.find(p => p.id === '56')!, // Query Write
      mockPermissions.find(p => p.id === '57')!, // Query Admin
      mockPermissions.find(p => p.id === '58')!, // Aggregation Read
      mockPermissions.find(p => p.id === '59')!, // Aggregation Write
      mockPermissions.find(p => p.id === '60')!, // Aggregation Admin
      mockPermissions.find(p => p.id === '61')!, // User Management Read
      mockPermissions.find(p => p.id === '62')!, // User Management Write
      mockPermissions.find(p => p.id === '63')!, // User Management Admin
      mockPermissions.find(p => p.id === '64')!, // Role Management Read
      mockPermissions.find(p => p.id === '65')!, // Role Management Write
      mockPermissions.find(p => p.id === '66')!, // Role Management Admin
      mockPermissions.find(p => p.id === '67')!, // Authentication Read
      mockPermissions.find(p => p.id === '68')!, // Authentication Write
      mockPermissions.find(p => p.id === '69')!, // Authentication Admin
      mockPermissions.find(p => p.id === '70')!, // Authorization Read
      mockPermissions.find(p => p.id === '71')!, // Authorization Write
      mockPermissions.find(p => p.id === '72')!, // Authorization Admin
      mockPermissions.find(p => p.id === '73')!, // Backup Read
      mockPermissions.find(p => p.id === '74')!, // Backup Write
      mockPermissions.find(p => p.id === '75')!, // Backup Admin
      mockPermissions.find(p => p.id === '76')!, // Restore Read
      mockPermissions.find(p => p.id === '77')!, // Restore Write
      mockPermissions.find(p => p.id === '78')!, // Restore Admin
      mockPermissions.find(p => p.id === '79')!, // Replication Read
      mockPermissions.find(p => p.id === '80')!, // Replication Write
      mockPermissions.find(p => p.id === '81')!, // Replication Admin
      mockPermissions.find(p => p.id === '82')!, // Sharding Read
      mockPermissions.find(p => p.id === '83')!, // Sharding Write
      mockPermissions.find(p => p.id === '84')!, // Sharding Admin
      mockPermissions.find(p => p.id === '85')!, // Monitoring Read
      mockPermissions.find(p => p.id === '86')!, // Monitoring Write
      mockPermissions.find(p => p.id === '87')!, // Monitoring Admin
      mockPermissions.find(p => p.id === '88')!, // Logs Read
      mockPermissions.find(p => p.id === '89')!, // Logs Write
      mockPermissions.find(p => p.id === '90')!, // Logs Admin
      mockPermissions.find(p => p.id === '91')!, // Performance Read
      mockPermissions.find(p => p.id === '92')!, // Performance Write
      mockPermissions.find(p => p.id === '93')!, // Performance Admin
      mockPermissions.find(p => p.id === '94')!, // Security Read
      mockPermissions.find(p => p.id === '95')!, // Security Write
      mockPermissions.find(p => p.id === '96')!, // Security Admin
      mockPermissions.find(p => p.id === '97')!, // Network Read
      mockPermissions.find(p => p.id === '98')!, // Network Write
      mockPermissions.find(p => p.id === '99')!, // Network Admin
      mockPermissions.find(p => p.id === '100')!, // Storage Read
      mockPermissions.find(p => p.id === '101')!, // Storage Write
      mockPermissions.find(p => p.id === '102')!, // Storage Admin
      mockPermissions.find(p => p.id === '103')!, // Cluster Read
      mockPermissions.find(p => p.id === '104')!, // Cluster Write
      mockPermissions.find(p => p.id === '105')!, // Cluster Admin
      mockPermissions.find(p => p.id === '106')!, // Schema Read
      mockPermissions.find(p => p.id === '107')!, // Schema Write
      mockPermissions.find(p => p.id === '108')!, // Schema Admin
      mockPermissions.find(p => p.id === '109')!, // Migration Read
      mockPermissions.find(p => p.id === '110')!, // Migration Write
      mockPermissions.find(p => p.id === '111')!, // Migration Admin
      mockPermissions.find(p => p.id === '112')!, // Compliance Read
      mockPermissions.find(p => p.id === '113')!, // Compliance Write
      mockPermissions.find(p => p.id === '114')!  // Compliance Admin
    ].filter(Boolean),
    isCustom: true
  },
  {
    id: '12',
    name: 'MongoDB Super Admin',
    description: 'Full access to all MongoDB features and system administration',
    permissions: mockPermissions.filter(p => p.id !== '6'), // All permissions except salary info
    isCustom: true
  }
];

export const mockApplications: Application[] = [
  {
    id: '1',
    name: 'Customer Portal',
    description: 'Customer self-service portal for account management',
    url: 'https://portal.company.com',
    category: 'Customer Service',
    isActive: true,
    createdAt: new Date('2023-01-01'),
    accessLevels: mockAccessLevels,
    customPermissions: []
  },
  {
    id: '2',
    name: 'Internal HR System',
    description: 'Human resources management system',
    url: 'https://hr.company.com',
    category: 'Human Resources',
    isActive: true,
    createdAt: new Date('2023-02-01'),
    accessLevels: mockAccessLevels,
    customPermissions: [
      mockPermissions.find(p => p.id === '6')! // View Salary Info
    ].filter(Boolean)
  },
  {
    id: '3',
    name: 'Project Management Tool',
    description: 'Team collaboration and project tracking',
    url: 'https://projects.company.com',
    category: 'Productivity',
    isActive: true,
    createdAt: new Date('2023-03-01'),
    accessLevels: mockAccessLevels,
    customPermissions: []
  },
  {
    id: '4',
    name: 'GitHub',
    description: 'Source code management and collaboration platform',
    url: 'https://github.com/company',
    category: 'Development',
    isActive: true,
    createdAt: new Date('2023-01-01'),
    accessLevels: githubAccessLevels,
    customPermissions: [
      mockPermissions.find(p => p.id === '7')!, // Repository Read
      mockPermissions.find(p => p.id === '8')!, // Repository Write
      mockPermissions.find(p => p.id === '9')!, // Repository Admin
      mockPermissions.find(p => p.id === '10')!, // Issue Read
      mockPermissions.find(p => p.id === '11')!, // Issue Write
      mockPermissions.find(p => p.id === '12')!, // Issue Admin
      mockPermissions.find(p => p.id === '13')!, // Pull Request Read
      mockPermissions.find(p => p.id === '14')!, // Pull Request Write
      mockPermissions.find(p => p.id === '15')!, // Pull Request Admin
      mockPermissions.find(p => p.id === '16')!, // Organization Read
      mockPermissions.find(p => p.id === '17')!, // Organization Write
      mockPermissions.find(p => p.id === '18')!, // Organization Admin
      mockPermissions.find(p => p.id === '19')!, // Team Read
      mockPermissions.find(p => p.id === '20')!, // Team Write
      mockPermissions.find(p => p.id === '21')!, // Team Admin
      mockPermissions.find(p => p.id === '22')!, // Security Read
      mockPermissions.find(p => p.id === '23')!, // Security Write
      mockPermissions.find(p => p.id === '24')!, // Security Admin
      mockPermissions.find(p => p.id === '25')!, // Actions Read
      mockPermissions.find(p => p.id === '26')!, // Actions Write
      mockPermissions.find(p => p.id === '27')!, // Actions Admin
      mockPermissions.find(p => p.id === '28')!, // Packages Read
      mockPermissions.find(p => p.id === '29')!, // Packages Write
      mockPermissions.find(p => p.id === '30')!, // Packages Admin
      mockPermissions.find(p => p.id === '31')!, // Wiki Read
      mockPermissions.find(p => p.id === '32')!, // Wiki Write
      mockPermissions.find(p => p.id === '33')!, // Wiki Admin
      mockPermissions.find(p => p.id === '34')!, // Discussions Read
      mockPermissions.find(p => p.id === '35')!, // Discussions Write
      mockPermissions.find(p => p.id === '36')!, // Discussions Admin
      mockPermissions.find(p => p.id === '37')!, // Projects Read
      mockPermissions.find(p => p.id === '38')!, // Projects Write
      mockPermissions.find(p => p.id === '39')!, // Projects Admin
      mockPermissions.find(p => p.id === '40')!, // Environments Read
      mockPermissions.find(p => p.id === '41')!, // Environments Write
      mockPermissions.find(p => p.id === '42')!  // Environments Admin
    ].filter(Boolean)
  },
  {
    id: '5',
    name: 'MongoDB',
    description: 'NoSQL database management and administration platform',
    url: 'mongodb://localhost:27017',
    category: 'Database',
    isActive: true,
    createdAt: new Date('2023-01-01'),
    accessLevels: mongoDBAccessLevels,
    customPermissions: [
      mockPermissions.find(p => p.id === '43')!, // Database Read
      mockPermissions.find(p => p.id === '44')!, // Database Write
      mockPermissions.find(p => p.id === '45')!, // Database Admin
      mockPermissions.find(p => p.id === '46')!, // Collection Read
      mockPermissions.find(p => p.id === '47')!, // Collection Write
      mockPermissions.find(p => p.id === '48')!, // Collection Admin
      mockPermissions.find(p => p.id === '49')!, // Document Read
      mockPermissions.find(p => p.id === '50')!, // Document Write
      mockPermissions.find(p => p.id === '51')!, // Document Admin
      mockPermissions.find(p => p.id === '52')!, // Index Read
      mockPermissions.find(p => p.id === '53')!, // Index Write
      mockPermissions.find(p => p.id === '54')!, // Index Admin
      mockPermissions.find(p => p.id === '55')!, // Query Read
      mockPermissions.find(p => p.id === '56')!, // Query Write
      mockPermissions.find(p => p.id === '57')!, // Query Admin
      mockPermissions.find(p => p.id === '58')!, // Aggregation Read
      mockPermissions.find(p => p.id === '59')!, // Aggregation Write
      mockPermissions.find(p => p.id === '60')!, // Aggregation Admin
      mockPermissions.find(p => p.id === '61')!, // User Management Read
      mockPermissions.find(p => p.id === '62')!, // User Management Write
      mockPermissions.find(p => p.id === '63')!, // User Management Admin
      mockPermissions.find(p => p.id === '64')!, // Role Management Read
      mockPermissions.find(p => p.id === '65')!, // Role Management Write
      mockPermissions.find(p => p.id === '66')!, // Role Management Admin
      mockPermissions.find(p => p.id === '67')!, // Authentication Read
      mockPermissions.find(p => p.id === '68')!, // Authentication Write
      mockPermissions.find(p => p.id === '69')!, // Authentication Admin
      mockPermissions.find(p => p.id === '70')!, // Authorization Read
      mockPermissions.find(p => p.id === '71')!, // Authorization Write
      mockPermissions.find(p => p.id === '72')!, // Authorization Admin
      mockPermissions.find(p => p.id === '73')!, // Backup Read
      mockPermissions.find(p => p.id === '74')!, // Backup Write
      mockPermissions.find(p => p.id === '75')!, // Backup Admin
      mockPermissions.find(p => p.id === '76')!, // Restore Read
      mockPermissions.find(p => p.id === '77')!, // Restore Write
      mockPermissions.find(p => p.id === '78')!, // Restore Admin
      mockPermissions.find(p => p.id === '79')!, // Replication Read
      mockPermissions.find(p => p.id === '80')!, // Replication Write
      mockPermissions.find(p => p.id === '81')!, // Replication Admin
      mockPermissions.find(p => p.id === '82')!, // Sharding Read
      mockPermissions.find(p => p.id === '83')!, // Sharding Write
      mockPermissions.find(p => p.id === '84')!, // Sharding Admin
      mockPermissions.find(p => p.id === '85')!, // Monitoring Read
      mockPermissions.find(p => p.id === '86')!, // Monitoring Write
      mockPermissions.find(p => p.id === '87')!, // Monitoring Admin
      mockPermissions.find(p => p.id === '88')!, // Logs Read
      mockPermissions.find(p => p.id === '89')!, // Logs Write
      mockPermissions.find(p => p.id === '90')!, // Logs Admin
      mockPermissions.find(p => p.id === '91')!, // Performance Read
      mockPermissions.find(p => p.id === '92')!, // Performance Write
      mockPermissions.find(p => p.id === '93')!, // Performance Admin
      mockPermissions.find(p => p.id === '94')!, // Security Read
      mockPermissions.find(p => p.id === '95')!, // Security Write
      mockPermissions.find(p => p.id === '96')!, // Security Admin
      mockPermissions.find(p => p.id === '97')!, // Network Read
      mockPermissions.find(p => p.id === '98')!, // Network Write
      mockPermissions.find(p => p.id === '99')!, // Network Admin
      mockPermissions.find(p => p.id === '100')!, // Storage Read
      mockPermissions.find(p => p.id === '101')!, // Storage Write
      mockPermissions.find(p => p.id === '102')!, // Storage Admin
      mockPermissions.find(p => p.id === '103')!, // Cluster Read
      mockPermissions.find(p => p.id === '104')!, // Cluster Write
      mockPermissions.find(p => p.id === '105')!, // Cluster Admin
      mockPermissions.find(p => p.id === '106')!, // Schema Read
      mockPermissions.find(p => p.id === '107')!, // Schema Write
      mockPermissions.find(p => p.id === '108')!, // Schema Admin
      mockPermissions.find(p => p.id === '109')!, // Migration Read
      mockPermissions.find(p => p.id === '110')!, // Migration Write
      mockPermissions.find(p => p.id === '111')!, // Migration Admin
      mockPermissions.find(p => p.id === '112')!, // Compliance Read
      mockPermissions.find(p => p.id === '113')!, // Compliance Write
      mockPermissions.find(p => p.id === '114')!  // Compliance Admin
    ].filter(Boolean)
  }
];

export const mockUserAccess: UserAccess[] = [
  {
    id: '1',
    userId: '1',
    applicationId: '1',
    accessLevelId: '2',
    grantedBy: 'admin@company.com',
    grantedAt: new Date('2023-01-20'),
    isActive: true,
    customPermissions: []
  },
  {
    id: '2',
    userId: '2',
    applicationId: '1',
    accessLevelId: '3',
    grantedBy: 'admin@company.com',
    grantedAt: new Date('2023-02-25'),
    isActive: true,
    customPermissions: []
  },
  {
    id: '3',
    userId: '1',
    applicationId: '2',
    accessLevelId: '1',
    grantedBy: 'hr@company.com',
    grantedAt: new Date('2023-02-10'),
    isActive: true,
    customPermissions: ['6']
  },
  {
    id: '4',
    userId: '3',
    applicationId: '3',
    accessLevelId: '4',
    grantedBy: 'admin@company.com',
    grantedAt: new Date('2023-03-15'),
    isActive: true,
    customPermissions: []
  },
  // GitHub access examples
  {
    id: '5',
    userId: '1', // John Doe - Software Engineer
    applicationId: '4', // GitHub
    accessLevelId: '6', // GitHub Contributor
    grantedBy: 'admin@company.com',
    grantedAt: new Date('2023-01-01'),
    isActive: true,
    customPermissions: []
  },
  {
    id: '6',
    userId: '2', // Jane Smith - Product Manager
    applicationId: '4', // GitHub
    accessLevelId: '5', // GitHub Viewer
    grantedBy: 'admin@company.com',
    grantedAt: new Date('2023-01-01'),
    isActive: true,
    customPermissions: []
  },
  {
    id: '7',
    userId: '3', // Bob Johnson - DevOps Engineer
    applicationId: '4', // GitHub
    accessLevelId: '7', // GitHub Maintainer
    grantedBy: 'admin@company.com',
    grantedAt: new Date('2023-01-01'),
    isActive: true,
    customPermissions: []
  },
  {
    id: '8',
    userId: '4', // Alice Brown - UX Designer
    applicationId: '4', // GitHub
    accessLevelId: '5', // GitHub Viewer
    grantedBy: 'admin@company.com',
    grantedAt: new Date('2023-01-01'),
    isActive: true,
    customPermissions: []
  },
  // MongoDB access examples
  {
    id: '9',
    userId: '1', // John Doe - Software Engineer
    applicationId: '5', // MongoDB
    accessLevelId: '10', // MongoDB Developer
    grantedBy: 'admin@company.com',
    grantedAt: new Date('2023-01-01'),
    isActive: true,
    customPermissions: []
  },
  {
    id: '10',
    userId: '2', // Jane Smith - Product Manager
    applicationId: '5', // MongoDB
    accessLevelId: '9', // MongoDB Viewer
    grantedBy: 'admin@company.com',
    grantedAt: new Date('2023-01-01'),
    isActive: true,
    customPermissions: []
  },
  {
    id: '11',
    userId: '3', // Bob Johnson - DevOps Engineer
    applicationId: '5', // MongoDB
    accessLevelId: '11', // MongoDB Administrator
    grantedBy: 'admin@company.com',
    grantedAt: new Date('2023-01-01'),
    isActive: true,
    customPermissions: []
  },
  {
    id: '12',
    userId: '4', // Alice Brown - UX Designer
    applicationId: '5', // MongoDB
    accessLevelId: '9', // MongoDB Viewer
    grantedBy: 'admin@company.com',
    grantedAt: new Date('2023-01-01'),
    isActive: true,
    customPermissions: []
  }
];
