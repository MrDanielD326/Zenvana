// Application constants
export const APP_NAME = 'Zenvana';

// Route constants
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    LEAD_MANAGEMENT: '/leadManagement',
    DASHBOARD: '/dashboard',
    WELL_VANTAGE_LEADS: '/wellVantageLeads',
    MEMBER_MANAGEMENT: '/memberManagement',
    MEMBERSHIP_MANAGEMENT: '/membershipManagement',
    ATTENDANCE_TRACKING: '/attendanceTracking',
    EMPLOYEE_MANAGEMENT: '/employeeManagement',
    REVENUE_MANAGEMENT: '/revenueManagement',
    EXPENSE_MANAGEMENT: '/expenseManagementAndProfit',
    WORKOUT_MANAGEMENT: '/workoutManagement',
} as const;

// Coming soon routes
export const COMING_SOON_ROUTES = [
    ROUTES.DASHBOARD,
    ROUTES.WELL_VANTAGE_LEADS,
    ROUTES.MEMBER_MANAGEMENT,
    ROUTES.MEMBERSHIP_MANAGEMENT,
    ROUTES.ATTENDANCE_TRACKING,
    ROUTES.EMPLOYEE_MANAGEMENT,
    ROUTES.REVENUE_MANAGEMENT,
    ROUTES.EXPENSE_MANAGEMENT,
    ROUTES.WORKOUT_MANAGEMENT,
];

// Storage keys
export const STORAGE_KEYS = {
    COMPLETE_LEADS_DATA: 'completeLeadsData',
} as const;
