import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { RoundStatus, updateStatus } from '@/state/slices/round'
import styles from './EndVotingButton.module.scss'

const EndVotingButton = () => {
  const dispatch = useAppDispatch()
  const voteCount = useAppSelector(state => Object.keys(state.round.votes).length)
  const isOwner = useAppSelector(state => state.room.owner)

  if (voteCount > 0 && isOwner) {
    return (
      <button
        className={styles.button}
        onClick={() => dispatch(updateStatus(RoundStatus.VIEWING))}
      >
        <b>End Voting</b>
      </button>
    )
  }

  return null
}

export default EndVotingButton
