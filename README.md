# Zenvana - Gym Management System

A modern, comprehensive gym management system built with React, TypeScript, and Vite. Zenvana provides tools for lead management, member tracking, and business operations for fitness centers.

## 🚀 Features

### Lead Management
- **Advanced DataTable** with search, filtering, and pagination
- **Multi-step Lead Forms** with validation (Basic Info, Preferences, Status)
- **Interest Level Tracking** (Hot, Warm, Cold) with visual indicators
- **Follow-up Status Management** with color-coded badges
- **Custom Notes** with date tracking
- **Real-time Data Persistence** using session storage

### Authentication & Security
- **Clerk Authentication** integration for secure user management
- **Protected Routes** with role-based access control
- **Session Management** with automatic token refresh

### UI/UX
- **Modern Design System** with Tailwind CSS and Radix UI
- **Responsive Layout** optimized for desktop and mobile
- **Professional Skeletons** for loading states
- **Consistent Color Scheme** with green accent theme
- **Accessibility Compliant** components

## 🏗️ Project Structure

```
zenvana/
├── public/                     # Static assets
│   ├── backgroundA-D.svg       # Background images
│   ├── brandLogo.svg           # Company logo
│   ├── brandTitle.svg          # Brand title
│   └── button*.svg             # Social login buttons
├── src/
│   ├── components/             # React components
│   │   ├── auth/               # Authentication components
│   │   │   └── ProtectedRoute.tsx
│   │   ├── common/             # Shared components
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── customUI/           # Custom business components
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AuthLayout.tsx
│   │   │   ├── ClerkAuth.tsx
│   │   │   ├── ComingSoon.tsx
│   │   │   ├── DataTable.tsx
│   │   │   ├── FormLayout.tsx
│   │   │   └── ImageBadge.tsx
│   │   └── ui/                 # Reusable UI components (Radix UI)
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── checkbox.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── field.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       └── tooltip.tsx
│   ├── config/                 # Configuration files
│   │   ├── config.json         # App configuration & dropdown options
│   │   ├── env.ts              # Environment variables
│   │   ├── index.ts            # Config exports
│   │   └── sidebarIcons.tsx    # Navigation icons
│   ├── data/                   # Sample data
│   │   └── sampleLeads.ts      # Lead management test data
│   ├── hooks/                  # Custom React hooks
│   │   └── use-mobile.ts       # Mobile detection hook
│   ├── lib/                    # Utility libraries
│   │   └── utils.ts            # Common utility functions
│   ├── pages/                  # Page components
│   │   ├── authPages/          # Authentication pages
│   │   │   ├── LandingPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── SignupPage.tsx
│   │   └── mainPages/           # Main application pages
│   │       └── LeadManagement.tsx
│   ├── types/                   # TypeScript type definitions
│   │   ├── auth.ts              # Authentication types
│   │   ├── index.ts             # Type exports
│   │   ├── layout.ts            # Layout types
│   │   └── types.ts             # General types
│   ├── utils/                   # Utility functions
│   │   ├── constants.ts         # App constants
│   │   ├── dateUtils.ts         # Date manipulation utilities
│   │   └── index.ts             # Utility exports
│   ├── App.tsx                  # Main app component
│   ├── index.css                # Global styles
│   └── main.tsx                 # App entry point
├── .env                         # Environment variables
├── components.json              # Shadcn/ui configuration
├── eslint.config.js             # ESLint configuration
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vercel.json                  # Vercel deployment config
└── vite.config.ts               # Vite configuration
```

## 🛠️ Tech Stack

### Core Technologies
- **React 19.1.1** - Modern React with latest features
- **TypeScript 5.9.3** - Type-safe JavaScript
- **Vite 7.1.7** - Fast build tool and dev server

### UI & Styling
- **Tailwind CSS 4.1.14** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Class Variance Authority** - Component variant management

### Authentication & Data
- **Clerk** - Complete authentication solution
- **React Router DOM 7.9.3** - Client-side routing
- **Chrono Node** - Natural language date parsing
- **Date-fns** - Date manipulation library

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite React Plugin** - React support for Vite

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zenvana
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Configure your environment variables in `.env`:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   # Add other environment variables as needed
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 📜 Available Scripts

### Development
```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build (http://localhost:4173)
npm run lint         # Run ESLint for code quality
```

### Production Deployment
The project is configured for **Vercel** deployment with automatic SPA routing via `vercel.json`.

For manual deployment:
```bash
npm run build        # Build the project
# Deploy the 'dist' folder to your hosting provider
```

## 🎯 Key Features Explained

### DataTable Component
- **Advanced filtering** by interest level, assigned person, and date ranges
- **Dynamic date filtering** with intelligent date parsing
- **Pagination** with customizable page sizes
- **Row selection** with bulk operations
- **Responsive design** for mobile and desktop
- **Professional loading skeletons**

### Lead Management System
- **Three-step form process**: Basic Info → Preferences → Status
- **Progressive validation** prevents skipping incomplete sections
- **Real-time form validation** with helpful error messages
- **Custom notes** with individual date pickers
- **Data persistence** using session storage
- **Edit existing leads** with full data restoration

### Loading States
- **Multiple skeleton variants**: table, form, dashboard, default
- **Realistic loading animations** that match actual UI structure
- **Smooth transitions** between loading and loaded states
- **Professional user experience** with proper loading feedback

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS v4 with custom configuration in `vite.config.ts`. The design system includes:
- **Green accent theme** (#28A745, #16A34A)
- **Consistent spacing** and typography
- **Responsive breakpoints** for mobile-first design
- **Custom component variants** using Class Variance Authority

### TypeScript
Strict TypeScript configuration with:
- **Path aliases** (`@/` maps to `src/`)
- **Strict type checking** enabled
- **Modern ES modules** support
- **Component prop validation**

### Build Optimization
Vite configuration includes:
- **Code splitting** by vendor, UI components, and utilities
- **Tree shaking** for smaller bundle sizes
- **Asset optimization** with caching strategies
- **Development server** with HMR (Hot Module Replacement)

## 🚦 Routing Structure

```
/                    # Landing page
/login               # User login
/signup              # User registration
/leadManagement      # Lead management dashboard
```

Additional routes can be added in `src/App.tsx` following the existing pattern.

## 🎨 Design System

### Colors
- **Primary**: Green (#28A745, #16A34A)
- **Secondary**: Gray scale (#F3F4F6, #E5E7EB, #9CA3AF)
- **Status Colors**: 
  - Hot leads: Red (#EF4444)
  - Warm leads: Yellow (#F59E0B)
  - Cold leads: Blue (#3B82F6)

### Typography
- **Font Family**: System fonts with fallbacks
- **Font Sizes**: Tailwind's default scale (text-xs to text-6xl)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary. All rights reserved.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---
