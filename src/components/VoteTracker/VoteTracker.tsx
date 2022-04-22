import styles from './VoteTracker.module.scss'
import classNames from 'classnames'
import { useAppSelector } from '@/state/hooks'

const VoteTracker = () => {
  const players = useAppSelector(state => state.room.players)
  const votes = useAppSelector(state => state.round.votes)
  return (
    <div className={styles.root}>
      <h3 className={styles.heading}>Voting&hellip;</h3>
      <ul className={styles.list}>
        {players.map(player => (
          <li className={styles.row} key={player.id}>
            <span
              className={classNames(
                styles.indicator,
                { [styles.voted]: !!votes[player.id] }
              )}
            />
            <span className={styles.playerName}>{player.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VoteTracker
