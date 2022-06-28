import { ChangeEvent, KeyboardEvent, ChangeEventHandler, useState } from 'react'
import Nav from '@/components/Nav/Nav'
import { useAppDispatch } from '@/state/hooks'
import { updateUserName } from '@/state/slices/user'
import styles from './NameInput.module.scss'

const NameInput = () => {
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState('')
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && dispatch(updateUserName(inputValue))
  const handleButtonClick = () => dispatch(updateUserName(inputValue))
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value)
  }
  return (
    <>
      <header>
        <Nav />
        <h1 id="heading" data-testid="page-title">Enter your name:</h1>
        <section className={styles.container}>
          <input
            autoFocus
            type="text"
            aria-labelledby="heading"
            className={styles.input}
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
            value={inputValue}
          />
          <button
            disabled={inputValue.length < 1}
            className={styles.button}
            onClick={handleButtonClick}
          >
            Confirm Name
          </button>
        </section>
      </header>
    </>
  )
}

export default NameInput
