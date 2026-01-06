# Employee Management System

A modern, responsive employee management dashboard built with Next.js 16 and TypeScript. This application streamlines employee data management with an intuitive interface, featuring comprehensive CRUD operations, advanced filtering, and print capabilities.

## Overview

This project was developed as a complete employee management solution that allows organizations to efficiently manage their workforce. The system includes authentication, a statistics dashboard, and full employee lifecycle management from onboarding to offboarding.

The application demonstrates modern web development practices with a focus on user experience, type safety, and maintainable code architecture.

## Features

**Authentication & Security**

- Secure login system with session management
- Protected routes preventing unauthorized access
- Automatic session persistence across browser refreshes

**Dashboard**

- Real-time employee statistics showing total, active, and inactive counts
- Gender distribution overview
- Quick action buttons for common tasks
- Dynamic updates based on actual employee data

**Employee Management**

- Complete CRUD operations (Create, Read, Update, Delete)
- Detailed employee profiles with personal information
- Profile image upload with live preview
- Status management (Active/Inactive toggle)
- Delete confirmation to prevent accidental data loss

**Search & Filtering**

- Real-time search by employee name
- Multi-criteria filtering system:
  - Filter by gender (Male, Female, Other)
  - Filter by employment status (Active, Inactive)
  - Filter by state/location
- Combined filtering - all filters work together
- Clear filters option to reset search criteria
- Live result count showing filtered vs total employees

**Print Functionality**

- Print individual employee details with formatted layout
- Print filtered employee lists as formatted tables
- Professional, printer-friendly styling
- Automatic date stamping on printed documents

**Data Persistence**

- LocalStorage integration for data retention
- Pre-loaded with 20 sample employees
- Data survives browser refreshes
- Easy to reset and start fresh

## Tech Stack

**Framework & Core**

- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - Latest React with improved performance
- **TypeScript 5** - Type-safe JavaScript for better code quality
- **Tailwind CSS 4** - Utility-first CSS framework

**UI Components**

- **Radix UI** - Accessible component primitives
  - Dialog for modals
  - Select for dropdowns
  - Avatar for profile images
  - Switch for toggles
  - Label components
- **Lucide React** - Beautiful, consistent icon set
- **class-variance-authority** - Managing component variants
- **clsx & tailwind-merge** - Smart className handling

**Form Management & Validation**

- **React Hook Form 7.70.0** - Performant form handling
- **Zod 4.3.5** - TypeScript-first schema validation
- **@hookform/resolvers** - Zod integration with React Hook Form

**Development Tools**

- **ESLint** - Code linting and quality checks
- **Babel React Compiler** - Performance optimizations
- **tw-animate-css** - Animation utilities

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js 18.0.0 or higher
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository to your local machine:

```bash
git clone <repository-url>
cd employee-management-system
```

2. Install all dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

### Login Credentials

Use these credentials to access the system:

```
Username: admin
Password: admin123
```

## Project Structure

The project follows Next.js 16 App Router conventions with a clean, organized structure:

```
├── src/
│   ├── app/
│   │   ├── (auth)/              # Public authentication routes
│   │   │   ├── layout.tsx
│   │   │   └── login/page.tsx
│   │   ├── (dashboard)/         # Protected dashboard routes
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   └── employees/page.tsx
│   │   ├── layout.tsx           # Root layout with providers
│   │   └── globals.css
│   ├── components/
│   │   ├── auth/               # Authentication components
│   │   ├── common/             # Reusable UI components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   ├── employees/          # Employee management components
│   │   └── layout/             # Layout components (Sidebar, Header)
│   ├── context/
│   │   ├── AuthContext.tsx     # Authentication state
│   │   └── EmployeeContext.tsx # Employee data state
│   ├── data/
│   │   └── mockEmployees.ts    # Sample employee data
│   └── types/
│       ├── index.ts
│       └── employee.ts         # Type definitions
└── package.json
```

## Design Decisions

### Why LocalStorage?

I chose LocalStorage for data persistence to keep the project simple and self-contained. This means the application works immediately without needing a backend server or database setup. In a real-world scenario, this would be replaced with API calls to a backend service.

### Authentication Approach

The authentication system uses a straightforward username/password check with session storage. While this is perfect for a demo or internal tool, production applications would need JWT tokens, secure password hashing, and proper session management.

### Form Validation Strategy

I implemented client-side validation using Zod schemas with React Hook Form. This provides immediate feedback to users and prevents invalid data submission. The validation includes:

- Required field checks
- Minimum length requirements
- Age validation (employees must be 18-100 years old)
- Date format validation

### State Management

Instead of using complex state management libraries like Redux, I used React Context API for:

- Authentication state (user session)
- Employee data (CRUD operations)
- Toast notifications (user feedback)

This keeps the codebase simple while still maintaining clean separation of concerns.

### UI Component Library Choice

I went with Radix UI because it provides unstyled, accessible components that work great with Tailwind CSS. This gives us complete control over styling while ensuring the app is accessible to all users.

### Image Handling

Profile images are stored as base64-encoded strings. While this isn't ideal for production (you'd want cloud storage like AWS S3), it works perfectly for this demo and keeps everything self-contained without external dependencies.

### Print Implementation

The print functionality uses the native browser print dialog with custom CSS. I created two print layouts:

1. Individual employee cards with all details
2. Filtered employee lists in table format

Both layouts are optimized for printing with clean, professional styling.

### Filter Logic

The search and filter system uses React's useMemo hook for performance optimization. All filters work simultaneously using AND logic, meaning employees must match all active filter criteria to appear in the results.

## Sample Data

The application comes pre-loaded with 20 employee records. The data focuses on Indian states with an emphasis on Hyderabad/Telangana region. The sample includes:

- Mix of active (15) and inactive (5) employees
- Balanced gender distribution
- Various states represented
- Realistic names and dates
- Generated avatar images using DiceBear API

Each employee record contains:

- Unique ID (EMP001, EMP002, etc.)
- Full name
- Gender
- Date of birth
- State
- Profile image
- Active/Inactive status
- Creation timestamp

## Known Limitations

**Data Storage**: Since we're using LocalStorage, the data is stored only on your device. If you clear browser data or switch devices, the employee data will be reset to the default 20 records.

**Image Size**: Large profile images can fill up LocalStorage quickly. The browser typically has a 5-10MB limit, so be mindful when uploading high-resolution images.

**Concurrent Users**: This is a single-user application. Multiple people can't work on the same data simultaneously since there's no backend synchronization.

**Browser Compatibility**: The app requires a modern browser that supports ES6+, React 19, and LocalStorage. Internet Explorer is not supported.

## Contributing

Since this is an assignment project, contributions aren't expected. However, if you find any bugs or have suggestions, feel free to open an issue on GitHub.

## License

This project is created for educational purposes as part of an assignment. Feel free to use it as a learning resource or template for your own projects.

## Contact

If you have any questions about this project or want to discuss the implementation, feel free to reach out:

- GitHub: [http://github.com/dilipgandham123]
- Email: dilipgandham83@gmail.com

---

**Built with Next.js 16, TypeScript, and Tailwind CSS**

_This project demonstrates modern React development practices with a focus on clean code, user experience, and maintainable architecture._
"# employee-management-system" 
