import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSessionStore } from './store/useSessionStore';
import { AuthUseCases } from './application/authUseCases';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/dashboard/Home';
import Profile from './pages/dashboard/Profile';
import Landing from './pages/Landing';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const { setSession, isAuthenticated } = useSessionStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const session = await AuthUseCases.getSession();
        if (session) {
          setSession(session.user, session.profile);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsReady(true);
      }
    };
    
    initializeAuth();
  }, [setSession]);

  if (!isReady) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-textPrimary">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-textPrimary selection:bg-primary/30 font-sans">
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Landing />
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" replace />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<div className="p-8"><h1 className="text-2xl font-bold">Explore (Coming soon)</h1></div>} />
          <Route path="create" element={<div className="p-8"><h1 className="text-2xl font-bold">Create (Coming soon)</h1></div>} />
          <Route path="activity" element={<div className="p-8"><h1 className="text-2xl font-bold">Activity (Coming soon)</h1></div>} />
          <Route path="profile" element={<Navigate to="me" replace />} />
          <Route path="profile/:username" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}
