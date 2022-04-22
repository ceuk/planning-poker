import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { all, fork } from 'redux-saga/effects'
import userReducer, { userSaga } from '@/state/slices/user'
import roomReducer, { roomSaga } from '@/state/slices/room'
import roundReducer, { roundSaga } from '@/state/slices/round'
import deckReducer, { deckSaga } from '@/state/slices/deck'

const sagaMiddleware = createSagaMiddleware()
function * rootSaga() {
  yield all([
    fork(roomSaga),
    fork(roundSaga),
    fork(deckSaga),
    fork(userSaga)
  ])
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    round: roundReducer,
    deck: deckReducer
  },
  middleware: [logger, sagaMiddleware],
  devTools: process.env.NODE_ENV !== 'production'
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
