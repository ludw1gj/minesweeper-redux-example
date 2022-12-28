import { GameStatus, Grid } from 'minesweeper-redux'
import { MouseEventHandler } from 'react'
import Row from './Row'
import { CellMouseEvent } from './types'

export interface BoardProps {
  status: GameStatus
  grid: Grid
  startNewGame: MouseEventHandler
  onLeftClick: CellMouseEvent
  onRightClick: CellMouseEvent
}

function Board({ status, grid, startNewGame, onLeftClick, onRightClick }: BoardProps) {
  if (status === 'waiting') {
    return (
      <div id="minesweeper-board">
        <button onClick={startNewGame}>Start Game</button>
      </div>
    )
  }
  return (
    <div id="minesweeper-board">
      {grid.map((row, index) => (
        <Row
          key={`row-${index}`}
          rowIndex={index}
          row={row}
          leftClick={onLeftClick}
          rightClick={onRightClick}
        />
      ))}
    </div>
  )
}

export default Board
