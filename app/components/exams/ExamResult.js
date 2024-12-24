import { motion } from "framer-motion";
import { FaTrophy, FaCheck, FaTimes } from "react-icons/fa";

export default function ExamResult({ result, onRetry, onBack }) {
  if (!result) return null;

  const { score, totalQuestions, correctAnswers, wrongAnswers } = result;
  const percentage = Math.round(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <FaTrophy className="text-6xl text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          نتیجه آزمون شما
        </h2>
        <div className="text-5xl font-bold text-blue-600 mb-4">
          {percentage}%
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center">
            <FaCheck className="text-green-500 ml-2" />
            <span className="text-green-700">پاسخ‌های درست</span>
          </div>
          <div className="text-2xl font-bold text-green-600 mt-2">
            {correctAnswers}
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg text-center">
          <div className="flex items-center justify-center">
            <FaTimes className="text-red-500 ml-2" />
            <span className="text-red-700">پاسخ‌های نادرست</span>
          </div>
          <div className="text-2xl font-bold text-red-600 mt-2">
            {wrongAnswers}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onRetry}
          className="flex-1 py-3 rounded-lg bg-blue-500 text-white"
        >
          تلاش مجدد
        </button>
        {/* <button
          onClick={() => setActiveTab("history")}
          className="flex-1 py-3 rounded-lg bg-green-500 text-white"
        >
          مشاهده تاریخچه
        </button> */}
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-lg bg-gray-100 text-gray-700"
        >
          بازگشت به منو
        </button>
      </div>
    </motion.div>
  );
}
