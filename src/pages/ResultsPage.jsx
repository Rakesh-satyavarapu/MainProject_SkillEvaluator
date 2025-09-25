import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useQuizStore from '../store/quizStore';
import useAuthStore from '../store/authStore';
import Badge from '../components/Badge';

const ResultsPage = () => {
  const { quizResults } = useQuizStore();
  const { user } = useAuthStore();
  const [filteredResults, setFilteredResults] = useState([]);
  const [filter, setFilter] = useState('all'); // all, recent, high-score

  useEffect(() => {
    let filtered = [...quizResults];
    
    switch (filter) {
      case 'recent':
        filtered = filtered.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
        break;
      case 'high-score':
        filtered = filtered.sort((a, b) => b.score - a.score);
        break;
      default:
        filtered = filtered.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
    }
    
    setFilteredResults(filtered);
  }, [quizResults, filter]);

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score) => {
    if (score >= 90) return { text: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 80) return { text: 'Good', color: 'bg-blue-100 text-blue-800' };
    if (score >= 70) return { text: 'Average', color: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Needs Improvement', color: 'bg-red-100 text-red-800' };
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Results</h1>
                <p className="text-gray-600">
                  Track your progress and see how you're performing across all quizzes.
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  {quizResults.length}
                </div>
                <div className="text-sm text-gray-500">Total Attempts</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Summary */}
        {quizResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round(quizResults.reduce((acc, result) => acc + result.score, 0) / quizResults.length)}%
                    </div>
                    <div className="text-sm text-gray-500">Average Score</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.max(...quizResults.map(r => r.score))}%
                    </div>
                    <div className="text-sm text-gray-500">Best Score</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">⏱️</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatTime(Math.round(quizResults.reduce((acc, result) => acc + result.timeTaken, 0) / quizResults.length))}
                    </div>
                    <div className="text-sm text-gray-500">Avg Time</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {quizResults.filter(r => r.score >= 80).length}
                    </div>
                    <div className="text-sm text-gray-500">High Scores</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Quiz Attempts</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    filter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('recent')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    filter === 'recent'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Recent
                </button>
                <button
                  onClick={() => setFilter('high-score')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    filter === 'high-score'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  High Scores
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results List */}
        {filteredResults.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {filteredResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Quiz #{result.quizId}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBadge(result.score).color}`}>
                        {getScoreBadge(result.score).text}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Score:</span>
                        <span className={`ml-1 font-bold ${getScoreColor(result.score)}`}>
                          {result.score}%
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Correct:</span>
                        <span className="ml-1">{result.correctAnswers}/{result.totalQuestions}</span>
                      </div>
                      <div>
                        <span className="font-medium">Time:</span>
                        <span className="ml-1">{formatTime(result.timeTaken)}</span>
                      </div>
                      <div>
                        <span className="font-medium">Completed:</span>
                        <span className="ml-1">{formatDate(result.completedAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Link
                      to={`/quiz/${result.quizId}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Retake
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Yet</h3>
              <p className="text-gray-600 mb-6">
                Start taking quizzes to see your results and track your progress.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Take Your First Quiz
              </Link>
            </div>
          </motion.div>
        )}

        {/* User Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Current Badge</h3>
            <div className="flex items-center space-x-4">
              <Badge level={user?.badge} size="lg" />
              <div>
                <p className="text-gray-600">
                  Keep taking quizzes to earn higher badges and unlock new achievements!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage; 