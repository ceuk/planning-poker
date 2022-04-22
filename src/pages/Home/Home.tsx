import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import Nav from '@/components/Nav/Nav'
import styles from './Home.module.scss'

const HomePage = () => {
  const navigate = useNavigate()
  const [inputCode, setInputCode] = useState('')
  const isCodeValid = inputCode && inputCode.match(/^[A-Z][a-z]+-[A-Z][a-z]+-[A-Z][a-z]+$/)
  const joinButtonStyles = classNames(
    styles.joinButton,
    { [styles.joinButtonVisible]: isCodeValid })
  const joinRoom = () => {
    if (isCodeValid) {
      navigate(`/room/${inputCode}`)
    }
  }
  return (
    <header className={styles.container}>
      <Nav />
      <img className={styles.cards} src="/cards.png" />
      <h1 className={styles.heading} data-testid="page-title">Online Planning Poker</h1>
      <p className={styles.subtitle}>Consensus-based group estimating for agile teams.</p>
      <p><Link className={styles.createButton} to="/create-room">Start a planning session</Link></p>
      <p className={styles.or}><em>- or -</em></p>
      <label className={styles.codeInputLabel} htmlFor="room-code-input">Enter a room code:</label>
      <input id="room-code-input" placeholder="e.g. Big-Hairy-Badgers" className={styles.codeInput} type="text" value={inputCode} onChange={e => setInputCode(e.target.value)}/>
      <button className={joinButtonStyles} onClick={joinRoom}>Join Game</button>
    </header>
  )
}

export default HomePage
