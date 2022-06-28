import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { RoundStatus, updateStatus } from '@/state/slices/round'
import styles from './EndVotingButton.module.scss'

const EndVotingButton = () => {
  const dispatch = useAppDispatch()
  const voteCount = useAppSelector(state => Object.keys(state.round.votes).length)

  return (
    <button
      className={styles.button}
      disabled={voteCount < 1}
      onClick={() => dispatch(updateStatus(RoundStatus.VIEWING))}
    >
      <b>End Voting</b>
    </button>
  )
}

export default EndVotingButton
