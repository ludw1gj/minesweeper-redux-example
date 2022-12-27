import { ICell } from 'minesweeper-redux'

export type CellMouseEvent = (e: React.MouseEvent, cell: ICell) => void
