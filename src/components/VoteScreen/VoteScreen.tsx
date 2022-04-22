import { useAppSelector } from '@/state/hooks'
import Nav from '@/components/Nav/Nav'
import VoteTracker from '@/components/VoteTracker/VoteTracker'
import VotingCard from '@/components/VotingCard/VotingCard'
import Room from '@/services/Room/Room'
import styles from './VoteScreen.module.scss'
import EndVotingButton from '../EndVotingButton/EndVotingButton'

const VoteScreen = () => {
  const cards = useAppSelector(state => state.deck.cards)
  const votedValue = useAppSelector(state => Room.MyID && state.round.votes[Room.MyID])

  return (
    <>
      <header className={styles.root}>
        <Nav />
        <VoteTracker />
        <EndVotingButton />
        <h1 className={styles.heading}>Place your vote</h1>
        <ul className={styles.cards}>
          {cards.map((card, i) => (
            <VotingCard value={card} votedValue={votedValue} key={i} />
          ))}
          <VotingCard value="?" votedValue={votedValue} />
        </ul>
      </header>
    </>
  )
}

export default VoteScreen
