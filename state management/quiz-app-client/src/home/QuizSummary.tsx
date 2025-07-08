import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAppSelector } from "@/redux/hooks";

// Helper function to get performance rating and progress bar color based on score percentage
const getPerformance = (percentage: number) => {
  if (percentage >= 90) {
    return { rating: "Excellent", color: "bg-green-800" };
  } else if (percentage >= 50) {
    return { rating: "Good", color: "bg-yellow-500" };
  } else if (percentage >= 30) {
    return { rating: "Needs Improvement", color: "bg-orange-500" };
  } else {
    return { rating: "Poor", color: "bg-red-500" };
  }
};

export default function QuizSummary() {
  // Accessing quiz data from Redux store
  const { questions, userAnswer } = useAppSelector((state) => state.quiz);

  // Count correct answers
  const correctAnswerCount = questions.reduce((count, question, indx) => {
    return question.correctAnswer === userAnswer[indx] ? count + 1 : count;
  }, 0);

  // Count incorrect answers
  const wrongAnswerCount = questions.length - correctAnswerCount;

  // Calculate correct answer percentage
  const CorrectAnswerPercentage = (correctAnswerCount / questions.length) * 100;

  // Get performance rating and color for progress bar
  const { rating, color } = getPerformance(CorrectAnswerPercentage);

  return (
    <div className="flex justify-center items-center mt-10 px-4">
      {/* Main Card Container */}
      <Card className="w-full max-w-lg shadow-xl rounded-2xl p-6 bg-white">
        <CardHeader>
          {/* Quiz Summary Title */}
          <CardTitle className="text-2xl font-bold text-center text-indigo-700">
            🎉 Quiz Summary
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Correct Answer Info */}
          <div className="text-center text-lg font-medium text-gray-800">
            You got{" "}
            <span className="text-green-600 font-semibold">
              {correctAnswerCount}
            </span>{" "}
            out of{" "}
            <span className="text-indigo-600 font-semibold">
              {questions.length}
            </span>{" "}
            questions correct!
          </div>

          {/* Progress bar and percentage */}
          <div className="space-y-2">
            <Progress
              value={CorrectAnswerPercentage}
              className={`h-4 rounded-full ${color}`}
            />
            <div className="flex justify-between text-sm font-medium text-gray-700">
              <span>{CorrectAnswerPercentage.toFixed(1)}%</span>
              <span>Performance: {rating}</span>
            </div>
          </div>

          {/* Correct vs Wrong Summary */}
          <div className="flex justify-between text-sm text-gray-600">
            <p>
              ✅ Correct:{" "}
              <span className="font-semibold text-green-700">
                {correctAnswerCount}
              </span>
            </p>
            <p>
              ❌ Wrong:{" "}
              <span className="font-semibold text-red-600">
                {wrongAnswerCount}
              </span>
            </p>
          </div>

          {/* Final Message */}
          <div className="text-center mt-4 text-md font-semibold text-indigo-600">
            Great job! Keep practicing 💪
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
