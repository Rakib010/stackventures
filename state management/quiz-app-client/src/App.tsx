import AddQuiz from "./home/AddQuiz";
import AllQuiz from "./home/AllQuiz";
import Question from "./home/Question";
import QuizSummary from "./home/QuizSummary";
import { useAppSelector } from "./redux/hooks";

const App = () => {
  const { quizComplete } = useAppSelector((state) => state.quiz);
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex flex-col items-center justify-start px-4 py-8">
      <h1 className="text-4xl font-bold text-indigo-700 mb-8 text-center">
        🧠 Quiz App
      </h1>

      {/*Add Quiz */}
      <AddQuiz />

      {/* All Quiz */}
      <AllQuiz />

      <div>
        {!quizComplete ? <Question /> : <QuizSummary />}
      </div>
    </div>
  );
};

export default App;
