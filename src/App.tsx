import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/authPages/LandingPage.tsx'
import LoginPage from './pages/authPages/LoginPage.tsx'
import SignupPage from './pages/authPages/SignupPage.tsx'
import LeadManagement from './pages/mainPages/LeadManagement.tsx'
import ComingSoon from './components/customUI/ComingSoon.tsx'

const comingSoonRoutes = [
  '/dashboard', '/wellVantageLeads', '/memberManagement',
  '/membershipManagement', '/attendanceTracking', '/employeeManagement',
  '/revenueManagement', '/expenseManagementAndProfit', '/workoutManagement'
]

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/leadManagement" element={<LeadManagement />} />
        {comingSoonRoutes.map((path) => <Route key={path} path={path} element={<ComingSoon />} />)}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
