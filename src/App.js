import { useState, useEffect } from "react";

import "./App.css";
import Square from "./components/Square";
import { Patterns } from "./helper/Patterns";

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [result, setResult] = useState({ winner: "", state: "" });

  useEffect(() => {
    checkWin();
    checkIfTie();
  }, [board]);

  const markSquare = (square) => {
    setBoard(
      board.map((val, index) => {
        if (index === square && val === "") {
          return player;
        }
        return val;
      })
    );

    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  };

  const checkWin = () => {
    Patterns.forEach((currentPattern) => {
      const firstPlayer = board[currentPattern[0]];
      if (firstPlayer === "") return;

      let foundWinningPattern = true;

      currentPattern.forEach((index) => {
        if (board[index] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: firstPlayer, state: "Won" });
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: "No one", state: "Tie" });
    }
  };

  const handleRestart = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
    setResult({ winner: "", state: "" });
  }

  return (
    <div className="App">
      <div className="board">
        {result.winner !== "" && (
          <h3 className="result">
            {result.state === "Tie"
              ? `Match ${result.state} `
              : `Player ${result.winner} won!`}
          </h3>
        )}
        <div className="row">
          <Square val={board[0]} chooseSquare={() => markSquare(0)} />
          <Square val={board[1]} chooseSquare={() => markSquare(1)} />
          <Square val={board[2]} chooseSquare={() => markSquare(2)} />
        </div>
        <div className="row">
          <Square val={board[3]} chooseSquare={() => markSquare(3)} />
          <Square val={board[4]} chooseSquare={() => markSquare(4)} />
          <Square val={board[5]} chooseSquare={() => markSquare(5)} />
        </div>
        <div className="row">
          <Square val={board[6]} chooseSquare={() => markSquare(6)} />
          <Square val={board[7]} chooseSquare={() => markSquare(7)} />
          <Square val={board[8]} chooseSquare={() => markSquare(8)} />
        </div>
        {result.winner !== "" && (
          <div className="restart">
            <button onClick={handleRestart}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
