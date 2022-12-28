import GameView from './components/GameView'
import styles from './App.module.css'
import './index.css'

/** The main component. */
const App = () => {
  return (
    <div className={styles.wrapper}>
      <GameView />
    </div>
  )
}

export default App
