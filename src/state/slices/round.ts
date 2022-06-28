/* eslint-disable no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MapReducerPayloads } from '@/state/utils'
import { call, takeLatest, select } from 'redux-saga/effects'
import Room from '@/services/Room/Room'

export const enum RoundStatus {
  VOTING = 'voting',
  VIEWING = 'viewing'
}

interface RoundState {
  status: RoundStatus
  description: string
  votes: Record<string, string>
}

type Reducers = MapReducerPayloads<RoundState, {
  updateStatus: RoundStatus
  updateDescription: string
  castVote: { id: string, vote: string }
  reset: void
}>

const initialState: RoundState = {
  status: RoundStatus.VOTING,
  description: '',
  votes: {}
}

export const roundSlice = createSlice<RoundState, Reducers>({
  name: 'round',
  initialState,
  reducers: {
    updateStatus: (state, { payload }) => {
      state.status = payload
    },
    updateDescription: (state, { payload }) => {
      state.description = payload
    },
    castVote: (state, { payload }) => {
      state.votes[payload.id] = payload.vote
    },
    reset: () => {
      return initialState
    }
  }
})

export const {
  updateStatus,
  updateDescription,
  castVote,
  reset
} = roundSlice.actions

function * broadcastOwnerUpdatesSaga(action: PayloadAction<any>) {
  const owner: boolean = yield select(state => state.room.owner)
  if (owner) {
    yield call(Room.Broadcast, action)
  }
}

function * propogateUpdatesSaga(action: PayloadAction<any>) {
  const owner: boolean = yield select(state => state.room.owner)
  const isMyAction = action.payload?.id === Room.MyID
  if (isMyAction || owner) {
    yield call(Room.Broadcast, action)
  }
}

export function * roundSaga() {
  yield takeLatest(updateStatus, propogateUpdatesSaga)
  yield takeLatest(castVote, propogateUpdatesSaga)
  yield takeLatest(updateDescription, broadcastOwnerUpdatesSaga)
  yield takeLatest(reset, broadcastOwnerUpdatesSaga)
}

export default roundSlice.reducer
