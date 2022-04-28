import classNames from 'classnames'
import { useAppSelector } from '@/state/hooks'
import Nav from '@/components/Nav/Nav'
import styles from './CreateRoom.module.scss'
import SizeOptionList from '@/components/SizeOptionList/SizeOptionList'
import DecksList from '@/components/DecksList/DecksList'
import HideableFormSection from '@/components/HideableFormSection/HideableFormSection'
import CustomCardForm from '@/components/CustomCardForm/CustomCardForm'

const stepStyles = (inactive: boolean) => classNames(
  styles.step,
  { [styles.inactiveStep]: inactive }
)

const CreateRoom = () => {
  const hasSelectedDeck = useAppSelector(state => !!state.deck.selectedDeck)
  const selectedCards = useAppSelector(state => state.deck.cards)
  const useCustom = useAppSelector(state => state.deck.useCustom)

  const deckStepClasses = stepStyles(hasSelectedDeck)
  const cardStepClasses = stepStyles(!!selectedCards)

  return (
    <>
      <header>
        <Nav />
        <h1 data-testid="page-title">Create a Planning Session</h1>
      </header>
      <div className={styles.container}>
        <HideableFormSection
          show={true}
          classes={deckStepClasses}
          button={false}
          render={<DecksList />}
        />
        <HideableFormSection
          show={hasSelectedDeck}
          classes={cardStepClasses}
          render={<SizeOptionList />}
        />
        <HideableFormSection
          show={useCustom}
          classes={cardStepClasses}
          render={<CustomCardForm />}
        />
      </div>
    </>
  )
}

export default CreateRoom
