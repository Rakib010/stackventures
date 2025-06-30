import { quizData } from "@/home/quizData";
import { createSlice } from "@reduxjs/toolkit";

interface QuizState {
  questions: typeof quizData;
  currentQuestionIndex: number;
  userAnswer: (string | null)[];
  quizComplete: boolean;
}
const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  userAnswer: Array(quizData.length).fill(null),
  quizComplete: false,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      const { questionIndex, answer } = action.payload;
      state.userAnswer[questionIndex] = answer;
    },
    next: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1)
        state.currentQuestionIndex += 1;
    },
    Previous: (state) => {
      if (state.currentQuestionIndex > 0) state.currentQuestionIndex -= 1;
    },
    completeQuiz: (state) => {
      state.quizComplete = true;
    },
    setQuiz: (state, action) => {
      state.questions = action.payload;
    },
  },
});

export const { next, Previous, setAnswer, completeQuiz, setQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
