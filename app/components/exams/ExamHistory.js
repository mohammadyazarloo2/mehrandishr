import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaCalendar } from 'react-icons/fa';

export default function ExamHistory() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/questions/examresult');
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">تاریخچه آزمون‌ها</h2>
      
      <div className="grid gap-4">
        {results.map((result) => (
          <motion.div
            key={result._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">{result.category?.name}</h3>
                <p className="text-gray-600">سطح: {result.level}</p>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {result.score}%
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-gray-600">کل سوالات</div>
                <div className="font-bold">{result.totalQuestions}</div>
              </div>
              <div className="text-center text-green-600">
                <div>پاسخ‌های درست</div>
                <div className="font-bold">{result.correctAnswers}</div>
              </div>
              <div className="text-center text-red-600">
                <div>پاسخ‌های نادرست</div>
                <div className="font-bold">{result.wrongAnswers}</div>
              </div>
            </div>

            <div className="flex items-center text-gray-500 text-sm">
              <FaCalendar className="mr-2" />
              {new Date(result.createdAt).toLocaleDateString('fa-IR')}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
