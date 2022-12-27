import { GameStatus, IMinesweeper } from 'minesweeper-redux'

export interface GameHeaderProps {
  gameState: IMinesweeper
}

function GameHeader({ gameState }: GameHeaderProps) {
  const formatTime = (milliseconds: number, timeFormat: 'minutes' | 'seconds') => {
    const _val = timeFormat ? Math.trunc(milliseconds / 60) : milliseconds % 60
    return _val > 9 ? `${_val}` : `0${_val}`
  }

  if (gameState.status === GameStatus.Running) {
    return (
      <div id="minesweeper-header">
        <div id="timer">
          <span id="minutes">{formatTime(gameState.elapsedTime, 'minutes')}</span>:
          <span id="seconds">{formatTime(gameState.elapsedTime, 'seconds')}</span>
        </div>
        <div id="remaining-flags">Remaining Flags: {gameState.remainingFlags}</div>
      </div>
    )
  } else {
    return <div id="minesweeper-header" />
  }
}

export default GameHeader
