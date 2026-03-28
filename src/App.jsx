import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from './context/AppContext.jsx';

// Pages
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import InputScreen from './pages/InputScreen.jsx';
import Processing from './pages/Processing.jsx';
import Dashboard from './pages/Dashboard.jsx';

/**
 * ProtectedRoute component - Wraps routes that require authentication
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

/**
 * App component - Main application component with routing
 * Defines all routes and their protection levels
 */
function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected Routes */}
      <Route 
        path="/input" 
        element={
          <ProtectedRoute>
            <InputScreen />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/processing" 
        element={
          <ProtectedRoute>
            <Processing />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch-all - Redirect to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
