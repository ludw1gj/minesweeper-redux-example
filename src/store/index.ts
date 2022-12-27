import { configureStore } from '@reduxjs/toolkit'
import { gameReducer } from 'minesweeper-redux'

const store = configureStore({
  reducer: {
    minesweeper: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
