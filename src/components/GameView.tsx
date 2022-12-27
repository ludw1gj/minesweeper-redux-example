import {
  difficulties,
  startGame,
  revealCell,
  toggleFlag,
  undoLoosingMove,
  tickTimer,
  IMinesweeper,
  ICell,
  StartGameActionOptions,
  StartGameAction,
} from 'minesweeper-redux'
import { connect, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import Board from './Board'
import Footer from './Footer'
import Header from './Header'

export interface GameViewProps {
  minesweeper: IMinesweeper
  timerCallback: () => void
  startGame: (options: StartGameActionOptions) => StartGameAction
}

function GameView({ minesweeper, timerCallback, startGame }: GameViewProps) {
  const dispatch = useDispatch()

  const startNewGame = () => {
    startGame({
      difficulty: difficulties.easy,
      randSeed: Math.random(),
      timerCallback: () => {
        timerCallback()
      },
    })
  }

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
      <Header
        status={minesweeper.status}
        elapsedTime={minesweeper.elapsedTime}
        remainingFlags={minesweeper.remainingFlags}
      />
      <Board
        status={minesweeper.status}
        board={minesweeper.board}
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    timerCallback: () => dispatch(tickTimer()),
    startGame: (options: StartGameActionOptions) => dispatch(startGame(options)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameView)
