import { GameStatus, IMinesweeper } from 'minesweeper-redux'

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

  if (status === GameStatus.Running) {
    return (
      <div id="minesweeper-header">
        <div id="timer">
          <span id="minutes">{formatTime(elapsedTime, 'minutes')}</span>:
          <span id="seconds">{formatTime(elapsedTime, 'seconds')}</span>
        </div>
        <div id="remaining-flags">Remaining Flags: {remainingFlags}</div>
      </div>
    )
  } else {
    return <div id="minesweeper-header" />
  }
}

export default GameHeader
