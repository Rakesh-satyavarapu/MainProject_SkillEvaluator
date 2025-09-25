import React from 'react';
import { motion } from 'framer-motion';

const QuizProgressBar = ({ currentQuestion, totalQuestions, timeLeft, totalTime }) => {
  const progress = (currentQuestion / totalQuestions) * 100;
  const timeProgress = ((totalTime - timeLeft) / totalTime) * 100;

  const getTimeColor = () => {
    const timePercentage = (timeLeft / totalTime) * 100;
    if (timePercentage > 60) return 'bg-green-500';
    if (timePercentage > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full space-y-4">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Time Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            Time Remaining
          </span>
          <span className="text-sm text-gray-500">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full ${getTimeColor()}`}
            initial={{ width: 100 }}
            animate={{ width: `${100 - timeProgress}%` }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizProgressBar; 