import { call, takeLatest, select, put } from 'redux-saga/effects'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MapReducerPayloads } from '@/state/utils'
import Room from '@/services/Room/Room'
import { selectCards } from '@/state/slices/deck'
import { toast } from 'react-toastify'

interface RoomState {
  id: string | null
  owner?: boolean
  connections: Record<string, string>
  connected: boolean
  createRoomError: boolean
  joinRoomError: boolean
  hostName: string
  players: {name: string, id: string}[]
  optionsVisible: boolean
}

type Reducers = MapReducerPayloads<RoomState, {
  createRoom: string
  joinRoom: string
  createRoomError: Error
  joinRoomError: Error
  loadRoom: string
  addConnection: { id: string, name: string }
  removeConnection: { id: string, name: string }
  updateConnectionStatus: boolean
  updateConnections: Record<string, string>
  updateHostName: string
  leaveRoom: void
  toggleOptions: void
}>

const initialState: RoomState = {
  id: null,
  connections: {},
  connected: false,
  createRoomError: false,
  joinRoomError: false,
  hostName: '',
  players: [],
  optionsVisible: false
}

export const roomSlice = createSlice<RoomState, Reducers>({
  name: 'room',
  initialState,
  reducers: {
    createRoom: (state, { payload }) => {
      state.id = payload
      state.owner = true
      state.players = buildPlayerList(state)
    },
    createRoomError: (state) => {
      state.createRoomError = true
    },
    joinRoom: (state, { payload }) => {
      state.id = payload
      state.owner = false
      state.players = buildPlayerList(state)
    },
    joinRoomError: (state) => {
      state.joinRoomError = true
    },
    loadRoom: () => {},
    updateConnectionStatus: (state, { payload: connected }) => {
      state.connected = connected
      if (connected) {
        state.createRoomError = false
        state.joinRoomError = false
      }
    },
    addConnection: (state, { payload }) => {
      state.connections[payload.id] = payload.name
      state.players = buildPlayerList(state)
    },
    removeConnection: (state, { payload }) => {
      delete state.connections[payload.id]
      state.players = buildPlayerList(state)
    },
    updateConnections: (state, { payload }) => {
      state.connections = payload
      state.players = buildPlayerList(state)
    },
    updateHostName: (state, { payload }) => {
      state.hostName = payload
      state.players = buildPlayerList(state)
    },
    toggleOptions: (state) => {
      state.optionsVisible = !state.optionsVisible
    },
    leaveRoom: () => {
      return initialState
    }
  }
})

export const {
  createRoom,
  createRoomError,
  joinRoom,
  joinRoomError,
  loadRoom,
  addConnection,
  removeConnection,
  toggleOptions,
  updateConnectionStatus,
  updateConnections,
  leaveRoom,
  updateHostName
} = roomSlice.actions

function buildPlayerList(state: RoomState) {
  const host = {
    id: state.id!,
    name: state.owner ? 'You (Host)' : `${state.hostName} (Host)`
  }
  const players = [host]
  const otherPlayers = Object.entries(state.connections).map(([id, name]) => ({ id, name }))
  if (!state.owner) {
    players.push({ name: 'You', id: Room.MyID! })
  }
  return players.concat(otherPlayers)
}

function * loadRoomSaga({ payload: roomId }: PayloadAction<string>) {
  const ownedRoomId: string = yield call([localStorage, localStorage.getItem], 'R')
  if (ownedRoomId === roomId) {
    yield put(createRoom(roomId))
  } else {
    yield put(joinRoom(roomId))
  }
}

function * createRoomSaga({ payload: roomId }: PayloadAction<string>) {
  const cards: string[] = yield select(state => state.deck.cards)
  const userName: string = yield select(state => state.user.name)
  if (cards.length) {
    yield call([localStorage, localStorage.setItem], 'C', JSON.stringify([roomId, cards]))
  }
  yield call([localStorage, localStorage.setItem], 'R', roomId)
  yield call(Room.Create, roomId, userName)
}

function * joinRoomSaga({ payload: roomId }: PayloadAction<string>) {
  const userName: string = yield select(state => state.user.name)
  yield call(Room.Join, roomId, userName)
}

function * leaveRoomSaga() {
  yield call([localStorage, localStorage.removeItem], 'R')
  yield call([localStorage, localStorage.removeItem], 'C')
}

function * addConnectionSaga({ payload }: PayloadAction<{id: string, name: string}>) {
  const cards: string[] = yield select(state => state.deck.cards)
  const userName: string = yield select(state => state.user.name)
  const { [payload.id]: _, ...connections } : Record<string, string> = yield select(state => state.room.connections)
  const updateCardsAction: PayloadAction<string[]> = yield call(selectCards, cards)
  const updateHostNameAction: PayloadAction<string> = yield call(updateHostName, userName)
  const updateConnectionsAction: PayloadAction<Record<string, string>> = yield call(updateConnections, connections)
  yield call(Room.DispatchToClient, payload.id, updateCardsAction)
  yield call(Room.DispatchToClient, payload.id, updateHostNameAction)
  yield call(Room.DispatchToClient, payload.id, updateConnectionsAction)
  yield call(toast, `${payload.name} joined`)
}

function * removeConnectionSaga({ payload }: PayloadAction<{id: string, name: string}>) {
  yield call(toast, `${payload.name} left`)
}

export function * roomSaga() {
  yield takeLatest(loadRoom, loadRoomSaga)
  yield takeLatest(createRoom, createRoomSaga)
  yield takeLatest(joinRoom, joinRoomSaga)
  yield takeLatest(leaveRoom, leaveRoomSaga)
  yield takeLatest(addConnection, addConnectionSaga)
  yield takeLatest(removeConnection, removeConnectionSaga)
}

export default roomSlice.reducer
