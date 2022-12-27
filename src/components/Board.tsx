import { IMinesweeper, GameStatus } from 'minesweeper-redux'
import { MouseEventHandler } from 'react'
import Row from './Row'
import { CellMouseEvent } from './types'

export interface BoardProps {
  status: GameStatus
  board: IMinesweeper['board']
  startNewGame: MouseEventHandler
  onLeftClick: CellMouseEvent
  onRightClick: CellMouseEvent
}

function Board({ status, board, startNewGame, onLeftClick, onRightClick }: BoardProps) {
  if (status === GameStatus.Waiting) {
    return (
      <div id="minesweeper-board">
        <button onClick={startNewGame}>Start Game</button>
      </div>
    )
  }
  return (
    <div id="minesweeper-board">
      {board.grid.cells.map((row, index) => (
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
