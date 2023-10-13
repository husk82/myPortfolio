import { useState, useEffect } from "react";
import "./Snake.css";

class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList<T> {
  head: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;
  constructor(value: T) {
    const node = new LinkedListNode(value);
    this.head = node;
    this.tail = node;
  }
}

enum Direction {
  UP = "UP",
  RIGHT = "RIGHT",
  DOWN = "DOWN",
  LEFT = "LEFT",
}

const BOARD_SIZE: number = 15;

const Snake: React.FC = () => {
  //Initial snake
  const initialSnake = new SinglyLinkedList(112);
  const secondNode = new LinkedListNode(111);
  const thirdNode = new LinkedListNode(110);

  initialSnake.head!.next = secondNode;
  secondNode.next = thirdNode;

  const [board] = useState(createBoard(BOARD_SIZE));
  const [foodCell, setFoodCell] = useState(getRandomFoodCell());
  const [snakeCells, setSnakeCells] = useState<Set<number>>(
    new Set([112, 111, 110])
  );
  const [snake, setSnake] = useState<SinglyLinkedList<number>>(initialSnake);
  const [snakeHead, setSnakeHead] = useState<number>(112);
  const [direction, setDirection] = useState<Direction | "">(Direction.RIGHT);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Hanlding key press
  const handleKeyPress = (e: KeyboardEvent) => {
    const newDirection = getDirectionFromKey(e.key);
    setDirection(newDirection);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyPress(e);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Moving snake
  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        moveSnake();
      }
    }, 400);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, direction]);

  const moveSnake = () => {
    let newHeadValue: number;
    let rowCollision: boolean = false;

    if (direction === Direction.RIGHT) {
      newHeadValue = snake.head!.value + 1;
      rowCollision = (newHeadValue % 15) + 15 === 16;
    } else if (direction === Direction.LEFT) {
      newHeadValue = snake.head!.value - 1;
      rowCollision = (newHeadValue % 15) + 15 === 15;
    } else if (direction === Direction.UP) {
      newHeadValue = snake.head!.value - BOARD_SIZE;
    } else {
      newHeadValue = snake.head!.value + BOARD_SIZE;
    }

    const newRow = Math.floor((newHeadValue - 1) / BOARD_SIZE);
    const newCol = (newHeadValue - 1) % BOARD_SIZE;

    if (
      rowCollision ||
      newRow < 0 ||
      newRow >= BOARD_SIZE ||
      newCol < 0 ||
      newCol >= BOARD_SIZE ||
      snakeCells.has(newHeadValue)
    ) {
      handleCollision();
      return;
    }

    setSnakeHead(newHeadValue);

    if (newHeadValue === foodCell) {
      const newHead = new LinkedListNode(newHeadValue);
      newHead.next = snake.head;
      snake.head = newHead;

      snakeCells.add(newHeadValue);

      setFoodCell(getRandomFoodCell());
    } else {
      const oldTailValue = getAndRemoveLastNodeValue(snake);

      const newHead = new LinkedListNode(newHeadValue);
      newHead.next = snake.head;
      snake.head = newHead;

      snakeCells.add(newHeadValue);
      snakeCells.delete(oldTailValue!);
    }

    setSnakeCells(new Set(snakeCells));
    setSnake(snake);
  };

  const getAndRemoveLastNodeValue = (
    snake: SinglyLinkedList<number>
  ): number | null => {
    if (!snake.head) {
      return null;
    }

    let previousNode = null;
    let currentNode = snake.head;

    while (currentNode.next) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    const lastNodeValue = currentNode.value;

    if (previousNode) {
      snake.tail = previousNode;
      previousNode.next = null;
    } else {
      snake.head = null;
      snake.tail = null;
    }

    return lastNodeValue;
  };

  // Stop
  const handleStopClick = () => {
    setIsRunning(!isRunning);
  };
  const handleCollision = () => {
    setIsRunning(false);
  };

  return (
    <div className="board-container">
      <div className="board">
        {board.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((cellValue, cellIdx) => {
              const className = getCellClassName(
                cellValue,
                foodCell,
                snakeCells,
                snakeHead
              );
              return <div key={cellIdx} className={className}></div>;
            })}
          </div>
        ))}
      </div>
      <button onClick={handleStopClick}>Stop</button>
    </div>
  );
};

const createBoard = (BOARD_SIZE: number) => {
  let counter = 1;
  const board = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    const currentRow = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      currentRow.push(counter++);
    }
    board.push(currentRow);
  }
  return board;
};

const getCellClassName = (
  cellValue: number,
  foodCell: number,
  snakeCells: Set<number>,
  snakeHead: number
) => {
  let className = "cell";
  const isFoodCell = cellValue === foodCell;
  const isSnakeCell = snakeCells.has(cellValue);
  const isSnakeHead = snakeHead === cellValue;

  if (isFoodCell) {
    className = "cell cell-red";
  }
  if (isSnakeCell) {
    className = "cell cell-green";
  }
  if (isSnakeHead) {
    className = "cell cell-dark-green";
  }
  if (isFoodCell && isSnakeCell) {
    className = "cell cell-purple";
  }

  return className;
};

const getRandomFoodCell = (): number => {
  const min = 1;
  const max = BOARD_SIZE * BOARD_SIZE;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getDirectionFromKey = (key: String) => {
  switch (key) {
    case "ArrowUp":
      return Direction.UP;
    case "ArrowRight":
      return Direction.RIGHT;
    case "ArrowDown":
      return Direction.DOWN;
    case "ArrowLeft":
      return Direction.LEFT;
    default:
      return "";
  }
};

export default Snake;
