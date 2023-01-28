/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import computerIcon from './images/computer.png';
import playerIcon from './images/player.png';

function Board() {
  // State Variables
  const [turn, setTurn] = useState('x');
  const [squares, setSquares] = useState(Array(9).fill(''));
  const [colors, setColors] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState({
    player: 0,
    computer: 0,
    draws: 0,
  });

  // Global Variables
  const complementary = {
    0: [
      [1, 2],
      [3, 6],
      [4, 8],
    ],
    1: [
      [0, 2],
      [4, 7],
    ],
    2: [
      [0, 1],
      [5, 8],
      [4, 6],
    ],
    3: [
      [0, 6],
      [4, 5],
    ],
    4: [
      [3, 5],
      [1, 7],
      [0, 8],
    ],
    5: [
      [3, 4],
      [2, 8],
    ],
    6: [
      [0, 3],
      [7, 8],
      [4, 2],
    ],
    7: [
      [1, 4],
      [6, 8],
    ],
    8: [
      [6, 7],
      [2, 5],
      [0, 4],
    ],
  };

  // functions
  const restartGame = () => {
    // restart Game
    setTimeout(() => {
      setSquares(Array(9).fill(''));
      setTurn('x');
      setGameOver(false);
      setColors(Array(9).fill(''));
    }, 1000);
  };

  const setWinnerOfGame = (w) => {
    // setGameOver(true);
    setWinner(w);
    const scoreCopy = { ...score };
    if (w === 'x') {
      scoreCopy.player += 1;
    } else {
      scoreCopy.computer += 1;
    }
    setScore(scoreCopy);
    // restartGame();
  };

  const checkWinner = (cells) => {
    Object.keys(complementary).forEach((key) => {
      // console.log('key', key);
      // console.log('arrays', complementary[key]);
      complementary[key].forEach((items) => {
        if (cells[key] !== ''
        && cells[key] === cells[items[0]]
        && cells[items[0]] === cells[items[1]]) {
          console.log('condition');
          setGameOver(true);
          const colorsCopy = [...colors];
          colorsCopy[key] = 'white';
          colorsCopy[items[0]] = 'white';
          colorsCopy[items[1]] = 'white';
          setColors(colorsCopy);
          setWinnerOfGame(cells[key]);
          return true;
        }
      });
    });
    return false;
  };

  const checkDraw = (cells) => {
    // check if no free slots and game not over
    const freeSlots = [];
    cells.forEach((item, index) => {
      if (item === '') {
        freeSlots.push(index);
      }
    });
    if (freeSlots.length === 0 && !gameOver) {
      const scoreCopy = { ...score };
      scoreCopy.draws += 1;
      setScore(scoreCopy);
      setGameOver(true);
      // restartGame();
    }
  };

  const computerPlay = (cells) => {
    console.log('gameOver', gameOver);
    if (!gameOver) {
      // check free slots
      const freeSlots = [];
      cells.forEach((item, index) => {
        if (item === '') {
          freeSlots.push(index);
        }
      });
      console.log('freeSlots', freeSlots);
      // computer play
      let playedIndex = -1;
      // check if I can win
      freeSlots.forEach((key) => {
        complementary[key].forEach((items) => {
          if (cells[items[0]] === 'o' && cells[items[1]] === 'o') {
            playedIndex = key;
          }
        });
      });

      if (parseInt(playedIndex, 10) === -1) {
        // check if I can prevent player from winning
        freeSlots.forEach((key) => {
          complementary[key].forEach((items) => {
            if (cells[items[0]] === 'x' && cells[items[1]] === 'x') {
              playedIndex = key;
            }
          });
        });
      }
      if (parseInt(playedIndex, 10) === -1) {
        // play randomly
        playedIndex = freeSlots[Math.floor(Math.random() * freeSlots.length)];
      }

      cells[playedIndex] = 'o';
      setSquares(cells);
      checkWinner(cells);
      setTurn('x');
    }
  };

  const handleClick = (index) => {
    if (squares[index] !== '' || gameOver) {
      return;
    }
    // take copy from squares
    const cells = [...squares];
    cells[index] = turn;
    setSquares(cells);
    if (turn === 'x') {
      setTurn('o');
    }
    checkWinner(cells);
  };

  useEffect(() => {
    if (gameOver) {
      restartGame();
    }
    if (turn === 'o' && !gameOver) {
      setTimeout(() => {
        computerPlay(squares);
      }, 1000);
    }
    checkDraw(squares);
  }, [gameOver, turn, squares]);

  // components
  function Square(props) {
    const colorOrange = {
      color: 'orange'
    };
    const colorTeal = {
      color: '#0dc6c6'
    };
    return (

      <td
        onClick={() => { handleClick(props.index); }}
        className={colors[props.index]}
        style={props.text === 'x' ? colorOrange : colorTeal}
      >
        {props.text.toUpperCase()}
      </td>
    );
  }
  const Score = (props) => (
    <table id="score">
      <tbody>
        <tr>
          <th className="player">Player</th>
          <th>Draws</th>
          <th className="computer">Computer</th>
        </tr>
        <tr>
          <th className="player">{score.player}</th>
          <th>{score.draws}</th>
          <th className="computer">{score.computer}</th>
        </tr>
      </tbody>
    </table>
  );

  return (
    <>
      <h1 className="text-center">
        <img src={turn === 'x' ? playerIcon : computerIcon} alt="playerIcon" />
        <br />
        {turn === 'x' ? 'Player (X)' : 'Computer (O)'}
      </h1>
      <table id="board">
        <tbody>
          <tr>
            <Square index={0} text={squares[0]} />
            <Square index={1} text={squares[1]} />
            <Square index={2} text={squares[2]} />
          </tr>
          <tr>
            <Square index={3} text={squares[3]} />
            <Square index={4} text={squares[4]} />
            <Square index={5} text={squares[5]} />
          </tr>
          <tr>
            <Square index={6} text={squares[6]} />
            <Square index={7} text={squares[7]} />
            <Square index={8} text={squares[8]} />
          </tr>
        </tbody>
      </table>
      <Score />
    </>
  );
}

export default Board;
