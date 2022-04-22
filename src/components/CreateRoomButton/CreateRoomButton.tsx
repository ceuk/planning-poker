import { useAppSelector } from '@/state/hooks'
import humanId from 'human-id'
import { useNavigate } from 'react-router-dom'
import styles from './CreateRoomButton.module.scss'

const CreateRoomButton = () => {
  const navigate = useNavigate()
  const cards = useAppSelector(state => state.deck.cards)
  const handleButtonClick = () => {
    const roomId = humanId('-')
    localStorage.setItem('R', roomId)
    navigate(`/room/${roomId}`)
  }

  if (cards.length) {
    return (
      <button
        className={styles.submitButton}
        onClick={handleButtonClick}
      >
        <b>Create Room</b>
      </button>
    )
  }

  return null
}

export default CreateRoomButton
