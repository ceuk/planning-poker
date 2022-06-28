import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MapReducerPayloads } from '@/state/utils'
import { call, takeLatest } from 'redux-saga/effects'

interface UserState {
  name?: string
}

type Reducers = MapReducerPayloads<UserState, {
  updateUserName: string
  removeUserName: void
}>

const initialState: UserState = { }

export const userSlice = createSlice<UserState, Reducers>({
  name: 'user',
  initialState,
  reducers: {
    updateUserName: (state, { payload }) => {
      state.name = payload
    },
    removeUserName: (state) => {
      delete state.name
    }

  }
})

function * updateUserNameSaga({ payload }: PayloadAction<string>) {
  yield call([localStorage, localStorage.setItem], 'N', payload)
}

function * removeUserNameSaga() {
  yield call([localStorage, localStorage.removeItem], 'N')
}

export function * userSaga() {
  yield takeLatest(updateUserName, updateUserNameSaga)
  yield takeLatest(removeUserName, removeUserNameSaga)
}

export const {
  updateUserName,
  removeUserName
} = userSlice.actions

export default userSlice.reducer
