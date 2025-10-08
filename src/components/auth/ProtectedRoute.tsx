import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import { LoadingSpinner } from '@/components/common';
import { ROUTES } from '@/utils/constants';
import type { iProtectedRoute } from '@/types';

const ProtectedRoute = ({ children }: iProtectedRoute) => {
    const { isSignedIn, isLoaded } = useAuth();

    // Show loading while auth state is being determined
    if (!isLoaded) {
        return <LoadingSpinner message="Checking authentication..." fullScreen />;
    }

    // Redirect to login if not signed in
    if (!isSignedIn) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;