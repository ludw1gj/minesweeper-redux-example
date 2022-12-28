import {
  difficulties,
  startGame,
  revealCell,
  toggleFlag,
  undoLoosingMove,
  tickTimer,
  Minesweeper,
  StartGameActionOptions,
  StartGameAction,
  Coordinate,
} from 'minesweeper-redux'
import { connect, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import Board from './Board'
import Footer from './Footer'
import Header from './Header'
import styles from './GameView.module.css'

export interface GameViewProps {
  minesweeper: Minesweeper
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

  const onLeftClick = (e: React.MouseEvent, coordinate: Coordinate) => {
    e.preventDefault()
    dispatch(revealCell({ coordinate }))
  }

  const onRightClick = (e: React.MouseEvent, coordinate: Coordinate) => {
    e.preventDefault()
    dispatch(toggleFlag({ coordinate }))
  }

  const onUndoMove = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(undoLoosingMove())
  }

  return (
    <div className={styles.minesweeperInterface}>
      <Header
        status={minesweeper.status}
        elapsedTime={minesweeper.elapsedTime}
        remainingFlags={minesweeper.remainingFlags}
      />
      <Board
        status={minesweeper.status}
        grid={minesweeper.grid}
        startNewGame={startNewGame}
        onLeftClick={onLeftClick}
        onRightClick={onRightClick}
      />
      <Footer gameStatus={minesweeper.status} onUndoMove={onUndoMove} startNewGame={startNewGame} />
    </div>
  )
}

const mapStateToProps = (state: { minesweeper: Minesweeper }) => {
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
