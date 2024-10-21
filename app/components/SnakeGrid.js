"use client";

import { set } from "mongoose";
import { useEffect, useState } from "react";
import words from "../data/games/keyboard";
import sounds from "../data/games/sounds";
import wordSounds from "../data/games/sounds";
import { Howl } from "howler";



export default function SnakeGrid({ children,onClose },props) {
  const [currentWord, setCurrentWord] = useState("");
  // const [currentLetter, setCurrentLetter] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [level, setLevel] = useState(1);

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
      if(e.key === 'Escape') {
        onClose();
      }
      playSounds(pressedKey)
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

  const playSounds=(key)=>{
    if(sounds[key]){
      const sound=new Howl({
        src:[sounds[key]]
      })
      sound.play()
    }
  }

  const handleLetterInput = (pressedKey) => {
    setUserInput(pressedKey);
    if (pressedKey === currentWord) {
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

    if (currentWord.startsWith(updateUserInput)) {
      setUserInput(updateUserInput);
      if (updateUserInput === currentWord) {
        setScore(score + 1);
        generateRandomWord();
        setUserInput("");
      }
    } else {
      setMistakes(mistakes + 1);
      setUserInput("");
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

  console.log(props);

  return (
    <div className="keyboard-game">
      <h1>بازی کیبور</h1> { props.openGame }
      <p>
        {" "}
        {level === 1
          ? "press the displayed letter:"
          : "type the displayed word"}{" "}
      </p>
      <div className="letter-display">{currentWord}</div>
      <p>ورودی شما:{userInput}</p>
      <div className="game-play">
        <p className="score-display">امتیاز : {score}</p>
        <p className="mistake-display">اشتباه : {mistakes}</p>
        {level > 1 && <p>level : {level}</p>}
      </div>
    </div>
  );
}
