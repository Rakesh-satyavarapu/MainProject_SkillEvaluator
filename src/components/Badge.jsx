import React from 'react';

const Badge = ({ level, size = 'md' }) => {
  const getBadgeConfig = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return {
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: '🌱',
          gradient: 'from-green-400 to-green-600'
        };
      case 'intermediate':
        return {
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: '⭐',
          gradient: 'from-blue-400 to-blue-600'
        };
      case 'advanced':
        return {
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: '🏆',
          gradient: 'from-purple-400 to-purple-600'
        };
      case 'expert':
        return {
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: '👑',
          gradient: 'from-yellow-400 to-yellow-600'
        };
      case 'admin':
        return {
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: '⚡',
          gradient: 'from-red-400 to-red-600'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: '🎯',
          gradient: 'from-gray-400 to-gray-600'
        };
    }
  };

  const config = getBadgeConfig(level);
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border font-medium ${config.color} ${sizeClasses[size]}`}>
      <span className="text-sm">{config.icon}</span>
      <span className="font-semibold">{level}</span>
    </div>
  );
};

export default Badge; 