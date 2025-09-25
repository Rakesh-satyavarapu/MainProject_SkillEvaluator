import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import UserDashboard from '../pages/UserDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import QuizAttemptPage from '../pages/QuizAttemptPage';
import ResultsPage from '../pages/ResultsPage';
import PerformancePage from '../pages/PerformancePage';
import DoubtsPage from '../pages/DoubtsPage';
import CreateQuizPage from '../pages/CreateQuizPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import RecommendationsPage from '../pages/RecommendationsPage';

// Components
import ProtectedRoute from '../components/ProtectedRoute';
import AdminRoute from '../components/AdminRoute';
import Layout from '../components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        )
      },
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        )
      },
      {
        path: 'quiz/:id',
        element: (
          <ProtectedRoute>
            <QuizAttemptPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'results',
        element: (
          <ProtectedRoute>
            <ResultsPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'performance',
        element: (
          <ProtectedRoute>
            <PerformancePage />
          </ProtectedRoute>
        )
      },
      {
        path: 'doubts',
        element: (
          <ProtectedRoute>
            <DoubtsPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'admin/create-quiz',
        element: (
          <AdminRoute>
            <CreateQuizPage />
          </AdminRoute>
        )
      },
      {
        path: 'admin/analytics',
        element: (
          <AdminRoute>
            <AnalyticsPage />
          </AdminRoute>
        )
      },
      {
        path: 'admin/recommendations',
        element: (
          <AdminRoute>
            <RecommendationsPage />
          </AdminRoute>
        )
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
]);

export default router; 