import React from 'react';
import FriendSearch from '../components/FriendSearch';

export default function Friends() {
  return (
    <div className="py-8">
      <h2 className="text-xl font-semibold mb-6 px-4 dark:text-gray-200">Find Friends</h2>
      <FriendSearch />
    </div>
  );
}