# Access Control Hub

A comprehensive web-based application access control management system that allows administrators to manage applications, users, and their access privileges with detailed reporting capabilities.

## Features

### 🏢 **Application Management**
- Add, edit, and remove applications
- Categorize applications by type (Customer Service, HR, Productivity, etc.)
- Set application URLs and descriptions
- Enable/disable applications
- Configure custom permissions per application

### 👥 **User Management**
- Create and manage user accounts
- Set user roles and departments
- Track user status (active/inactive)
- Monitor user creation dates and last login times
- View user access across all applications

### 🔐 **Access Control**
- Grant and revoke user access to applications
- Set access levels (Viewer, Editor, Manager, Administrator)
- Configure custom permissions with checkboxes
- Set access expiration dates
- Bulk access management with filtering

### 📊 **Reporting & Analytics**
- Generate detailed access reports for any application
- View users by access level
- Export reports in JSON format
- Quick statistics for all applications
- Custom permission tracking

### 🎨 **Modern UI/UX**
- Responsive design with Tailwind CSS
- Intuitive navigation and workflows
- Modal-based forms for data entry
- Real-time filtering and search
- Beautiful data visualization

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: React Context + useReducer
- **Routing**: React Router DOM

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AccessDogApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## Application Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.tsx
│   ├── ApplicationModal.tsx
│   ├── UserModal.tsx
│   └── AccessControlModal.tsx
├── contexts/           # React context providers
│   └── AccessContext.tsx
├── data/              # Mock data and initial state
│   └── mockData.ts
├── pages/             # Main application pages
│   ├── Dashboard.tsx
│   ├── Applications.tsx
│   ├── Users.tsx
│   ├── AccessControl.tsx
│   └── Reports.tsx
├── types/             # TypeScript type definitions
│   └── index.ts
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Core Concepts

### Access Levels
The system uses predefined access levels that determine what users can do:

- **Viewer**: Basic read-only access
- **Editor**: Can view and edit data
- **Manager**: Full access except admin functions
- **Administrator**: Complete access to all features

### Custom Permissions
Applications can have custom permissions beyond the standard access levels:
- Resource-specific permissions (e.g., "View Salary Info")
- Action-based permissions (read, write, delete, admin)
- Granular control over user capabilities

### User Access Management
- Users can have different access levels for different applications
- Access can be granted with expiration dates
- Custom permissions can be added to standard access levels
- Access can be temporarily disabled without deletion

## Usage Examples

### Adding a New Application
1. Navigate to Applications page
2. Click "Add Application"
3. Fill in name, description, category, and URL
4. Set active status
5. Save to create the application

### Granting User Access
1. Go to Access Control page
2. Click "Grant Access"
3. Select user and application
4. Choose access level
5. Add custom permissions if needed
6. Set expiration date (optional)
7. Save to grant access

### Generating Reports
1. Visit Reports page
2. Select an application from dropdown
3. Click "Generate Report"
4. View detailed access information
5. Export report as JSON if needed

## Data Model

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}
```

### Application
```typescript
interface Application {
  id: string;
  name: string;
  description: string;
  url?: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
  accessLevels: AccessLevel[];
  customPermissions: Permission[];
}
```

### UserAccess
```typescript
interface UserAccess {
  id: string;
  userId: string;
  applicationId: string;
  accessLevelId: string;
  grantedBy: string;
  grantedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  customPermissions: string[];
}
```

## Customization

### Adding New Access Levels
1. Modify the `mockAccessLevels` array in `src/data/mockData.ts`
2. Add new permissions to `mockPermissions`
3. Update the access level definitions

### Adding New Application Categories
1. Update the category options in `ApplicationModal.tsx`
2. Add new categories to the select dropdown

### Custom Permissions
1. Add new permissions to applications in `mockData.ts`
2. Define resource and action types
3. Update permission handling in components

## Security Considerations

- All access changes are logged with timestamps
- Access can be revoked immediately
- Expiration dates prevent long-term access
- Custom permissions provide granular control
- User status can be disabled without deletion

## Future Enhancements

- **Authentication & Authorization**: Real user authentication system
- **Audit Logging**: Comprehensive access change tracking
- **Role-Based Access Control**: Advanced RBAC implementation
- **API Integration**: Connect to real application systems
- **Bulk Operations**: Mass user access management
- **Advanced Reporting**: Charts, graphs, and analytics
- **Email Notifications**: Access change alerts
- **Mobile App**: Native mobile application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please open an issue in the repository or contact the development team.

---

**Access Control Hub** - Secure, scalable, and user-friendly application access management.

