import { GameStatus } from 'minesweeper-redux'
import { MouseEventHandler } from 'react'

interface FooterProps {
  gameStatus: GameStatus
  onUndoMove: MouseEventHandler
  startNewGame: MouseEventHandler
}

function Footer({ gameStatus, onUndoMove, startNewGame }: FooterProps) {
  switch (gameStatus) {
    case GameStatus.Loss:
      return (
        <div id="minesweeper-footer">
          <button onClick={onUndoMove}>Undo move</button>
        </div>
      )
    case GameStatus.Win:
      return (
        <div id="minesweeper-footer">
          <button onClick={startNewGame}>New Game</button>
        </div>
      )
    default:
      return <div id="minesweeper-footer" />
  }
}

export default Footer