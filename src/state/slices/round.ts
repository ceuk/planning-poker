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
  status: RoundStatus,
  votes: Record<string, string>,
}

type Reducers = MapReducerPayloads<RoundState, {
  updateStatus: RoundStatus
  castVote: { id: string, vote: string }
  reset: void
}>

const initialState: RoundState = {
  status: RoundStatus.VOTING,
  votes: {}
}

export const roundSlice = createSlice<RoundState, Reducers>({
  name: 'round',
  initialState,
  reducers: {
    updateStatus: (state, { payload }) => {
      state.status = payload
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
  castVote,
  reset
} = roundSlice.actions

function * broadcastUpdateSaga(action: PayloadAction<any>) {
  const owner: boolean = yield select(state => state.room.owner)
  if (action.payload?.id === Room.MyID || (!action.payload?.id && owner) || (action.type === 'rount/castVote' && action.payload?.id && action.payload?.id !== Room.MyID)) {
    yield call(Room.Broadcast, action)
  }
}

export function * roundSaga() {
  yield takeLatest(updateStatus, broadcastUpdateSaga)
  yield takeLatest(castVote, broadcastUpdateSaga)
  yield takeLatest(reset, broadcastUpdateSaga)
}

export default roundSlice.reducer
