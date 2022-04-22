import Nav from '@/components/Nav/Nav'
import { useAppDispatch } from '@/state/hooks'
import { updateUserName } from '@/state/slices/user'
import { ChangeEventHandler, useState } from 'react'
import styles from './NameInput.module.scss'

const NameInput = () => {
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState('')
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
            value={inputValue}
          />
          <button
            disabled={inputValue.length < 1}
            className={styles.button}
            onClick={() => dispatch(updateUserName(inputValue))}
          >
            Confirm Name
          </button>
        </section>
      </header>
    </>
  )
}

export default NameInput
