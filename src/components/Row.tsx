import { Cell as ICell } from 'minesweeper-redux'
import Cell from './Cell'
import { CellMouseEvent } from './types'
import styles from './Row.module.css'
export interface RowProps {
  rowIndex: number
  row: readonly ICell[]
  leftClick: CellMouseEvent
  rightClick: CellMouseEvent
}

function Row({ rowIndex, row, leftClick, rightClick }: RowProps) {
  return (
    <div className={styles.row}>
      {row.map((cell, index) => (
        <Cell
          key={`cell-${rowIndex}-${index}`}
          cell={cell}
          leftClick={(e) => leftClick(e, { x: index, y: rowIndex })}
          rightClick={(e) => rightClick(e, { x: index, y: rowIndex })}
        />
      ))}
    </div>
  )
}

export default Row
