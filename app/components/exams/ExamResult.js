import { motion } from "framer-motion";
import { FaTrophy, FaCheck, FaTimes } from "react-icons/fa";

export default function ExamResult({ result, onRetry, onBack }) {
  if (!result) {
    return (
      <div className="container mx-auto max-w-4xl p-4">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-[spin_1.5s_linear_infinite]" />
              <div className="w-16 h-16 rounded-full border-t-4 border-b-4 border-indigo-500 animate-[spin_2s_linear_infinite] absolute top-4 left-4" />
              <div className="w-8 h-8 rounded-full border-t-4 border-b-4 border-purple-500 animate-[spin_1s_linear_infinite] absolute top-8 left-8" />
            </div>
            <div className="mt-8 space-y-2 text-center">
              <h3 className="text-xl font-bold text-blue-700">لطفا صبر کنید</h3>
              <p className="text-indigo-600 animate-pulse">در حال محاسبه نتیجه آزمون...</p>
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

  const { score, totalQuestions, correctAnswers, wrongAnswers } = result;
  const percentage = Math.round(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <FaTrophy className="text-6xl text-yellow-500 mx-auto mb-4" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-gray-800 mb-2"
        >
          نتیجه آزمون شما
        </motion.h2>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="text-5xl font-bold text-blue-600 mb-4"
        >
          {percentage}%
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-green-50 p-4 rounded-lg text-center hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-center">
            <FaCheck className="text-green-500 ml-2" />
            <span className="text-green-700">پاسخ‌های درست</span>
          </div>
          <div className="text-2xl font-bold text-green-600 mt-2">
            {correctAnswers}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-red-50 p-4 rounded-lg text-center hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-center">
            <FaTimes className="text-red-500 ml-2" />
            <span className="text-red-700">پاسخ‌های نادرست</span>
          </div>
          <div className="text-2xl font-bold text-red-600 mt-2">
            {wrongAnswers}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex gap-4"
      >
        <button
          onClick={onRetry}
          className="flex-1 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          تلاش مجدد
        </button>
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          بازگشت به منو
        </button>
      </motion.div>
    </motion.div>
  );
}
