import { GameStatus } from 'minesweeper-redux'
import { MouseEventHandler } from 'react'
import styles from './Footer.module.css'

interface FooterProps {
  gameStatus: GameStatus
  onUndoMove: MouseEventHandler
  startNewGame: MouseEventHandler
}

function Footer({ gameStatus, onUndoMove, startNewGame }: FooterProps) {
  const button = () => {
    switch (gameStatus) {
      case 'loss':
        return (
          <>
            <button className={styles.actionButton} onClick={onUndoMove}>
              Undo move
            </button>
            <button className={styles.actionButton} onClick={startNewGame}>
              New Game
            </button>
          </>
        )
      case 'win':
        return (
          <button className={styles.actionButton} onClick={startNewGame}>
            New Game
          </button>
        )
      default:
        return <></>
    }
  }
  return <div className={styles.minesweeperFooter}>{button()}</div>
}

export default Footer
