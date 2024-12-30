import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, Settings, LogOut } from 'lucide-react';
import { signOut } from '../lib/auth';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/sign-in');
  };

  return (
    <div className="w-64 h-screen bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">weekly.</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 py-4">
        <button 
          onClick={() => navigate('/')}
          className="flex w-full items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <Calendar className="w-5 h-5 mr-3" />
          <span>Feed</span>
        </button>
        <button 
          onClick={() => navigate('/friends')}
          className="flex w-full items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <Users className="w-5 h-5 mr-3" />
          <span>Friends</span>
        </button>
        <button 
          onClick={() => navigate('/my-updates')}
          className="flex w-full items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <Calendar className="w-5 h-5 mr-3" />
          <span>My Updates</span>
        </button>
        <button 
          onClick={() => navigate('/settings')}
          className="flex w-full items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <Settings className="w-5 h-5 mr-3" />
          <span>Settings</span>
        </button>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}