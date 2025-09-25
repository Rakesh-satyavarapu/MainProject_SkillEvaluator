import axios from 'axios';

// Mock data for development
const mockData = {
  quizzes: [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of JavaScript basics",
      difficulty: "Beginner",
      duration: 15,
      questions: 10,
      tags: ["JavaScript", "Programming", "Basics"],
      questions: [
        {
          id: 1,
          question: "What is the correct way to declare a variable in JavaScript?",
          options: [
            "var x = 5;",
            "variable x = 5;",
            "v x = 5;",
            "declare x = 5;"
          ],
          correctAnswer: 0
        },
        {
          id: 2,
          question: "Which method is used to add an element to the end of an array?",
          options: [
            "push()",
            "pop()",
            "shift()",
            "unshift()"
          ],
          correctAnswer: 0
        },
        {
          id: 3,
          question: "What is the output of console.log(typeof null)?",
          options: [
            "null",
            "undefined",
            "object",
            "number"
          ],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 2,
      title: "React Hooks",
      description: "Advanced React concepts and hooks",
      difficulty: "Intermediate",
      duration: 20,
      questions: 12,
      tags: ["React", "Hooks", "Frontend"],
      questions: [
        {
          id: 1,
          question: "Which hook is used for side effects in functional components?",
          options: [
            "useState",
            "useEffect",
            "useContext",
            "useReducer"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          question: "What does the useState hook return?",
          options: [
            "Only the state value",
            "Only the setter function",
            "An array with state value and setter function",
            "Nothing"
          ],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 3,
      title: "Data Structures",
      description: "Understanding basic data structures",
      difficulty: "Advanced",
      duration: 25,
      questions: 15,
      tags: ["Data Structures", "Algorithms", "Computer Science"],
      questions: [
        {
          id: 1,
          question: "Which data structure follows LIFO principle?",
          options: [
            "Queue",
            "Stack",
            "Tree",
            "Graph"
          ],
          correctAnswer: 1
        }
      ]
    }
  ],
  
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      badge: "Intermediate",
      points: 1250,
      completedQuizzes: 8
    },
    {
      id: 2,
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      badge: "Admin",
      points: 0,
      completedQuizzes: 0
    }
  ],
  
  performanceData: {
    weeklyProgress: [
      { week: "Week 1", score: 75 },
      { week: "Week 2", score: 82 },
      { week: "Week 3", score: 78 },
      { week: "Week 4", score: 89 },
      { week: "Week 5", score: 91 },
      { week: "Week 6", score: 85 }
    ],
    skillBreakdown: [
      { skill: "JavaScript", score: 85 },
      { skill: "React", score: 78 },
      { skill: "CSS", score: 92 },
      { skill: "HTML", score: 88 },
      { skill: "Node.js", score: 72 }
    ]
  }
};

// Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock API functions
export const authAPI = {
  login: async (credentials) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = mockData.users.find(u => 
      u.email === credentials.email && credentials.password === 'password'
    );
    
    if (user) {
      return { data: { user, token: 'mock-jwt-token' } };
    } else {
      throw new Error('Invalid credentials');
    }
  },
  
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      id: mockData.users.length + 1,
      ...userData,
      role: 'user',
      badge: 'Beginner',
      points: 0,
      completedQuizzes: 0
    };
    
    mockData.users.push(newUser);
    return { data: { user: newUser, token: 'mock-jwt-token' } };
  }
};

export const quizAPI = {
  getQuizzes: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: mockData.quizzes };
  },
  
  getQuiz: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const quiz = mockData.quizzes.find(q => q.id === parseInt(id));
    if (!quiz) throw new Error('Quiz not found');
    return { data: quiz };
  },
  
  submitQuiz: async (quizId, answers) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const quiz = mockData.quizzes.find(q => q.id === parseInt(quizId));
    if (!quiz) throw new Error('Quiz not found');
    
    let correctAnswers = 0;
    const totalQuestions = quiz.questions.length;
    
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    return {
      data: {
        quizId,
        score,
        correctAnswers,
        totalQuestions,
        timeTaken: Math.floor(Math.random() * 300) + 60, // Random time between 1-6 minutes
        completedAt: new Date().toISOString()
      }
    };
  }
};

export const userAPI = {
  getProfile: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: mockData.users[0] };
  },
  
  getPerformance: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: mockData.performanceData };
  },
  
  updateProfile: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { data: { ...mockData.users[0], ...userData } };
  }
};

export const adminAPI = {
  getDashboardStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      data: {
        totalUsers: 1250,
        totalQuizzes: 45,
        activeUsers: 89,
        totalAttempts: 3420
      }
    };
  },
  
  getAnalytics: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      data: {
        topPerformers: [
          { name: "Alice Johnson", score: 95, quizzes: 12 },
          { name: "Bob Smith", score: 92, quizzes: 10 },
          { name: "Carol Davis", score: 89, quizzes: 8 }
        ],
        skillSuccessRates: [
          { skill: "JavaScript", successRate: 78 },
          { skill: "React", successRate: 72 },
          { skill: "CSS", successRate: 85 },
          { skill: "HTML", successRate: 91 }
        ]
      }
    };
  },
  
  createQuiz: async (quizData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newQuiz = {
      id: mockData.quizzes.length + 1,
      ...quizData,
      createdAt: new Date().toISOString()
    };
    mockData.quizzes.push(newQuiz);
    return { data: newQuiz };
  }
};

export default api; 