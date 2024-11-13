import { useState } from 'react';
import { icdlQuestions } from './questions';
import { TbArrowBackUp } from "react-icons/tb";

const IcdlExam = ({ children, back }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const questions=icdlQuestions;

//   const questions = [
//     // Windows سوالات
//     {
//       category: "Windows",
//       questions: [
//         {
//           question: "کلید میانبر برای باز کردن Task Manager چیست؟",
//           options: ["Ctrl+Alt+Del", "Ctrl+Shift+Esc", "Alt+F4", "Windows+L"],
//           correct: 0
//         },
//         {
//           question: "برای تغییر نام یک فایل از چه کلیدی استفاده می‌شود؟",
//           options: ["Delete", "F2", "F5", "Enter"],
//           correct: 1
//         },
//         {
//           question: "کدام پوشه محل پیش‌فرض ذخیره فایل‌های دانلود شده است؟",
//           options: ["Documents", "Downloads", "Desktop", "Pictures"],
//           correct: 1
//         }
//       ]
//     },

//     // Word سوالات
//     {
//       category: "Word",
//       questions: [
//         {
//           question: "برای ایجاد یک جدول جدید از کدام منو استفاده می‌شود؟",
//           options: ["Insert", "Home", "View", "Layout"],
//           correct: 0
//         },
//         {
//           question: "کلید میانبر برای Bold کردن متن چیست؟",
//           options: ["Ctrl+I", "Ctrl+B", "Ctrl+U", "Ctrl+A"],
//           correct: 1
//         },
//         {
//           question: "برای تغییر جهت متن به راست به چپ از چه کلیدی استفاده می‌شود؟",
//           options: ["Ctrl+Shift+A", "Alt+Shift", "Ctrl+Right", "Ctrl+Left"],
//           correct: 1
//         }
//       ]
//     },

//     // Excel سوالات
//     {
//       category: "Excel",
//       questions: [
//         {
//           question: "تابع SUM برای چه عملیاتی استفاده می‌شود؟",
//           options: ["میانگین‌گیری", "جمع اعداد", "شمارش سلول‌ها", "ضرب اعداد"],
//           correct: 1
//         },
//         {
//           question: "کدام نماد در فرمول‌نویسی Excel نشان‌دهنده ضرب است؟",
//           options: ["x", "*", "×", "#"],
//           correct: 1
//         },
//         {
//           question: "برای فریز کردن سطر اول از کدام گزینه استفاده می‌شود؟",
//           options: ["Freeze Panes", "Split", "Hide", "Lock"],
//           correct: 0
//         }
//       ]
//     },

//     // PowerPoint سوالات
//     {
//       category: "PowerPoint",
//       questions: [
//         {
//           question: "برای شروع نمایش اسلاید از کدام کلید استفاده می‌شود؟",
//           options: ["F1", "F5", "F7", "F12"],
//           correct: 1
//         },
//         {
//           question: "برای اضافه کردن انیمیشن به اسلاید از کدام تب استفاده می‌شود؟",
//           options: ["Insert", "Design", "Animations", "Transitions"],
//           correct: 2
//         }
//       ]
//     },

//     // Internet سوالات
//     {
//       category: "Internet",
//       questions: [
//         {
//           question: "کدام پروتکل برای وب‌گردی استفاده می‌شود؟",
//           options: ["FTP", "HTTP", "SMTP", "POP3"],
//           correct: 1
//         },
//         {
//           question: "دامنه .ir مربوط به کدام کشور است؟",
//           options: ["عراق", "ایرلند", "ایران", "ایتالیا"],
//           correct: 2
//         },
//         {
//           question: "کدام مرورگر متعلق به شرکت Google است؟",
//           options: ["Firefox", "Edge", "Safari", "Chrome"],
//           correct: 3
//         }
//       ]
//     },

//     // Computer Concepts سوالات
//     {
//       category: "Computer Concepts",
//       questions: [
//         {
//           question: "RAM مخفف چیست؟",
//           options: [
//             "Random Access Memory",
//             "Read Access Memory",
//             "Random Available Memory",
//             "Read Available Memory"
//           ],
//           correct: 0
//         },
//         {
//           question: "کدام یک از موارد زیر یک سیستم‌عامل نیست؟",
//           options: ["Windows", "Linux", "Office", "MacOS"],
//           correct: 2
//         },
//         {
//           question: "واحد اندازه‌گیری سرعت پردازنده چیست؟",
//           options: ["Byte", "Hertz", "Pixel", "Bit"],
//           correct: 1
//         }
//       ]
//     }
//   ];

  const renderCategorySelection = () => {
    return (
      <div className="category-selection">
        <h2>لطفا دسته‌بندی مورد نظر را انتخاب کنید</h2>
        <div className='backazmoon' onClick={()=>back()}>
        <TbArrowBackUp />
        </div>
        <div className="category-grid">
          {questions.map((category, index) => (
            <button
              key={index}
              className="category-btn"
              onClick={() => setSelectedCategory(index)}
            >
              <span className="category-name">{category.category}</span>
              <span className="question-count">
                {category.questions.length} سوال
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderExam = () => {
    const currentCategoryQuestions = questions[selectedCategory].questions;
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
          <h3>آزمون {questions[selectedCategory].category}</h3>
          <div className="progress">
            سوال {currentQuestion + 1} از {currentCategoryQuestions.length}
          </div>
        </div>
        
        <div className="question-card">
          <p className="question-text">
            {currentCategoryQuestions[currentQuestion].question}
          </p>
          <div className="options-grid">
            {currentCategoryQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className="option-btn"
                onClick={() => handleAnswer(index)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const currentCategoryQuestions = questions[selectedCategory].questions;
    return (
      <div className="result-container">
        <h2>نتیجه آزمون {questions[selectedCategory].category}</h2>
        <div className="score-card">
          <p>امتیاز شما: {score} از {currentCategoryQuestions.length}</p>
          <p>درصد موفقیت: {((score/currentCategoryQuestions.length) * 100).toFixed(1)}%</p>
        </div>
        <button 
          className="restart-btn"
          onClick={() => {
            setSelectedCategory(null);
            setCurrentQuestion(0);
            setScore(0);
          }}
        >
          بازگشت به انتخاب دسته‌بندی
        </button>
      </div>
    );
  };

  const handleAnswer = (selectedOption) => {
    const currentCategoryQuestions = questions[selectedCategory].questions;
    if(selectedOption === currentCategoryQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  if (selectedCategory === null) {
    return renderCategorySelection();
  }

  const currentCategoryQuestions = questions[selectedCategory].questions;
  if (currentQuestion >= currentCategoryQuestions.length) {
    return renderResult();
  }

  return renderExam();
};

export default IcdlExam;