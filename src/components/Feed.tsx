import React from 'react';
import UpdateCard from './UpdateCard';

const SAMPLE_UPDATES = [
  {
    author: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150',
    title: 'Started a New Project!',
    content: 'This week has been incredibly productive. Launched the new marketing campaign and the initial results are promising. Looking forward to sharing more updates soon!',
    date: 'March 10, 2024'
  },
  {
    author: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150',
    title: 'Family Vacation Plans',
    content: 'Finally booked our summer vacation! Two weeks in Italy - Rome, Florence, and Venice. The kids are super excited about all the pizza and gelato.',
    date: 'March 9, 2024'
  }
];

export default function Feed() {
  return (
    <div className="flex-1 max-w-2xl mx-auto py-8 px-4 space-y-6">
      {SAMPLE_UPDATES.map((update, index) => (
        <UpdateCard key={index} {...update} />
      ))}
    </div>
  );
}