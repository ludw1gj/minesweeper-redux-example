import { CellStatus, ICell } from 'minesweeper-redux'
import { MouseEventHandler } from 'react'

export interface CellProps {
  cell: ICell
  leftClick: MouseEventHandler
  rightClick: MouseEventHandler
}

function Cell({ cell, leftClick, rightClick }: CellProps) {
  const cellContent = (cell: ICell) => {
    switch (cell.status) {
      case CellStatus.Hidden:
        return ' '
      case CellStatus.Flagged:
        return '🚩'
      case CellStatus.Revealed:
        if (cell.isMine) {
          return '💣'
        }
        return cell.mineCount > 0 ? `${cell.mineCount}` : '🌊'
      case CellStatus.Detonated:
        return '💥'
      default:
        return ''
    }
  }

  return (
    <div
      onClick={leftClick}
      onContextMenu={rightClick}
      className={`col text-center ${
        cell.status === CellStatus.Revealed ? 'visible' : 'non-visible'
      }`}
    >
      <div className="col-content">{cellContent(cell)}</div>
    </div>
  )
}

export default Cell
