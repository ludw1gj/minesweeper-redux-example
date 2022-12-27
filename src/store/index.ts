import { configureStore } from '@reduxjs/toolkit'
import { gameReducer } from 'minesweeper-redux'

const store = configureStore({
  reducer: {
    minesweeper: gameReducer,
  },
})

export default store
