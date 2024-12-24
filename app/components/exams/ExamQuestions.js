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

      if (!response.ok) {
        throw new Error('Failed to submit exam');
      }

      const result = await response.json();
      
      // Set exam result with all required fields
      setExamResult({
        score: result.score || 0,
        totalQuestions: result.totalQuestions || questions.length,
        correctAnswers: result.correctAnswers || 0,
        wrongAnswers: result.wrongAnswers || 0
      });

      setShowResult(true);

    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  if (loading) {
    return <div className="loading-spinner" />;
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (showResult) {
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
