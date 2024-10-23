import React, { useState, useEffect } from "react";
import { TbArrowBackUp } from "react-icons/tb";

const BOARD_SIZE = 20;

const getRandomPosition = () => {
  return {
    x: Math.floor(Math.random() * BOARD_SIZE),
    y: Math.floor(Math.random() * BOARD_SIZE),
  };
};

const SnakeGame = ({children,back}) => {
  const [snake, setSnake] = useState([{ x: 2, y: 2 }]);
  const [food, setFood] = useState(getRandomPosition());
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState({ x: 1, y: 0 });
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
          if(direction.y===0) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if(direction.y===0) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowRight":
          if(direction.x===0) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowLeft":
          if(direction.x===0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const interval = setInterval(() => {
      if (isGameOver) return;

      setNextDirection(direction);
      setSnake((prev) => {
        const newSnake = [...prev];
        const head = {
          x: newSnake[0].x + direction.x,
          y: newSnake[0].y + direction.y,
        };

        // برخورد با دیوار و وورد از سمت مخالف
        if(head.x<0) head.x=BOARD_SIZE-1;
        if(head.x>=BOARD_SIZE) head.x=0;
        if(head.y<0) head.y=BOARD_SIZE-1;
        if(head.y>=BOARD_SIZE) head.y=0;

        if (
          newSnake.some(
            (segment) => segment.x === head.x && segment.y === head.y
          )
        ) {
          setIsGameOver(true);
          return prev;
        }

        //check for eating food
        if (head.x === food.x && head.y === food.y) {
          newSnake.unshift(head);
          setFood(getRandomPosition());
        } else {
          newSnake.pop();
          newSnake.unshift(head);
        }
        return newSnake;
      });
    }, 200);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, [direction, isGameOver, food]);

  return (
    <div className="game-board">
        <div className="backgame" onClick={()=>back()}><TbArrowBackUp /></div>
      {isGameOver ? <div className="game-over">Game Over</div> : null}
      {Array.from({ length: BOARD_SIZE }).map((_, row) => (
        <div key={row} className="board-row">
          {Array.from({ length: BOARD_SIZE }).map((_, col) => (
            <div
              key={col}
              className={`board-cell ${
                snake.some((segment) => segment.x === col && segment.y === row)
                  ? "snake"
                  : food.x === col && food.y === row
                  ? "food"
                  : ""
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SnakeGame;
