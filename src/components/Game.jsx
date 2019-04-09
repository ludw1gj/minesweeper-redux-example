import React from "react";
import { connect } from "react-redux";
import {
  startGame,
  revealCell,
  tickTimer,
  toggleFlag,
  loadGame,
  undoLoosingMove,
  difficulties,
  CellStatus,
  GameStatus,
} from "minesweeper-redux";

import "./styles.css";

function Row({ row, leftClick, rightClick }) {
  return (
    <div className="row">
      {row.map(cell => (
        <Cell
          key={`cell-${cell.coordinate.x}${cell.coordinate.y}`}
          cell={cell}
          leftClick={e => leftClick(e, cell)}
          rightClick={e => rightClick(e, cell)}
        />
      ))}
    </div>
  );
}

function Cell({ cell, leftClick, rightClick }) {
  const cellContent = cell => {
    switch (cell.status) {
      case CellStatus.Hidden:
        return " ";
      case CellStatus.Flagged:
        return "🚩";
      case CellStatus.Revealed:
        if (cell.isMine) {
          return "💣";
        }
        return cell.mineCount > 0 ? `${cell.mineCount}` : "🌊";
      case CellStatus.Detonated:
        return "💥";
      default:
        return "";
    }
  };

  return (
    <div
      onClick={leftClick}
      onContextMenu={rightClick}
      className={`col text-center ${cell.isVisible ? "visible" : "non-visible"}`}>
      <div className="col-content">{cellContent(cell)}</div>
    </div>
  );
}

function GameHeader({ gameState }) {
  const formatTime = (val, min) => {
    const _val = min ? Math.trunc(val / 60) : val % 60;
    return _val > 9 ? `${_val}` : `0${_val}`;
  };

  if (gameState.status === GameStatus.Running) {
    return (
      <div id="minesweeper-header">
        <div id="timer">
          <span id="minutes">{formatTime(gameState.elapsedTime, true)}</span>:
          <span id="seconds">{formatTime(gameState.elapsedTime, false)}</span>
        </div>
        <div id="remaining-flags">Remaining Flags: {gameState.remainingFlags}</div>
      </div>
    );
  } else {
    return <div id="minesweeper-header" />;
  }
}

function GameFooter({ gameStatus, onUndoMove, startNewGame }) {
  switch (gameStatus) {
    case GameStatus.Loss:
      return (
        <div id="minesweeper-footer">
          <button onClick={onUndoMove}>Undo move</button>
        </div>
      );
    case GameStatus.Win:
      return (
        <div id="minesweeper-footer">
          <button onClick={startNewGame}>New Game</button>
        </div>
      );
    default:
      return <div id="minesweeper-footer" />;
  }
}

function GameBoard({ gameState, startNewGame, onLeftClick, onRightClick }) {
  if (gameState.status === GameStatus.Waiting) {
    return (
      <div id="minesweeper-board">
        <button onClick={startNewGame}>Start Game</button>
      </div>
    );
  }
  return (
    <div id="minesweeper-board">
      {gameState.board.grid.cells.map((row, index) => (
        <Row
          key={`row-${row[index].coordinate.x}${row[index].coordinate.y}`}
          row={row}
          leftClick={onLeftClick}
          rightClick={onRightClick}
        />
      ))}
    </div>
  );
}

function GameExample(props) {
  const startNewGame = () => {
    props.startGame({
      difficulty: difficulties.easy,
      randSeed: Math.random(),
      timerCallback: () => {
        props.tickTimer();
      },
    });
    console.log(props);
  };

  const onLeftClick = (e, cell) => {
    e.preventDefault();
    props.revealCell({ coordinate: cell.coordinate });
  };

  const onRightClick = (e, cell) => {
    e.preventDefault();
    props.toggleFlag({ coordinate: cell.coordinate });
  };

  const onUndoMove = e => {
    e.preventDefault();
    props.undoLoosingMove();
  };

  return (
    <div id="minesweeper-interface">
      <GameHeader gameState={props.minesweeper} />
      <GameBoard
        gameState={props.minesweeper}
        startNewGame={startNewGame}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
      />
      <GameFooter
        gameStatus={props.minesweeper.status}
        onUndoMove={onUndoMove}
        startNewGame={startNewGame}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    minesweeper: state.minesweeper,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startGame: options => dispatch(startGame(options)),
    loadGame: options => dispatch(loadGame(options)), // not used in this example
    revealCell: options => dispatch(revealCell(options)),
    toggleFlag: options => dispatch(toggleFlag(options)),
    undoLoosingMove: () => dispatch(undoLoosingMove()),
    tickTimer: () => dispatch(tickTimer()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameExample);
