import { IMinesweeper, GameStatus } from 'minesweeper-redux'
import { MouseEventHandler } from 'react'
import Row from './Row'
import { CellMouseEvent } from './types'

export interface BoardProps {
  gameState: IMinesweeper
  startNewGame: MouseEventHandler
  onLeftClick: CellMouseEvent
  onRightClick: CellMouseEvent
}

function Board({ gameState, startNewGame, onLeftClick, onRightClick }: BoardProps) {
  if (gameState.status === GameStatus.Waiting) {
    return (
      <div id="minesweeper-board">
        <button onClick={startNewGame}>Start Game</button>
      </div>
    )
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
  )
}

export default Board
