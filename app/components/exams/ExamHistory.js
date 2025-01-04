import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendar, FaChevronDown } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function ExamHistory({ initialCategoryId }) {
  const [examResults, setExamResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userCategories, setUserCategories] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/questions/examresult");
        const results = await response.json();
        console.log("Results:", results); // برای دیباگ

        // گروه‌بندی نتایج بر اساس دسته‌بندی
        const categories = results.reduce((acc, result) => {
          const categoryId = result.category._id;
          if (!acc.find((cat) => cat._id === categoryId)) {
            acc.push({
              _id: categoryId,
              name: result.category.name,
            });
          }
          return acc;
        }, []);

        setUserCategories(categories);
        setExamResults(results);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    if (session) {
      fetchData();
    }
  }, [session]);

  console.log(userCategories);

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

      <div className="space-y-4">
        {userCategories.map((category) => (
          <motion.div
            key={category._id}
            className="border rounded-lg overflow-hidden shadow-sm"
          >
            <button
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category._id ? null : category._id
                )
              }
              className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50"
            >
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <FaChevronDown
                className={`transform transition-transform duration-200 ${
                  selectedCategory === category._id ? "rotate-180" : ""
                }`}
              />
            </button>

            {selectedCategory === category._id && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="border-t"
              >
                {examResults
                  .filter((result) => result.category._id === category._id)
                  .map((result) => (
                    <div
                      key={result._id}
                      className="p-4 bg-white border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="text-gray-600">سطح: {result.level}</p>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <FaCalendar className="ml-2" />
                            {new Date(result.createdAt).toLocaleDateString(
                              "fa-IR"
                            )}
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          {result.score}%
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="text-gray-600 mb-1">کل سوالات</div>
                          <div className="font-bold text-lg">
                            {result.totalQuestions}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                          <div className="text-green-600 mb-1">
                            پاسخ‌های درست
                          </div>
                          <div className="font-bold text-lg text-green-700">
                            {result.correctAnswers}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                          <div className="text-red-600 mb-1">
                            پاسخ‌های نادرست
                          </div>
                          <div className="font-bold text-lg text-red-700">
                            {result.wrongAnswers}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
