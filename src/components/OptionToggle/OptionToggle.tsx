import styles from './OptionToggle.module.scss'
import { useAppDispatch } from '@/state/hooks'
import { toggleOptions } from '@/state/slices/room'

const OptionToggle = () => {
  const dispatch = useAppDispatch()
  const handleClick = () => dispatch(toggleOptions())
  return (
    <button onClick={handleClick} title="Toggle Options" className={styles.root}>⚙️</button>
  )
}

export default OptionToggle
