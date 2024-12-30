import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PenSquare } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Friends from './pages/Friends';
import MyUpdates from './pages/MyUpdates';
import Settings from './components/Settings';
import UpdateModal from './components/UpdateModal';
import WeekHeader from './components/WeekHeader';
import AuthForm from './components/AuthForm';
import { AuthProvider, useAuth } from './lib/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Loading state
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return children;
}

function MainApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <main className="flex-1 relative">
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
            <WeekHeader />
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <PenSquare className="w-5 h-5" />
              <span>New Update</span>
            </button>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/my-updates" element={<MyUpdates />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        
        <UpdateModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/sign-in" element={<AuthForm mode="sign-in" />} />
          <Route path="/sign-up" element={<AuthForm mode="sign-up" />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <MainApp />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}