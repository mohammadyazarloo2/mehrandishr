import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoArrowBack } from "react-icons/io5";

export default function ExamQuestions({ category, level, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(`/api/questions?category=${category}&level=${level}`);
        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category, level]);

  if (loading) {
    return <div className="p-6 text-center">در حال بارگذاری سوالات...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <IoArrowBack className="mr-2" />
          بازگشت
        </button>
        <span className="text-gray-600">
          سوال {currentQuestion + 1} از {questions.length}
        </span>
      </div>

      {questions[currentQuestion] && (
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-6">
            {questions[currentQuestion].text}
          </h3>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswers({
                  ...selectedAnswers,
                  [currentQuestion]: index
                })}
                className={`w-full p-4 rounded-lg text-right transition-colors
                  ${selectedAnswers[currentQuestion] === index 
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
              >
                {option.text}
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(curr => curr - 1)}
              className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700
                       hover:bg-gray-200 disabled:opacity-50"
            >
              سوال قبلی
            </button>
            <button
              onClick={() => {
                if (currentQuestion === questions.length - 1) {
                  // پایان آزمون
                } else {
                  setCurrentQuestion(curr => curr + 1);
                }
              }}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white
                       hover:bg-blue-700"
            >
              {currentQuestion === questions.length - 1 ? 'پایان آزمون' : 'سوال بعدی'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}