import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { userAPI, quizAPI } from '../api';
import { LineChart, BarChart, DoughnutChart } from '../charts/PerformanceChart';
import TestCard from '../components/TestCard';

const PerformancePage = () => {
  const [performanceData, setPerformanceData] = useState(null);
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [performanceResponse, quizzesResponse] = await Promise.all([
          userAPI.getPerformance(),
          quizAPI.getQuizzes()
        ]);

        setPerformanceData(performanceResponse.data);
        setAvailableQuizzes(quizzesResponse.data);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Performance Analytics</h1>
                <p className="text-gray-600">
                  Track your learning progress and identify areas for improvement.
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedTimeframe('week')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedTimeframe === 'week'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setSelectedTimeframe('month')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedTimeframe === 'month'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setSelectedTimeframe('year')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    selectedTimeframe === 'year'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Year
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Charts Section */}
        {performanceData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h3>
              <LineChart data={performanceData.weeklyProgress} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Breakdown</h3>
              <BarChart data={performanceData.skillBreakdown} />
            </motion.div>
          </div>
        )}

        {/* Doughnut Chart */}
        {performanceData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Distribution</h3>
              <div className="max-w-md mx-auto">
                <DoughnutChart data={performanceData.skillBreakdown} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Available Quizzes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Quizzes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableQuizzes.map((quiz) => (
                <TestCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Performance Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">85%</div>
                <div className="text-sm text-gray-600">Average Score</div>
                <div className="text-xs text-gray-500 mt-1">+5% from last week</div>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">12</div>
                <div className="text-sm text-gray-600">Quizzes Completed</div>
                <div className="text-xs text-gray-500 mt-1">This month</div>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">3</div>
                <div className="text-sm text-gray-600">Skills Mastered</div>
                <div className="text-xs text-gray-500 mt-1">JavaScript, React, CSS</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">💡</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Focus on Node.js</h4>
                  <p className="text-sm text-gray-600">
                    Your Node.js score is 72%. Try the advanced Node.js quiz to improve your understanding.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🎯</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Great Progress!</h4>
                  <p className="text-sm text-gray-600">
                    You've improved your JavaScript skills by 15% this week. Keep up the good work!
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">📚</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Practice Data Structures</h4>
                  <p className="text-sm text-gray-600">
                    Consider taking the Data Structures quiz to strengthen your algorithmic thinking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PerformancePage;
