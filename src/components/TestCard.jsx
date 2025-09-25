import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TestCard = ({ quiz }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {quiz.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              {quiz.description}
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
            {quiz.difficulty}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <span>⏱️</span>
              <span>{quiz.duration} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📝</span>
              <span>{Array.isArray(quiz.questions) ? quiz.questions.length : quiz.questions} questions</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {quiz.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          to={`/quiz/${quiz.id}`}
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Start Quiz
        </Link>
      </div>
    </motion.div>
  );
};

export default TestCard; 