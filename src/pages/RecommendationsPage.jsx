import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      skill: 'JavaScript',
      targetScore: '< 70%',
      videoTitle: 'JavaScript Fundamentals for Beginners',
      videoUrl: 'https://www.youtube.com/watch?v=example1',
      thumbnail: 'https://via.placeholder.com/120x68/3B82F6/FFFFFF?text=JS',
      duration: '15:30',
      views: '2.1M',
      description: 'Perfect for users struggling with JavaScript basics'
    },
    {
      id: 2,
      skill: 'React',
      targetScore: '< 75%',
      videoTitle: 'React Hooks Complete Guide',
      videoUrl: 'https://www.youtube.com/watch?v=example2',
      thumbnail: 'https://via.placeholder.com/120x68/61DAFB/FFFFFF?text=React',
      duration: '22:15',
      views: '1.8M',
      description: 'Comprehensive guide to React Hooks for intermediate learners'
    },
    {
      id: 3,
      skill: 'CSS',
      targetScore: '< 80%',
      videoTitle: 'CSS Grid Layout Masterclass',
      videoUrl: 'https://www.youtube.com/watch?v=example3',
      thumbnail: 'https://via.placeholder.com/120x68/1572B6/FFFFFF?text=CSS',
      duration: '18:45',
      views: '950K',
      description: 'Advanced CSS Grid techniques for better layouts'
    }
  ]);

  const [newRecommendation, setNewRecommendation] = useState({
    skill: '',
    targetScore: '',
    videoTitle: '',
    videoUrl: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecommendation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddRecommendation = (e) => {
    e.preventDefault();
    if (newRecommendation.skill && newRecommendation.videoTitle && newRecommendation.videoUrl) {
      const recommendation = {
        id: Date.now(),
        ...newRecommendation,
        thumbnail: `https://via.placeholder.com/120x68/3B82F6/FFFFFF?text=${newRecommendation.skill.slice(0, 2)}`,
        duration: '10:00',
        views: '100K'
      };
      setRecommendations(prev => [...prev, recommendation]);
      setNewRecommendation({
        skill: '',
        targetScore: '',
        videoTitle: '',
        videoUrl: '',
        description: ''
      });
    }
  };

  const handleDeleteRecommendation = (id) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id));
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Recommendations</h1>
                <p className="text-gray-600">
                  Manage YouTube-based content suggestions for users with low scores in specific skills.
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">💡</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add New Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Recommendation</h2>
            <form onSubmit={handleAddRecommendation} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skill/Topic
                  </label>
                  <input
                    type="text"
                    name="skill"
                    value={newRecommendation.skill}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., JavaScript, React, CSS"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Score Range
                  </label>
                  <input
                    type="text"
                    name="targetScore"
                    value={newRecommendation.targetScore}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., < 70%, 60-80%"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Title
                </label>
                <input
                  type="text"
                  name="videoTitle"
                  value={newRecommendation.videoTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter YouTube video title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  value={newRecommendation.videoUrl}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newRecommendation.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of why this video is recommended"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Recommendation
                </button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Current Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Recommendations</h2>
            <div className="space-y-4">
              {recommendations.map((recommendation, index) => (
                <motion.div
                  key={recommendation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={recommendation.thumbnail}
                      alt={recommendation.videoTitle}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {recommendation.videoTitle}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {recommendation.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>Skill: {recommendation.skill}</span>
                            <span>Target: {recommendation.targetScore}</span>
                            <span>Duration: {recommendation.duration}</span>
                            <span>Views: {recommendation.views}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteRecommendation(recommendation.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-3">
                        <a
                          href={recommendation.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                        >
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          Watch on YouTube
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📹</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{recommendations.length}</div>
                <div className="text-sm text-gray-500">Active Recommendations</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">1,247</div>
                <div className="text-sm text-gray-500">Users Helped</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">📈</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">+15%</div>
                <div className="text-sm text-gray-500">Avg Score Improvement</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendation Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-xs">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Target specific skill gaps</p>
                    <p className="text-xs text-gray-600">Focus on skills where users consistently score low</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-xs">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Choose high-quality content</p>
                    <p className="text-xs text-gray-600">Select videos with good ratings and clear explanations</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 text-xs">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Consider video length</p>
                    <p className="text-xs text-gray-600">Shorter videos (10-20 min) tend to have higher completion rates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600 text-xs">4</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Update regularly</p>
                    <p className="text-xs text-gray-600">Keep recommendations fresh and relevant to current trends</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecommendationsPage; 