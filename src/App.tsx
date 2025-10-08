import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/authPages/LandingPage.tsx'
import LoginPage from './pages/authPages/LoginPage.tsx'
import SignupPage from './pages/authPages/SignupPage.tsx'
import LeadManagement from './pages/mainPages/LeadManagement.tsx'
import { ComingSoon } from './components/customUI/ComingSoon.tsx'
import ProtectedRoute from './components/auth/ProtectedRoute.tsx'
import { ErrorBoundary } from './components/common'
import { ROUTES, COMING_SOON_ROUTES } from './utils/constants'
import { useAuth } from '@clerk/clerk-react'
import { LoadingSpinner } from './components/common'

function App() {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading while auth state is being determined
  if (!isLoaded) return <LoadingSpinner message="Loading application..." fullScreen />;
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Public routes - only accessible when NOT signed in */}
          {!isSignedIn && (
            <>
              <Route path={ROUTES.HOME} element={<LandingPage />} />
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
            </>
          )}

          {/* Protected routes - only accessible when signed in */}
          <Route path={ROUTES.LEAD_MANAGEMENT} element={
            <ProtectedRoute>
              <LeadManagement />
            </ProtectedRoute>
          } />
          {COMING_SOON_ROUTES.map((path) => <Route key={path} path={path} element={
            <ProtectedRoute>
              <ComingSoon />
            </ProtectedRoute>
          } />)}

          {/* Redirect logic based on auth state */}
          <Route path="*" element={
            <Navigate to={isSignedIn ? ROUTES.LEAD_MANAGEMENT : ROUTES.HOME} replace />
          } />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
