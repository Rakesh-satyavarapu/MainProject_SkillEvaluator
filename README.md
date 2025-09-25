# AI-Powered Adaptive Testing & Learning Platform

A comprehensive frontend application built with React, Tailwind CSS, Chart.js, and Framer Motion for an AI-powered adaptive testing and learning platform.

## 🚀 Features

### For Users
- **Adaptive Testing**: AI-powered quizzes that adapt to skill levels
- **Performance Analytics**: Detailed insights with Chart.js visualizations
- **AI Assistant**: Chatbot interface for learning support
- **Achievement System**: Badges and progress tracking
- **Quiz Management**: Take quizzes with real-time progress tracking
- **Results History**: View and analyze past quiz attempts

### For Admins
- **Dashboard Analytics**: Comprehensive platform statistics
- **Quiz Creation**: Dynamic quiz builder with multiple question types
- **Content Recommendations**: YouTube-based learning suggestions
- **Performance Monitoring**: Track student progress and engagement
- **System Management**: Platform health and user management

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Data visualization
- **Framer Motion** - Animation library
- **React Router v6** - Client-side routing
- **Zustand** - State management
- **Axios** - HTTP client

## 📁 Project Structure

```
src/
├── api/                 # API service layer
├── charts/             # Chart.js components
├── components/         # Reusable UI components
├── pages/             # Route-level components
├── router/            # React Router configuration
├── store/             # Zustand state management
├── App.jsx            # Main application component
└── index.js           # Application entry point
```

## 🎨 Pages & Components

### Pages
- **HomePage** - Landing page with hero section
- **LoginPage/RegisterPage** - Authentication forms
- **UserDashboard** - User's main dashboard with quizzes and analytics
- **QuizAttemptPage** - Interactive quiz interface with timer
- **ResultsPage** - Quiz results and performance history
- **PerformancePage** - Detailed analytics with charts
- **DoubtsPage** - AI chatbot interface
- **AdminDashboard** - Admin overview and statistics
- **CreateQuizPage** - Quiz creation form
- **AnalyticsPage** - Student performance analytics
- **RecommendationsPage** - YouTube content management

### Components
- **Navbar** - Responsive navigation with role-based menus
- **TestCard** - Quiz preview cards
- **Badge** - Achievement badges
- **QuizProgressBar** - Progress tracking with timer
- **ChatMessage** - Chatbot message components
- **PerformanceChart** - Chart.js visualizations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-adaptive-testing-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Authentication

The platform supports two user roles:

### Demo Credentials
- **User**: `john@example.com` / `password`
- **Admin**: `admin@example.com` / `password`

## 📊 Features Overview

### User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for engaging transitions
- **Real-time Progress**: Live quiz progress tracking
- **Performance Charts**: Interactive data visualizations
- **AI Chatbot**: Intelligent learning assistant

### Admin Features
- **Quiz Management**: Create and manage quizzes
- **Analytics Dashboard**: Monitor platform usage
- **Content Recommendations**: YouTube video suggestions
- **User Management**: Track user progress and engagement

## 🎯 Key Features

### Adaptive Testing
- Dynamic quiz difficulty based on performance
- Real-time progress tracking
- Timer functionality
- Question navigation

### Performance Analytics
- Weekly progress charts
- Skill breakdown analysis
- Achievement tracking
- Performance insights

### AI Assistant
- Contextual responses
- Learning recommendations
- Quick question buttons
- Real-time chat interface

### Admin Dashboard
- Platform statistics
- User engagement metrics
- System health monitoring
- Quick action buttons

## 🎨 Design System

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#64748B)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- Consistent border radius (8px, 12px, 16px)
- Shadow system (sm, md, lg)
- Spacing scale (4px, 8px, 12px, 16px, 24px, 32px)

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Customization

### Adding New Quizzes
1. Navigate to Admin Dashboard
2. Click "Create Quiz"
3. Fill in quiz details and questions
4. Save and publish

### Modifying Charts
1. Edit `src/charts/PerformanceChart.jsx`
2. Customize chart configurations
3. Update data structures as needed

### Styling Changes
1. Modify `tailwind.config.js` for theme changes
2. Update component classes for specific styling
3. Add custom CSS in `src/index.css`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔮 Future Enhancements

- **Backend Integration**: Connect to real API endpoints
- **Real-time Features**: WebSocket for live updates
- **Advanced Analytics**: More detailed performance metrics
- **Mobile App**: React Native version
- **AI Integration**: OpenAI API for enhanced chatbot
- **Video Integration**: YouTube API for content recommendations

---

Built with ❤️ using React, Tailwind CSS, and modern web technologies. 