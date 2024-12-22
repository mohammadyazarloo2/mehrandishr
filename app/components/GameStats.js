"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiSpeakerWave,TbArrowBackUp } from "react-icons/hi2";

export default function GameStats() {
  const [stats, setStats] = useState({
    history: [],
    stats: {
      totalGamesPlayed: 0,
      highestScore: 0,
      averageScore: 0,
      highestLevel: 1,
    },
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/keyboard-results");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen flex flex-col">
        {/* Game Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            بازی کیبورد - مرحله {gameState.level}
          </h1>
          <button
            onClick={back}
            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-purple-600"
          >
            <TbArrowBackUp className="w-6 h-6" />
          </button>
        </div>

        {/* Level Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {levelConfig[gameState.level].description}
          </h2>
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
              style={{
                width: `${
                  (gameStats.correctAnswers /
                    levelConfig[gameState.level].required) *
                  100
                }%`,
              }}
            />
          </div>
          <p className="mt-2 text-gray-600 text-center">
            {gameStats.correctAnswers} از{" "}
            {levelConfig[gameState.level].required}
          </p>
        </div>

        {/* Word Display */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {gameState.level === 1 ? (
            <div className="text-8xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              {gameState.currentWord}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {gameState.currentWord?.name}
              </div>
              {gameState.currentWord?.img && (
                <img
                  src={gameState.currentWord.img}
                  alt=""
                  className="w-48 h-48 object-cover rounded-2xl shadow-lg"
                />
              )}
              <div className="flex items-center gap-4">
                <span className="text-xl text-gray-600">
                  {gameState.currentWord?.translate}
                </span>
                <button
                  onClick={speakWord}
                  disabled={gameState.isPlaying}
                  className="p-3 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 transition-all duration-300 disabled:opacity-50"
                >
                  <HiSpeakerWave className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Input */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <p className="text-2xl font-medium text-gray-700 text-center">
            ورودی شما: {gameState.userInput}
          </p>
        </div>

        {/* Keyboard */}
        <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6">
          {[
            ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
            ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
            ["z", "x", "c", "v", "b", "n", "m"],
          ].map((row, i) => (
            <div key={i} className="flex justify-center gap-1 md:gap-2 mb-2">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className={`w-8 h-10 md:w-12 md:h-12 rounded-xl font-medium text-base md:text-lg
                         transition-all duration-300
                         ${
                           gameState.activeKeys.includes(key)
                             ? "bg-gradient-to-b from-purple-500 to-blue-500 text-white shadow-lg"
                             : "bg-gradient-to-b from-gray-50 to-gray-100 hover:from-purple-50 hover:to-purple-100 text-gray-700 border border-gray-200"
                         }`}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto">
          {[
            { label: "امتیاز", value: gameState.score },
            { label: "رکورد متوالی", value: gameStats.currentStreak },
            { label: "بهترین رکورد", value: gameStats.maxStreak },
            { label: "اشتباهات", value: gameState.mistakes },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-4 text-center transform hover:scale-105 transition-all duration-300"
            >
              <span className="block text-sm text-gray-500 mb-2">
                {stat.label}
              </span>
              <strong className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                {stat.value}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
