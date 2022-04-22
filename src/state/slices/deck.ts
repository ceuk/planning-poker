import { createSlice } from '@reduxjs/toolkit'
import { call, takeLatest, delay } from 'redux-saga/effects'
import { MapReducerPayloads } from '@/state/utils'

export interface Deck {
  label: string
  lowCards: string[]
  highCards: string[]
}

interface DeckState {
  cards: string[]
  selectedDeck?: Deck
  cardInputValue: string
  useCustom: boolean
}

type Reducers = MapReducerPayloads<DeckState, {
  updateCardInput: string
  clearCardInput: void
  addCard: void
  removeCard: number
  updateCard: {
    card: string
    index: number
  }
  selectCards: string[]
  selectDeck: Deck
  selectCustom: void
}>

const initialState: DeckState = {
  cards: [],
  cardInputValue: '',
  useCustom: false
}

export const deckSlice = createSlice<DeckState, Reducers>({
  name: 'room',
  initialState,
  reducers: {
    addCard: (state) => {
      if (state.cardInputValue) {
        state.cards.push(state.cardInputValue)
        state.cardInputValue = ''
      }
    },
    removeCard: (state, { payload }) => {
      state.cards.splice(payload, 1)
    },
    updateCard: (state, { payload: { card, index } }) => {
      state.cards[index] = card
    },
    updateCardInput: (state, { payload }) => {
      state.cardInputValue = payload
    },
    clearCardInput: (state) => {
      state.cardInputValue = ''
    },
    selectCards: (state, { payload }) => {
      state.cards = payload
    },
    selectDeck: (state, { payload }) => {
      state.cards = []
      state.selectedDeck = payload
      state.useCustom = false
    },
    selectCustom: (state) => {
      state.cards = []
      delete state.selectedDeck
      state.useCustom = true
    }
  }
})

export const {
  addCard,
  updateCard,
  selectCards,
  selectDeck,
  selectCustom,
  updateCardInput,
  clearCardInput,
  removeCard
} = deckSlice.actions

function * scrollToBottom() {
  if (window.innerWidth <= 640) {
    yield delay(1)
    const scrollTo = document.body.scrollHeight
    yield call(<any>window.scroll, { behavior: 'smooth', top: scrollTo })
  }
}

export function * deckSaga() {
  yield takeLatest([
    selectCards,
    selectDeck,
    selectCustom,
    addCard
  ],
  scrollToBottom)
}

export default deckSlice.reducer
