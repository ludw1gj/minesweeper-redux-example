import { MouseEventHandler } from 'react'
import { Cell as ICell } from 'minesweeper-redux'
import styles from './Cell.module.css'

export interface CellProps {
  cell: ICell
  leftClick: MouseEventHandler
  rightClick: MouseEventHandler
}

function Cell({ cell, leftClick, rightClick }: CellProps) {
  const cellContent = (cell: ICell) => {
    switch (cell.status) {
      case 'hidden':
        return ' '
      case 'flagged':
        return '🚩'
      case 'revealed':
        if (cell.mineCount === -1) {
          return '💣'
        }
        return cell.mineCount > 0 ? `${cell.mineCount}` : '🌊'
      case 'detonated':
        return '💥'
      default:
        return ''
    }
  }

  return (
    <div
      onClick={leftClick}
      onContextMenu={rightClick}
      className={`${styles.col} ${cell.status === 'revealed' ? styles.visible : styles.nonVisible}`}
    >
      <div className={styles.colContent}>{cellContent(cell)}</div>
    </div>
  )
}

export default Cell
