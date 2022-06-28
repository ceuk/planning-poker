import { ChangeEvent } from 'react'
import List from '@/components/List/List'
import OptionCard from '@/components/OptionCard/OptionCard'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { selectCards } from '@/state/slices/deck'

const SizeOptionList = () => {
  const dispatch = useAppDispatch()
  const selectedCards = useAppSelector(state => state.deck.cards)
  const { highCards, lowCards } = useAppSelector(state => state.deck.selectedDeck!)
  const handleChange = (cards: string[]) => (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(selectCards(cards))
    }
  }
  return (
    <List title="Value Sizes:">
      <OptionCard
        onChange={handleChange(lowCards)}
        name="cards"
        value="lowCards"
        label="Small Values"
        hint={`e.g. ${lowCards.slice(0, 5).join(', ')}`}
        checked={selectedCards === lowCards}
      />
      <OptionCard
        onChange={handleChange(highCards)}
        name="cards"
        value="highCards"
        label="Larger Values"
        hint={`e.g. ${highCards.slice(0, 5).join(', ')}`}
        checked={selectedCards === highCards}
      />
      <OptionCard
        onChange={handleChange(lowCards.concat(highCards))}
        name="cards"
        value="allCards"
        label="All Values"
        hint="Useful if you are estimating a mix of stories and epics"
      />
    </List>
  )
}

export default SizeOptionList
