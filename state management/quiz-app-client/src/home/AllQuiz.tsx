import { Card } from "@/components/ui/card";
import { useGetQuizQuery } from "@/redux/api/quizApi";
import { setQuiz } from "@/redux/feature/quizSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function AllQuiz() {
  const dispatch = useAppDispatch();
  const { data: allQuiz, isLoading, error } = useGetQuizQuery(undefined);

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  if (error) {
    return <div>Error loading quizzes.</div>;
  }

  const handleSetQuiz = (data) => {
    dispatch(setQuiz(data.questions));
  };

  return (
    <div className="grid grid-cols-4 space-y-4">
      {allQuiz?.map((quiz: any, index: number) => (
        <Card key={index} onClick={() => handleSetQuiz(quiz)}>
          <h2 className="font-bold text-lg">{quiz.title}</h2>
          <p className="text-sm text-gray-600">{quiz.description}</p>
        </Card>
      ))}
    </div>
  );
}
