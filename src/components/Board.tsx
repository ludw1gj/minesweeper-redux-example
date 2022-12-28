import { GameStatus, Grid } from 'minesweeper-redux'
import { MouseEventHandler } from 'react'
import Row from './Row'
import { CellMouseEvent } from './types'
import styles from './Board.module.css'

export interface BoardProps {
  status: GameStatus
  grid: Grid
  startNewGame: MouseEventHandler
  onLeftClick: CellMouseEvent
  onRightClick: CellMouseEvent
}

function Board({ status, grid, startNewGame, onLeftClick, onRightClick }: BoardProps) {
  const rows = grid.map((row, index) => (
    <Row
      key={`row-${index}`}
      rowIndex={index}
      row={row}
      leftClick={onLeftClick}
      rightClick={onRightClick}
    />
  ))
  return (
    <div className={styles.minesweeperBoard}>
      {status === 'waiting' ? (
        <button className={styles.startButton} onClick={startNewGame}>
          Start Game
        </button>
      ) : (
        rows
      )}
    </div>
  )
}

export default Board
