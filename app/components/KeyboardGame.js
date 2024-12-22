"use client";
import { useEffect, useState } from "react";
import { Howl } from "howler";
import { TbArrowBackUp } from "react-icons/tb";
import { HiSpeakerWave } from "react-icons/hi2";
import toast from "react-hot-toast";
import sounds from "../data/games/sounds";

const levelConfig = {
  1: { 
    required: 10, 
    type: 'letter', 
    description: 'تمرین با حروف - مرحله مقدماتی',
    wordLength: 1
  },
  2: { 
    required: 12, 
    type: 'word', 
    description: 'کلمات دو حرفی',
    wordLength: 2
  },
  3: { 
    required: 15, 
    type: 'word', 
    description: 'کلمات سه حرفی',
    wordLength: 3
  },
  4: { 
    required: 18, 
    type: 'word', 
    description: 'کلمات چهار حرفی',
    wordLength: 4
  },
  5: { 
    required: 20, 
    type: 'word', 
    description: 'کلمات پنج حرفی',
    wordLength: 5
  },
  6: { 
    required: 22, 
    type: 'word', 
    description: 'کلمات شش حرفی',
    wordLength: 6
  },
  7: { 
    required: 25, 
    type: 'word', 
    description: 'کلمات هفت حرفی',
    wordLength: 7
  },
  8: { 
    required: 28, 
    type: 'word', 
    description: 'کلمات هشت حرفی',
    wordLength: 8
  },
  9: { 
    required: 30, 
    type: 'word', 
    description: 'کلمات نه حرفی',
    wordLength: 9
  },
  10: { 
    required: 32, 
    type: 'word', 
    description: 'کلمات ده حرفی',
    wordLength: 10
  },
  11: { 
    required: 35, 
    type: 'word', 
    description: 'کلمات یازده حرفی',
    wordLength: 11
  },
  12: { 
    required: 38, 
    type: 'word', 
    description: 'کلمات دوازده حرفی',
    wordLength: 12
  },
  13: { 
    required: 40, 
    type: 'word', 
    description: 'کلمات سیزده حرفی',
    wordLength: 13
  },
  14: { 
    required: 42, 
    type: 'word', 
    description: 'کلمات چهارده حرفی',
    wordLength: 14
  },
  15: { 
    required: 45, 
    type: 'word', 
    description: 'کلمات پانزده حرفی',
    wordLength: 15
  }
};

export default function KeyboardGame({ onClose, back }) {
  // Game States
  const [gameState, setGameState] = useState({
    level: 1,
    score: 0,
    mistakes: 0,
    currentStreak: 0,
    maxStreak: 0,
    isPlaying: false,
  });

  // UI States
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [activeKeys, setActiveKeys] = useState([]);
  const [words, setWords] = useState([]);

  // Initial Setup
  useEffect(() => {
    fetchWords();
    initializeLevel();
  }, [gameState.level]);

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (/^[a-z]$/.test(key)) {
        handleInput(key);
        playSound(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentWord, userInput]);

  // Game Logic Functions
  const initializeLevel = () => {
    if (gameState.level === 1) {
      generateRandomLetter();
    } else {
      generateRandomWord();
    }
  };

  const handleInput = (key) => {
    if (gameState.level === 1) {
      handleLetterMode(key);
    } else {
      handleWordMode(key);
    }
  };

  const handleLetterMode = (key) => {
    if (key === currentWord) {
      updateScore(true);
      generateRandomLetter();
    } else {
      updateScore(false);
    }
  };

  const handleWordMode = (key) => {
    const newInput = userInput + key;
    if (currentWord.name.startsWith(newInput)) {
      setUserInput(newInput);
      setActiveKeys([...activeKeys, key]);

      if (newInput === currentWord.name) {
        updateScore(true);
        generateRandomWord();
        setUserInput("");
        setActiveKeys([]);
      }
    } else {
      updateScore(false);
      setUserInput("");
      setActiveKeys([]);
    }
  };

  const updateScore = (isCorrect) => {
    setGameState((prev) => {
      const newState = {
        ...prev,
        score: isCorrect ? prev.score + 1 : prev.score,
        mistakes: isCorrect ? prev.mistakes : prev.mistakes + 1,
        currentStreak: isCorrect ? prev.currentStreak + 1 : 0,
        maxStreak: isCorrect
          ? Math.max(prev.maxStreak, prev.currentStreak + 1)
          : prev.maxStreak,
      };

      // Check for level completion
      if (isCorrect && newState.score >= levelConfig[prev.level].required) {
        if (prev.level < Object.keys(levelConfig).length) {
          toast.success(`تبریک! به مرحله ${prev.level + 1} رسیدید!`);
          return {
            ...newState,
            level: prev.level + 1,
            score: 0,
          };
        }
      }

      return newState;
    });
  };

  // Helper Functions
  const generateRandomLetter = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    setCurrentWord(letters[Math.floor(Math.random() * letters.length)]);
  };

  const generateRandomWord = () => {
    if (words.length > 0) {
      const levelWords = words.filter(
        (word) => word.name.length === levelConfig[gameState.level].wordLength
      );
      setCurrentWord(levelWords[Math.floor(Math.random() * levelWords.length)]);
    }
  };

  const playSound = (key) => {
    if (sounds[key]) {
      new Howl({ src: [sounds[key]] }).play();
    }
  };

  const fetchWords = async () => {
    try {
      const res = await fetch("/api/games/words");
      const data = await res.json();
      setWords(data);
    } catch (error) {
      console.error("Error fetching words:", error);
    }
  };

  const speakWord = (text, lang) => {
    if (gameState.isPlaying) {
      window.speechSynthesis.cancel();
    }
  
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.onstart = () => setGameState(prev => ({ ...prev, isPlaying: true }));
    utterance.onend = () => setGameState(prev => ({ ...prev, isPlaying: false }));
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="keyboard-game fixed inset-0 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-indigo-900 via-purple-900 to-slate-900">
      <div className="h-screen flex flex-col p-4 md:p-6">
        {/* Header */}
        <div className="h-[10%] flex justify-between items-center">
          <button
            onClick={back}
            className="group bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-500"
          >
            <TbArrowBackUp className="w-5 h-5 text-white/80 group-hover:text-white group-hover:scale-110 transition-all" />
          </button>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-text">
            بازی کیبورد - مرحله {gameState.level}
          </h1>
        </div>

        {/* Level Info & Progress */}
        <div className="h-[10%] bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <p className="text-white/80 mb-2">
            {levelConfig[gameState.level].description}
          </p>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transition-all duration-500"
              style={{
                width: `${
                  (gameState.score / levelConfig[gameState.level].required) *
                  100
                }%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-white/60">
            <span>{gameState.score}</span>
            <span>{levelConfig[gameState.level].required}</span>
          </div>
        </div>

        {/* Word Display */}
        <div className="h-[25%] bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center my-2">
          {gameState.level === 1 ? (
            <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse">
              {currentWord}
            </span>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                {currentWord?.name}
              </div>
              {currentWord?.image && (
                <div className="relative w-32 h-32">
                  <img
                    src={currentWord.image}
                    alt={currentWord.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              )}
              <div className="flex items-center gap-3">
                <span className="text-white/80">{currentWord?.translate}</span>
                <button
                  onClick={() => speakWord(currentWord?.name, "en-US")}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-300"
                >
                  <HiSpeakerWave className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Input */}
        <div className="h-[10%] bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center">
          <p className="text-xl text-white/80">
            ورودی شما:{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">
              {userInput}
            </span>
          </p>
        </div>

        {/* Keyboard */}
        <div className="h-[35%] bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex flex-col justify-center gap-1">
          {[
            ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
            ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
            ["z", "x", "c", "v", "b", "n", "m"],
          ].map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleInput(key)}
                  className={`
                    w-9 h-9 md:w-11 md:h-11 rounded-xl font-medium text-base transition-all duration-500
                    ${
                      activeKeys.includes(key)
                        ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(217,70,219,0.5)] scale-95"
                        : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/20 hover:border-white/40"
                    }
                  `}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="h-[10%] grid grid-cols-4 gap-2">
          {[
            { label: "امتیاز", value: gameState.score },
            { label: "اشتباه", value: gameState.mistakes },
            { label: "رکورد فعلی", value: gameState.currentStreak },
            { label: "بهترین رکورد", value: gameState.maxStreak },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-2 text-center hover:bg-white/10 transition-all duration-300"
            >
              <span className="block text-xs text-white/60">{stat.label}</span>
              <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
