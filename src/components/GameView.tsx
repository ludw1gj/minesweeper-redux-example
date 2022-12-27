import {
  difficulties,
  startGame,
  revealCell,
  toggleFlag,
  undoLoosingMove,
  tickTimer,
  IMinesweeper,
  ICell,
} from 'minesweeper-redux'
import { connect, useDispatch } from 'react-redux'
import Board from './Board'
import Footer from './Footer'
import Header from './Header'

function GameView({ minesweeper }: { minesweeper: IMinesweeper }) {
  const dispatch = useDispatch()

  const startNewGame = () =>
    dispatch(
      startGame({
        difficulty: difficulties.easy,
        randSeed: Math.random(),
        timerCallback: () => {
          dispatch(tickTimer())
        },
      })
    )

  const onLeftClick = (e: React.MouseEvent, cell: ICell) => {
    e.preventDefault()
    dispatch(revealCell({ coordinate: cell.coordinate }))
  }

  const onRightClick = (e: React.MouseEvent, cell: ICell) => {
    e.preventDefault()
    dispatch(toggleFlag({ coordinate: cell.coordinate }))
  }

  const onUndoMove = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(undoLoosingMove())
  }

  return (
    <div id="minesweeper-interface">
      <Header gameState={minesweeper} />
      <Board
        gameState={minesweeper}
        startNewGame={startNewGame}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
      />
      <Footer gameStatus={minesweeper.status} onUndoMove={onUndoMove} startNewGame={startNewGame} />
    </div>
  )
}

const mapStateToProps = (state: { minesweeper: IMinesweeper }) => {
  return {
    minesweeper: state.minesweeper,
  }
}

export default connect(mapStateToProps)(GameView)
