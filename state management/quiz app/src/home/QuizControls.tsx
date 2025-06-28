import { Button } from "@/components/ui/button";
import { completeQuiz, next, Previous } from "@/redux/feature/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function QuizControls() {
  const dispatch = useAppDispatch();

  // Get quiz state from Redux
  const { questions, currentQuestionIndex, userAnswer, quizComplete } =
    useAppSelector((state) => state.quiz);

  // Check if an answer is selected for the current question
  const isAnswerSelected = userAnswer[currentQuestionIndex] !== null;

  // Handle "Previous" button click
  const handlePrev = () => {
    dispatch(Previous());
  };

  // Handle "Next" button click — only if an answer is selected
  const handleNext = () => {
    if (isAnswerSelected) {
      dispatch(next());
    }
  };

  // Handle "Complete Quiz" button click
  const handleCompleteQuiz = () => {
    dispatch(completeQuiz());
  };

  // Enable "Complete Quiz" only if the current question is answered or not on the last one
  const isCompleteEnabled =
    isAnswerSelected || currentQuestionIndex !== questions.length - 1;

  return (
    <div className="flex justify-between mt-6">
      {/* Previous Button */}
      <Button
        onClick={handlePrev}
        disabled={currentQuestionIndex === 0 || quizComplete}
      >
        Previous
      </Button>

      {/* Next Button — shows only if not on last question and quiz isn't complete */}
      {currentQuestionIndex < questions.length - 1 && !quizComplete && (
        <Button onClick={handleNext} disabled={!isAnswerSelected}>
          Next
        </Button>
      )}

      {/* Complete Quiz Button — shows only on last question if quiz isn't complete */}
      {currentQuestionIndex === questions.length - 1 && !quizComplete && (
        <Button onClick={handleCompleteQuiz} disabled={!isCompleteEnabled}>
          Complete Quiz
        </Button>
      )}
    </div>
  );
}
