import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";
import ExamTimer from "./ExamTimer";
import ExamResult from "./ExamResult";

export default function ExamQuestions({ category, level, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [examResult, setExamResult] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/questions?category=${category}&level=${level}`);
        const data = await res.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [category, level]);

  const handleAnswer = (questionId, selectedOption) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/questions/submitexam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          category,
          level, 
          answers 
        })
      });
  
      const result = await response.json();
      setExamResult({
        ...result,
        category
      });
      setShowResult(true);
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-4xl p-4">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center text-blue-500 hover:text-blue-700"
            >
              <IoArrowBack className="mr-2" />
              بازگشت
            </button>
          </div>
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-[spin_1.5s_linear_infinite]" />
              <div className="w-16 h-16 rounded-full border-t-4 border-b-4 border-indigo-500 animate-[spin_2s_linear_infinite] absolute top-4 left-4" />
              <div className="w-8 h-8 rounded-full border-t-4 border-b-4 border-purple-500 animate-[spin_1s_linear_infinite] absolute top-8 left-8" />
            </div>
            <div className="mt-8 space-y-2 text-center">
              <h3 className="text-xl font-bold text-blue-700">لطفا صبر کنید</h3>
              <p className="text-indigo-600 animate-pulse">در حال آماده‌سازی سوالات آزمون...</p>
            </div>
            <div className="mt-4 flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce delay-100" />
              <div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce delay-200" />
              <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce delay-300" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResult && examResult) {
    return (
      <ExamResult
        result={examResult}
        onRetry={() => {
          setShowResult(false);
          setCurrentQuestion(0);
          setAnswers({});
        }}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-blue-500 hover:text-blue-700"
          >
            <IoArrowBack className="mr-2" />
            بازگشت
          </button>
          <ExamTimer duration={30} onTimeEnd={handleSubmit} />
        </div>

        {questions.length > 0 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                سوال {currentQuestion + 1} از {questions.length}
              </h2>
              <div className="text-gray-600">سطح: {level}</div>
            </div>

            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <p className="text-lg">{questions[currentQuestion].question}</p>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(questions[currentQuestion]._id, option)}
                    className={`w-full p-4 text-right rounded-lg border ${
                      answers[questions[currentQuestion]._id] === option
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50"
              >
                سوال قبلی
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                  پایان آزمون
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                  className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                >
                  سوال بعدی
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
