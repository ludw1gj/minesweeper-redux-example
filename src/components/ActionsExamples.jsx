import {
  createDifficultyLevel,
  getLoadableGameState,
  createCoordinate,
  startGame,
  loadGame,
  revealCell,
  toggleFlag,
  undoLoosingMove,
  tickTimer,
  difficulties,
} from 'minesweeper-redux';
import { connect } from 'react-redux';

function ActionsExamples(props) {
  /** Start a minesweeper game. */
  const startGameExample = () => {
    // function that will be called every second. In this case we want to call tickTimer().
    const timerCallback = () => {
      props.tickTimer();
    };
    const myRandSeed = Math.random(); // value which seeds the random number generator.
    const myDifficulty = difficulties.easy; // .easy .medium .hard

    props.startGame({
      timerCallback: timerCallback, // is optional
      randSeed: myRandSeed,
      difficulty: myDifficulty,
    });
  };

  /** Start a minesweeper game with a custom difficulty. */
  const startGameCustomDifficultyExample = () => {
    // function that will be called every second. In this case we want to call tickTimer().
    const timerCallback = () => {
      props.tickTimer();
    };
    const myRandSeed = Math.random(); // value which seeds the random number generator.
    const myCustomDifficulty = createDifficultyLevel(4, 4, 2);

    props.startGame({
      timerCallback: timerCallback, // is optional
      randSeed: myRandSeed,
      difficulty: myCustomDifficulty,
    });
  };

  /** Load a game from given loadable game state. */
  const loadGameExample = () => {
    // function that will be called every second. In this case we want to call tickTimer().
    const myTimerCallback = () => {
      props.tickTimer();
    };
    // serialize a loadable game state from the current game state.
    const loadableGameState = getLoadableGameState(props.minesweeper);

    props.loadGame({
      timerCallback: myTimerCallback, // is optional
      gameState: loadableGameState,
    });
  };

  /** Make cell visible at the given coordinate. */
  const revealCellExample = () => {
    const myCoordinate = createCoordinate(2, 1);
    props.revealCell({ coordinate: myCoordinate });
  };

  /** Toggle the flag value of cell at the given coordinate. */
  const toggleCellExample = () => {
    const myCoordinate = createCoordinate(2, 1);
    props.toggleCell({ coordinate: myCoordinate });
  };

  /** Load the previous state before the game was lost. */
  const undoLoosingMoveExample = () => {
    props.undoLoosingMove();
  };

  return null;
}

const mapStateToProps = state => {
  return {
    minesweeper: state.minesweeper,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startGame: options => dispatch(startGame(options)),
    loadGame: options => dispatch(loadGame(options)),
    revealCell: options => dispatch(revealCell(options)),
    toggleFlag: options => dispatch(toggleFlag(options)),
    undoLoosingMove: () => dispatch(undoLoosingMove()),
    tickTimer: () => dispatch(tickTimer()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionsExamples);
