"use client";

import { set } from "mongoose";
import { useEffect, useState } from "react";
import words from "../data/games/keyboard";
import sounds from "../data/games/sounds";
import wordSounds from "../data/games/sounds";
import { Howl } from "howler";
import { TbArrowBackUp } from "react-icons/tb";
import { HiSpeakerWave } from "react-icons/hi2";

export default function SnakeGrid({ children, onClose, back }, props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentWord, setCurrentWord] = useState("");
  // const [currentLetter, setCurrentLetter] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [level, setLevel] = useState(1);
  const [activeKeys, setActiveKeys] = useState([]);

  useEffect(() => {
    if (level === 1) {
      generateRadndomLetter();
    } else {
      generateRandomWord();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const pressedKey = e.key.toLowerCase();
      // setUserInput(pressedKey);
      if (e.key === "Escape") {
        onClose();
      }
      playSounds(pressedKey);
      if (level === 1) {
        handleLetterInput(pressedKey);
      } else {
        handleWordInput(pressedKey);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentWord, userInput, level, score, mistakes]);

  const playSounds = (key) => {
    if (sounds[key]) {
      const sound = new Howl({
        src: [sounds[key]],
      });
      sound.play();
    }
  };

  const handleLetterInput = (pressedKey) => {
    setUserInput(pressedKey);

    if (
      currentWord.length < 2
        ? pressedKey === currentWord
        : pressedKey === currentWord.name
    ) {
      setScore(score + 1);
      if (score + 1 >= 10 && mistakes === 0) {
        setLevel(2);
        setUserInput("");
      } else {
        generateRadndomLetter();
      }
    } else {
      setMistakes(mistakes + 1);
    }
  };

  const handleWordInput = (pressedKey) => {
    const updateUserInput = userInput + pressedKey;

    if (
      currentWord.length < 2
        ? currentWord.startsWith(updateUserInput)
        : currentWord.name.startsWith(updateUserInput)
    ) {
      setUserInput(updateUserInput);
      setActiveKeys([...activeKeys, pressedKey]);

      if (
        currentWord.length < 2
          ? updateUserInput === currentWord
          : updateUserInput === currentWord.name
      ) {
        setScore(score + 1);
        generateRandomWord();
        setUserInput("");
        setActiveKeys([]); // پاک کردن کلیدهای فعال
      }
    } else {
      setMistakes(mistakes + 1);
      setUserInput("");
      setActiveKeys([]); // پاک کردن کلیدهای فعال در صورت اشتباه
    }
  };

  const generateRadndomLetter = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const randomIndex = Math.floor(Math.random() * letters.length);
    setCurrentWord(letters[randomIndex]);
  };

  const generateRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
  };

  const speakWord = (text, lang) => {
    // اگر در حال پخش هست، قبلش متوقف کنیم
    if (isPlaying) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  console.log(props);
  const letters = "abcdefghijklmnopqrstuvwxyz";

  return (
    <div className="keyboard-game">
      <div className="backgame" onClick={() => back()}>
        <TbArrowBackUp />
      </div>
      <h1>بازی کیبور</h1>
      <p>
        {level === 1
          ? "حرف نمایش داده شده را وارد نمایید:"
          : "کلمه نمایش داده شده را وارد نمایید:"}{" "}
      </p>
      {currentWord.length < 2 ? (
        <>
          <div className="letter-display">{currentWord}</div>
          <p>ورودی شما:{userInput}</p>
          <div className="display-keyboard">
            <div className="keyboard-row">
              {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map(
                (item, key) => (
                  <div
                    className={
                      item === userInput
                        ? "keyboard-key-active"
                        : "keyboard-key"
                    }
                    key={key}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
            <div className="keyboard-row">
              {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map(
                (item, key) => (
                  <div
                    className={
                      item === userInput
                        ? "keyboard-key-active"
                        : "keyboard-key"
                    }
                    key={key}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
            <div className="keyboard-row">
              {["z", "x", "c", "v", "b", "n", "m"].map((item, key) => (
                <div
                  className={
                    item === userInput ? "keyboard-key-active" : "keyboard-key"
                  }
                  key={key}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="game-play">
            <p className="score-display">امتیاز : {score}</p>
            <p className="mistake-display">اشتباه : {mistakes}</p>
            {level > 1 && <p>مرحله : {level}</p>}
          </div>
        </>
      ) : (
        <>
          <div className="word-show">
            <div className="word-display">{currentWord.name}</div>
            <div className="word-details">
              {currentWord.img && (
                <img src={currentWord.img} alt="word-image" />
              )}
              {/* <img src={currentWord.img} alt="word-image" /> */}
              <span> {currentWord.translate} </span>
              <button
                className="speak-button"
                onClick={() => speakWord(currentWord.name, "en-US")}
                disabled={isPlaying}
              >
                <HiSpeakerWave />
              </button>
            </div>
          </div>
          <p className="type-show">ورودی شما:{userInput}</p>
          <div className="display-keyboard">
            <div className="keyboard-row">
              {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map(
                (item, key) => (
                  <div
                    className={
                      activeKeys.includes(item)
                        ? "keyboard-key-active"
                        : "keyboard-key"
                    }
                    key={key}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
            <div className="keyboard-row">
              {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map(
                (item, key) => (
                  <div
                    className={
                      activeKeys.includes(item)
                        ? "keyboard-key-active"
                        : "keyboard-key"
                    }
                    key={key}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
            <div className="keyboard-row">
              {["z", "x", "c", "v", "b", "n", "m"].map((item, key) => (
                <div
                  className={
                    activeKeys.includes(item)
                      ? "keyboard-key-active"
                      : "keyboard-key"
                  }
                  key={key}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="game-play">
            <p className="score-display">امتیاز : {score}</p>
            <p className="mistake-display">اشتباه : {mistakes}</p>
            {level > 1 && <p>مرحله : {level}</p>}
          </div>
        </>
      )}
    </div>
  );
}
