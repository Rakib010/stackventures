import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddQuizMutation } from "@/redux/api/quizApi";
import { toast } from "sonner";

// Types
type QuestionType = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizData = {
  title: string;
  description: string;
  questions: QuestionType[];
};

export default function AddQuiz() {
  // rtk
  const [addQuiz, { isLoading, isError, isSuccess }] = useAddQuizMutation();

  const [step, setStep] = useState(1);
  const [addQuestionStep, setAddQuestionStep] = useState(1);

  const [quizData, setQuizData] = useState<QuizData>({
    title: "",
    description: "",
    questions: [],
  });

  const [newQuestion, setNewQuestion] = useState<QuestionType>({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false);

  // Input handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    optionIndex?: number
  ) => {
    const { value } = e.target;
    if (field === "title" || field === "description") {
      setQuizData((prev) => ({ ...prev, [field]: value }));
    } else if (field === "question") {
      setNewQuestion((prev) => ({ ...prev, question: value }));
    } else if (field === "option" && optionIndex !== undefined) {
      const updatedOptions = [...newQuestion.options];
      updatedOptions[optionIndex] = value;
      setNewQuestion((prev) => ({ ...prev, options: updatedOptions }));
    }
  };

  // Answer select
  const handleCorrectAnswerSelect = (answer: string) => {
    setNewQuestion((prev) => ({ ...prev, correctAnswer: answer }));
  };

  // Add question to quiz
  const addQuestion = () => {
    if (
      newQuestion.question &&
      newQuestion.options.every((opt) => opt.trim() !== "") &&
      newQuestion.correctAnswer
    ) {
      setQuizData((prev) => ({
        ...prev,
        questions: [...prev.questions, newQuestion],
      }));
      setNewQuestion({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
      setOpenAddQuestionModal(false);
      setAddQuestionStep(1);
    } else {
      alert("Fill all fields before adding a question.");
    }
  };

  // Remove a question
  const removeQuestion = (index: number) => {
    const updatedQuestions = quizData.questions.filter((_, i) => i !== index);
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // handle submit
  const handleSubmit = async () => {
    await addQuiz(quizData);
    //console.log("Final Quiz Submitted:", quizData);
    toast("Quiz Added Successfully!");
  };

  return (
    <div className="my-6">
      {/* Main Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Add Quiz</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Quiz</DialogTitle>
            <DialogDescription>
              {step === 1 && "Step 1: Enter Quiz Details"}
              {step === 2 && "Step 2: Add Questions"}
              {step === 3 && "Step 3: Submit"}
            </DialogDescription>
          </DialogHeader>

          {/* Step 1: Title & Description */}
          {step === 1 && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="title" className="text-right">
                  Title
                </label>
                <Input
                  id="title"
                  value={quizData.title}
                  onChange={(e) => handleInputChange(e, "title")}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right">
                  Description
                </label>
                <Input
                  id="description"
                  value={quizData.description}
                  onChange={(e) => handleInputChange(e, "description")}
                  className="col-span-3"
                />
              </div>
            </div>
          )}

          {/* Step 2: Add Questions */}
          {step === 2 && (
            <div className="grid gap-4 py-4">
              {quizData.questions.map((q, index) => (
                <div key={index} className="border p-4 rounded-lg relative">
                  <p className="mb-1 font-semibold">
                    Q{index + 1}: {q.question}
                  </p>
                  <ul className="text-sm pl-4 list-disc">
                    {q.options.map((opt, i) => (
                      <li key={i}>
                        {opt}{" "}
                        {opt === q.correctAnswer && (
                          <span className="text-green-600 font-bold">✔</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => removeQuestion(index)}
                    variant="outline"
                    className="absolute top-2 right-2"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                onClick={() => setOpenAddQuestionModal(true)}
                className="mt-4 w-full"
              >
                Add Another Question
              </Button>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <div className="py-4">
              <p className="font-medium">Review and Submit</p>
              <pre className="bg-gray-100 p-2 mt-2 rounded text-xs overflow-auto">
                {JSON.stringify(quizData, null, 2)}
              </pre>
            </div>
          )}

          {/* Navigation Buttons */}
          <DialogFooter>
            {step > 1 && (
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            {step < 3 && <Button onClick={nextStep}>Next</Button>}
            {step === 3 && (
              <Button
                onClick={handleSubmit}
                className="bg-green-600 text-white"
              >
                Submit Quiz
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Question Dialog */}
      <Dialog
        open={openAddQuestionModal}
        onOpenChange={setOpenAddQuestionModal}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Question</DialogTitle>
            <DialogDescription>
              Step {addQuestionStep}:{" "}
              {addQuestionStep === 1
                ? "Enter the question"
                : addQuestionStep === 2
                ? "Enter 4 options"
                : "Select the correct answer"}
            </DialogDescription>
          </DialogHeader>

          {/* Step 1: Question */}
          {addQuestionStep === 1 && (
            <Input
              placeholder="Enter question"
              value={newQuestion.question}
              onChange={(e) => handleInputChange(e, "question")}
            />
          )}

          {/* Step 2: Options */}
          {addQuestionStep === 2 &&
            newQuestion.options.map((option, i) => (
              <Input
                key={i}
                placeholder={`Option ${i + 1}`}
                value={option}
                onChange={(e) => handleInputChange(e, "option", i)}
                className="mt-2"
              />
            ))}

          {/* Step 3: Correct Answer */}
          {addQuestionStep === 3 && (
            <div>
              <label className="font-medium">Correct Answer</label>
              <select
                value={newQuestion.correctAnswer}
                onChange={(e) => handleCorrectAnswerSelect(e.target.value)}
                className="w-full p-2 mt-2 border rounded-md"
              >
                <option value="" disabled>
                  Select one
                </option>
                {newQuestion.options.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Add Question Navigation */}
          <DialogFooter>
            {addQuestionStep > 1 && (
              <Button onClick={() => setAddQuestionStep((s) => s - 1)}>
                Back
              </Button>
            )}
            {addQuestionStep < 3 ? (
              <Button onClick={() => setAddQuestionStep((s) => s + 1)}>
                Next
              </Button>
            ) : (
              <Button onClick={addQuestion}>Add Question</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
