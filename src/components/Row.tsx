import { ICell } from 'minesweeper-redux'
import Cell from './Cell'
import './styles.css'
import { CellMouseEvent } from './types'
export interface RowProps {
  row: readonly ICell[]
  leftClick: CellMouseEvent
  rightClick: CellMouseEvent
}

function Row({ row, leftClick, rightClick }: RowProps) {
  return (
    <div className="row">
      {row.map((cell: ICell) => (
        <Cell
          key={`cell-${cell.coordinate.x}${cell.coordinate.y}`}
          cell={cell}
          leftClick={(e) => leftClick(e, cell)}
          rightClick={(e) => rightClick(e, cell)}
        />
      ))}
    </div>
  )
}

export default Row
