import { create } from 'zustand';

const useQuizStore = create((set, get) => ({
  currentQuiz: null,
  currentQuestionIndex: 0,
  answers: [],
  quizResults: [],
  availableQuizzes: [],
  
  setCurrentQuiz: (quiz) => set({ currentQuiz: quiz, currentQuestionIndex: 0, answers: [] }),
  
  setAnswer: (questionIndex, answer) => set((state) => ({
    answers: {
      ...state.answers,
      [questionIndex]: answer
    }
  })),
  
  nextQuestion: () => set((state) => ({
    currentQuestionIndex: state.currentQuestionIndex + 1
  })),
  
  previousQuestion: () => set((state) => ({
    currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1)
  })),
  
  submitQuiz: (results) => set((state) => ({
    quizResults: [...state.quizResults, results],
    currentQuiz: null,
    currentQuestionIndex: 0,
    answers: []
  })),
  
  setAvailableQuizzes: (quizzes) => set({ availableQuizzes: quizzes }),
  
  resetQuiz: () => set({
    currentQuiz: null,
    currentQuestionIndex: 0,
    answers: []
  })
}));

export default useQuizStore; 