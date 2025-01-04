import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGraduationCap, FaHistory } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import ExamQuestions from "./ExamQuestions";
import ExamHistory from "./ExamHistory";

const LoadingAnimation = () => (
  <div className="flex flex-col items-center justify-center min-h-[300px] w-full">
    <div className="relative">
      <motion.div
        className="w-24 h-24 border-4 border-blue-200 rounded-full"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity }
        }}
      />
      <motion.div
        className="absolute top-0 left-0 w-24 h-24 border-4 border-t-blue-500 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <FaGraduationCap className="text-3xl text-blue-500" />
      </motion.div>
    </div>
    <motion.p 
      className="mt-6 text-lg font-medium text-blue-500"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      در حال بارگذاری...
    </motion.p>
  </div>
);

export default function ExamsCategory({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [examStarted, setExamStarted] = useState(false);
  const [examConfig, setExamConfig] = useState(null);
  const [activeTab, setActiveTab] = useState("categories");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubCategoriesLoading, setIsSubCategoriesLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/examcategories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    setSelectedCategory(categoryId);
    setIsSubCategoriesLoading(true);
    try {
      const res = await fetch(`/api/examcategories?parent=${categoryId}`);
      const data = await res.json();
      setSubCategories(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    } finally {
      setIsSubCategoriesLoading(false);
    }
  };

  const handleLevelClick = (categoryId, level) => {
    setExamConfig({ category: categoryId, level });
    setExamStarted(true);
  };

  const renderCategories = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {isLoading ? (
        <div className="md:col-span-2 lg:col-span-3">
          <LoadingAnimation />
        </div>
      ) : categories.length === 0 ? (
        <div className="md:col-span-2 lg:col-span-3 text-center text-gray-500 py-10">
          هیچ دسته‌بندی یافت نشد
        </div>
      ) : (
        categories.map((category) => (
          <motion.div
            key={category._id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
        ))
      )}
    </div>
  );

  const renderSubCategories = () => (
    <div>
      <button
        onClick={() => setSelectedCategory(null)}
        className="mb-6 flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors"
      >
        <span>←</span>
        <span>بازگشت به دسته‌های اصلی</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isSubCategoriesLoading ? (
          <div className="md:col-span-2 lg:col-span-3">
            <LoadingAnimation />
          </div>
        ) : subCategories.length === 0 ? (
          <div className="md:col-span-2 lg:col-span-3 text-center text-gray-500 py-10">
            هیچ زیردسته‌ای یافت نشد
          </div>
        ) : (
          subCategories.map((subCategory) => (
            <motion.div
              key={subCategory._id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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
          ))
        )}
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
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            activeTab === "categories"
                              ? "bg-blue-500 text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          دسته‌بندی آزمون‌ها
                        </button>
                        <button
                          onClick={() => setActiveTab("history")}
                          className={`px-4 py-2 rounded-lg transition-colors ${
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
                        className="rounded-full p-2 hover:bg-gray-100 transition-colors"
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
