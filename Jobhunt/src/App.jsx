import { Routes, Route, Navigate, NavLink as RouterNavLink } from 'react-router-dom';
import { Home, Briefcase, FileText, User } from 'lucide-react';
import { useAuth } from './pages/auth-context';

import HomePage from "./pages/HomePage";
import JobListingPage from "./pages/JobListingPage";
import JobDetails from "./pages/JobDetails";
import ApplyPage from "./pages/ApplyPage";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage'; 
import RegisterPage from './pages/RegisterPage';
function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col pb-16">
      <Routes>
        {/* Public Route */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Private Routes */}
        <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/jobs" element={<PrivateRoute><JobListingPage /></PrivateRoute>} />
        <Route path="/jobs/:id" element={<PrivateRoute><JobDetails /></PrivateRoute>} />
        <Route path="/jobs/:id/apply" element={<PrivateRoute><ApplyPage /></PrivateRoute>} />
        <Route path="/resume-builder" element={<PrivateRoute><ResumeBuilderPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      </Routes>

      {/* Mobile Bottom Navigation */}
      {user && (
        <nav className="md:hidden fixed bottom-0 w-full bg-white border-t">
          <div className="flex justify-around py-3">
            <NavLink to="/" icon={<Home size={20} />} text="Home" />
            <NavLink to="/jobs" icon={<Briefcase size={20} />} text="Jobs" />
            <NavLink to="/resume-builder" icon={<FileText size={20} />} text="Resume" />
            <NavLink to="/profile" icon={<User size={20} />} text="Profile" />
          </div>
        </nav>
      )}
    </div>
  );
}

// PrivateRoute Component
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
}

// NavLink Component with Active Highlight
const NavLink = ({ to, icon, text }) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center text-xs ${
        isActive ? 'text-blue-600' : 'text-gray-600'
      } hover:text-blue-600`
    }
  >
    {icon}
    <span className="mt-1">{text}</span>
  </RouterNavLink>
);

export default App;
