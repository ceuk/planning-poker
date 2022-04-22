import { FC } from 'react'
import classNames from 'classnames'
import styles from './VotingCard.module.scss'
import { useAppDispatch } from '@/state/hooks'
import { castVote } from '@/state/slices/round'
import Room from '@/services/Room/Room'

interface VotingCardProps {
  value: string
  votedValue?: string
}

const VotingCard: FC<VotingCardProps> = ({ value, votedValue }) => {
  const dispatch = useAppDispatch()
  const picked = votedValue && votedValue === value
  const classes = classNames(styles.root, { [styles.picked]: picked })
  const handleClick = () => {
    if (!picked && Room.MyID) {
      dispatch(castVote({ vote: value, id: Room.MyID }))
    }
  }
  return <div onClick={handleClick} className={classes}>{value}</div>
}

export default VotingCard
