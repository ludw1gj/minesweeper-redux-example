import { createStore, combineReducers } from 'redux';
import { gameReducer } from 'minesweeper-redux';

const reducers = combineReducers({
  minesweeper: gameReducer,
});

const store = createStore(reducers);

export default store;
