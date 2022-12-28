import { GameStatus } from 'minesweeper-redux'
import styles from './Header.module.css'

export interface GameHeaderProps {
  status: GameStatus
  elapsedTime: number
  remainingFlags: number
}

function GameHeader({ status, elapsedTime, remainingFlags }: GameHeaderProps) {
  const formatTime = (milliseconds: number, timeFormat: 'minutes' | 'seconds') => {
    const _val = timeFormat === 'minutes' ? Math.trunc(milliseconds / 60) : milliseconds % 60
    return _val > 9 ? `${_val}` : `0${_val}`
  }

  const content =
    status !== 'running' ? (
      <></>
    ) : (
      <div className={styles.minesweeperHeader}>
        <div className="timer">
          <span className="minutes">{formatTime(elapsedTime, 'minutes')}</span>:
          <span className="seconds">{formatTime(elapsedTime, 'seconds')}</span>
        </div>
        <div className={styles.remainingFlags}>Remaining Flags: {remainingFlags}</div>
      </div>
    )
  return <div className={styles.minesweeperHeader}> {content} </div>
}

export default GameHeader
