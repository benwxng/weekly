import React from 'react';

interface UpdateCardProps {
  author: string;
  avatar: string;
  title: string;
  content: string;
  date: string;
}

export default function UpdateCard({ author, avatar, title, content, date }: UpdateCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <img src={avatar} alt={author} className="w-10 h-10 rounded-full" />
        <div>
          <h3 className="font-medium text-gray-900">{author}</h3>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
}