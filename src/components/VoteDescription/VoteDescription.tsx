/* eslint-disable xss/no-mixed-html */
import styles from './VoteDescription.module.scss'
import { useAppSelector } from '@/state/hooks'

const VoteDescription = () => {
  const description = useAppSelector(state => state.round.description)
  const isOwner = useAppSelector(state => state.room.owner)
  return !isOwner
    ? (
      <div className={styles.root} dangerouslySetInnerHTML={{ __html: description }} />
    )
    : null
}

export default VoteDescription
