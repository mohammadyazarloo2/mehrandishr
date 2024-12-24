import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaHistory } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import ExamQuestions from "./ExamQuestions";
import ExamHistory from "./ExamHistory";

export default function ExamsCategory({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examConfig, setExamConfig] = useState(null);
  const [activeTab, setActiveTab] = useState("categories");

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/examcategories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId);
    const res = await fetch(`/api/examcategories?parent=${categoryId}`);
    const data = await res.json();
    setSubCategories(data);
  };

  const handleLevelClick = (categoryId, level) => {
    setExamConfig({ category: categoryId, level });
    setExamStarted(true);
  };

  const renderCategories = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <motion.div
          key={category._id}
          whileHover={{ scale: 1.02 }}
          onClick={() => handleCategoryClick(category._id)}
          className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md 
                   cursor-pointer transition-all duration-200"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {category.name}
              </h3>
              <FaGraduationCap className="text-2xl text-blue-500" />
            </div>
            <p className="text-gray-600">برای مشاهده زیر دسته‌ها کلیک کنید</p>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderSubCategories = () => (
    <div>
      <button
        onClick={() => setSelectedCategory(null)}
        className="mb-4 text-blue-500 hover:text-blue-700"
      >
        ← بازگشت به دسته‌های اصلی
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subCategories.map((subCategory) => (
          <motion.div
            key={subCategory._id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {subCategory.name}
              </h3>
              <div className="space-y-3">
                {["beginner", "intermediate", "advanced", "expert"].map(
                  (level) => (
                    <button
                      key={level}
                      onClick={() => handleLevelClick(subCategory._id, level)}
                      className="w-full py-2.5 px-4 rounded-lg bg-blue-50 hover:bg-blue-100 
                             text-blue-600 font-medium transition-colors duration-200"
                    >
                      سطح {level}
                    </button>
                  )
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            {examStarted ? (
              <ExamQuestions
                {...examConfig}
                onBack={() => {
                  setExamStarted(false);
                  setActiveTab("categories");
                }}
              />
            ) : (
              <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-6xl rounded-2xl bg-white shadow-xl">
                  <div className="border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4 rtl:space-x-reverse">
                        <button
                          onClick={() => setActiveTab("categories")}
                          className={`px-4 py-2 rounded-lg ${
                            activeTab === "categories"
                              ? "bg-blue-500 text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          دسته‌بندی آزمون‌ها
                        </button>
                        <button
                          onClick={() => setActiveTab("history")}
                          className={`px-4 py-2 rounded-lg ${
                            activeTab === "history"
                              ? "bg-blue-500 text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          تاریخچه آزمون‌ها
                        </button>
                      </div>
                      <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-gray-100"
                      >
                        <IoClose className="h-6 w-6 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    {activeTab === "categories" ? (
                      selectedCategory ? (
                        renderSubCategories()
                      ) : (
                        renderCategories()
                      )
                    ) : (
                      <ExamHistory />
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
