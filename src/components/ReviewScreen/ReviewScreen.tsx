import { useAppSelector } from '@/state/hooks'
import Nav from '../Nav/Nav'
import ResetRoundButton from '../ResetRoundButton/ResetRoundButton'
import styles from './ReviewScreen.module.scss'

const ReviewScreen = () => {
  const players = useAppSelector(state => state.room.players)
  const votes = useAppSelector(state => state.round.votes)
  const mostCommon = mode(Object.values(votes))
  return (
    <header className={styles.root}>
      <Nav />
      <h1>Voting Results</h1>
      <h2>Most Common: {mostCommon}</h2>
      <table className={styles.table}>
        <tbody>
          {players.map(player => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{votes[player.id] || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ResetRoundButton />
    </header>
  )
}

function mode(arr: string[]) {
  return arr.slice(0).sort((a, b) =>
    arr.filter(v => v === a).length -
        arr.filter(v => v === b).length
  ).pop()
}

export default ReviewScreen
