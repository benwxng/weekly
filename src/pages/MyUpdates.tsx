import React, { useEffect, useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import UpdateCard from '../components/UpdateCard';
import { supabase } from '../lib/supabase';
import type { Update } from '../lib/types';

export default function MyUpdates() {
  const { user } = useAuth();
  const [updates, setUpdates] = useState<Update[]>([]);

  useEffect(() => {
    if (user?.id) {
      loadMyUpdates();
    }
  }, [user?.id]);

  const loadMyUpdates = async () => {
    const { data, error } = await supabase
      .from('updates')
      .select(`
        *,
        author:profiles(username, avatar_url)
      `)
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setUpdates(data);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      {updates.map((update) => (
        <UpdateCard key={update.id} {...update} />
      ))}
    </div>
  );
}