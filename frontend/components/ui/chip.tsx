import React from 'react';

interface ChipProps {
  label: string;
  color: 'green' | 'red' | 'yellow';
}

const Chip: React.FC<ChipProps> = ({ label, color }) => {
  let bgColor = 'bg-gray-400';
  let textColor = 'text-gray-800';

  switch (color) {
    case 'green':
      bgColor = 'bg-green-500';
      textColor = 'text-white';
      break;
    case 'red':
      bgColor = 'bg-red-500';
      textColor = 'text-white';
      break;
    case 'yellow':
      bgColor = 'bg-yellow-500';
      textColor = 'text-gray-800';
      break;
  }

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${bgColor} ${textColor}`}
    >
      {label}
    </span>
  );
};

export default Chip;
