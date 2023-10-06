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

  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  const [snakeCells, setSnakeCells] = useState(new Set([112, 111, 110]));
  const [snake, setSnake] = useState(initialSnake);
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Hanlding key press
  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        setDirection(Direction.UP);
        break;
      case "ArrowRight":
        setDirection(Direction.RIGHT);
        break;
      case "ArrowDown":
        setDirection(Direction.DOWN);
        break;
      case "ArrowLeft":
        setDirection(Direction.LEFT);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
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

    const oldTailValue = getAndRemoveLastNodeValue(snake);

    const newHead = new LinkedListNode(newHeadValue);
    newHead.next = snake.head;
    snake.head = newHead;

    snakeCells.add(newHeadValue);
    snakeCells.delete(oldTailValue!);

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
            {row.map((cellValue, cellIdx) => (
              <div
                key={cellIdx}
                className={`cell ${
                  snakeCells.has(cellValue) ? "cell-green" : ""
                }`}
              ></div>
            ))}
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

export default Snake;
