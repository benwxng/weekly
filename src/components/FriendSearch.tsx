import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Friend } from '../lib/types';

export default function FriendSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Friend[]>([]);

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, avatar_url')
      .ilike('username', `%${searchTerm}%`)
      .limit(10);

    if (!error && data) {
      setResults(data);
    }
  };

  const addFriend = async (friendId: string) => {
    const { error } = await supabase
      .from('friendships')
      .insert([
        { user_id: supabase.auth.user()?.id, friend_id: friendId }
      ]);

    if (!error) {
      // Update UI to show friend added
      setResults(results.filter(r => r.id !== friendId));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {results.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <img src={user.avatar_url} alt={user.username} className="w-10 h-10 rounded-full" />
              <span className="font-medium dark:text-gray-200">{user.username}</span>
            </div>
            <button
              onClick={() => addFriend(user.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}