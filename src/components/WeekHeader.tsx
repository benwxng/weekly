import React from 'react';
import { format, startOfWeek } from 'date-fns';

export default function WeekHeader() {
  const weekStart = startOfWeek(new Date());
  const weekString = format(weekStart, "'Week of' MM/dd/yy");
  
  return (
    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
      {weekString}
    </h2>
  );
}