import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MapReducerPayloads } from '@/state/utils'
import { call, takeLatest } from 'redux-saga/effects'

interface UserState {
  name?: string
}

type Reducers = MapReducerPayloads<UserState, {
  updateUserName: string
}>

const initialState: UserState = { }

export const userSlice = createSlice<UserState, Reducers>({
  name: 'user',
  initialState,
  reducers: {
    updateUserName: (state, { payload }) => {
      state.name = payload
    }
  }
})

function * updateUserNameSaga({ payload }: PayloadAction<string>) {
  yield call([localStorage, localStorage.setItem], 'N', payload)
}

export function * userSaga() {
  yield takeLatest(updateUserName, updateUserNameSaga)
}

export const {
  updateUserName
} = userSlice.actions

export default userSlice.reducer
