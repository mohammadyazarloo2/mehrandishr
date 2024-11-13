import { useState } from "react";
import { icdlQuestions } from "./questions";
import { TbArrowBackUp } from "react-icons/tb";

const IcdlExam = ({ children, back }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const questions = icdlQuestions;

  const getLevelQuestions = (questions, level) => {
    const totalQuestions = questions.length;
    switch (level) {
      case "beginner":
        return questions.slice(0, Math.floor(totalQuestions / 3));
      case "intermediate":
        return questions.slice(
          Math.floor(totalQuestions / 3),
          Math.floor((2 * totalQuestions) / 3)
        );
      case "advanced":
        return questions.slice(Math.floor((2 * totalQuestions) / 3));
      default:
        return questions;
    }
  };

  const renderLevelSelection = () => {
    return (
      <div className="level-selection">
        <div className="level-selection-head">
          <div className="backazmoon restart-btn" onClick={() => back()}>
            <TbArrowBackUp />
          </div>
          <div className="exam-header">
            <h2 classNmae="">سطح آزمون را انتخاب کنید</h2>
          </div>
        </div>

        <div className="category-grid">
          <button
            className="category-btn option-btn"
            onClick={() => setSelectedLevel("beginner")}
          >
            <span className="category-name">مقدماتی</span>
          </button>
          <button
            className="category-btn option-btn"
            onClick={() => setSelectedLevel("intermediate")}
          >
            <span className="category-name">متوسط</span>
          </button>
          <button
            className="category-btn option-btn"
            onClick={() => setSelectedLevel("advanced")}
          >
            <span className="category-name">پیشرفته</span>
          </button>
        </div>
      </div>
    );
  };

  const renderCategorySelection = () => {
    return (
      <div className="category-selection">
        <div className="backazmoon restart-btn" onClick={() => setSelectedLevel(null)}>
          <TbArrowBackUp />
        </div>
        <div className="exam-header">
        <h2>لطفا دسته‌بندی مورد نظر را انتخاب کنید</h2>
        </div>
        
        
        <div className="category-grid">
          {questions.map((category, index) => (
            <button
              key={index}
              className="category-btn  option-btn"
              onClick={() => setSelectedCategory(index)}
            >
              <span className="category-name">{category.category}</span>
              <span className="question-count">
                {getLevelQuestions(category.questions, selectedLevel).length}{" "}
                سوال
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderExam = () => {
    const currentCategoryQuestions = getLevelQuestions(
      questions[selectedCategory].questions,
      selectedLevel
    );
    return (
      <div className="exam-container">
        <div
          className="restart-btn"
          onClick={() => {
            setSelectedCategory(null);
            setCurrentQuestion(0);
            setScore(0);
          }}
        >
          <TbArrowBackUp />
        </div>

        <div className="exam-header">
          <h3>
            آزمون {questions[selectedCategory].category} -{" "}
            {selectedLevel === "beginner"
              ? "مقدماتی"
              : selectedLevel === "intermediate"
              ? "متوسط"
              : "پیشرفته"}
          </h3>
          <div className="progress">
            سوال {currentQuestion + 1} از {currentCategoryQuestions.length}
          </div>
        </div>

        <div className="question-card">
          <p className="question-text">
            {currentCategoryQuestions[currentQuestion].question}
          </p>
          <div className="options-grid">
            {currentCategoryQuestions[currentQuestion].options.map(
              (option, index) => (
                <button
                  key={index}
                  className="option-btn"
                  onClick={() => handleAnswer(index)}
                >
                  {option}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const currentCategoryQuestions = getLevelQuestions(
      questions[selectedCategory].questions,
      selectedLevel
    );
    const levelText = {
      beginner: "مقدماتی",
      intermediate: "متوسط",
      advanced: "پیشرفته",
    }[selectedLevel];

    return (
      <div className="result-container">
        <h2>نتیجه آزمون {questions[selectedCategory].category}</h2>
        <h3>سطح: {levelText}</h3>
        <div className="score-card">
          <p>
            امتیاز شما: {score} از {currentCategoryQuestions.length}
          </p>
          <p>
            درصد موفقیت:{" "}
            {((score / currentCategoryQuestions.length) * 100).toFixed(1)}%
          </p>
        </div>
        <button
          className="restart-btn"
          onClick={() => {
            setSelectedLevel(null);
            setSelectedCategory(null);
            setCurrentQuestion(0);
            setScore(0);
          }}
        >
          بازگشت به انتخاب سطح
        </button>
      </div>
    );
  };

  const handleAnswer = (selectedOption) => {
    const currentCategoryQuestions = getLevelQuestions(
      questions[selectedCategory].questions,
      selectedLevel
    );
    if (selectedOption === currentCategoryQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  if (selectedLevel === null) {
    return renderLevelSelection();
  }

  if (selectedCategory === null) {
    return renderCategorySelection();
  }

  const currentCategoryQuestions = getLevelQuestions(
    questions[selectedCategory].questions,
    selectedLevel
  );
  if (currentQuestion >= currentCategoryQuestions.length) {
    return renderResult();
  }

  return renderExam();
};

export default IcdlExam;
