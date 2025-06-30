import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import QuizControls from "./QuizControls";
import { setAnswer } from "@/redux/feature/quizSlice";

export default function Question() {
  const dispatch = useAppDispatch();

  // Extract necessary state from Redux store
  const { questions, currentQuestionIndex, userAnswer } = useAppSelector(
    (state) => state.quiz
  );

  // Get current question and selected answer
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = userAnswer[currentQuestionIndex];

  // Dispatch selected answer to Redux store
  const handleAnswerChange = (ans: string) => {
    dispatch(
      setAnswer({
        questionIndex: currentQuestionIndex,
        answer: ans,
      })
    );
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      {questions.length > 0 && (
        // Quiz card container
        <Card className="w-full max-w-lg shadow-lg">
          <CardHeader>
            {/* Display the current question */}
            <h3 className="text-xl font-semibold text-gray-800">
              {currentQuestion?.question}
            </h3>
          </CardHeader>

          <CardContent>
            {/* List of answer options */}
            <div className="space-y-3">
              {currentQuestion?.options?.map((option, index) => (
                <Button
                  // Highlight selected option
                  variant={option === currentAnswer ? "default" : "outline"}
                  onClick={() => handleAnswerChange(option)}
                  className="w-full"
                  size="lg"
                  key={index}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Next/Previous controls */}
            <QuizControls />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
