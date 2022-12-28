import { MouseEventHandler } from 'react'
import { Cell as ICell } from 'minesweeper-redux'

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
      className={`col text-center ${cell.status === 'revealed' ? 'visible' : 'non-visible'}`}
    >
      <div className="col-content">{cellContent(cell)}</div>
    </div>
  )
}

export default Cell
