import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/state/store'
import { selectCards } from '@/state/slices/deck'
import { useEffect } from 'react'
import Room from '@/services/Room/Room'

export const useRoom = () => {
  const dispatch = useAppDispatch()
  const roomState = useAppSelector(state => state.room)

  useEffect(() => {
    Room.Dispatch = dispatch
    return () => {
      Room.Dispatch = null
    }
  })

  return roomState
}

export const useLoadCards = (roomId: string): string[] => {
  const stateCards = useAppSelector(state => state.deck.cards)
  const dispatch = useAppDispatch()
  if (stateCards.length) {
    return stateCards
  }
  const cachedCards = localStorage.getItem('C')
  if (cachedCards) {
    const cards = JSON.parse(cachedCards)
    if (cards[0] === roomId) {
      dispatch(selectCards(cards[1]))
      return cards[1]
    }
  }
  return []
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
