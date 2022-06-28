import classNames from 'classnames'
import { useAppSelector, useAppDispatch } from '@/state/hooks'
import { removeUserName } from '@/state/slices/user'
import OptionToggle from '../OptionToggle/OptionToggle'
import styles from './OptionsPanel.module.scss'

const OptionsPanel = () => {
  const dispatch = useAppDispatch()
  const optionsVisible = useAppSelector(state => state.room.optionsVisible)
  const classes = classNames(
    styles.root,
    { [styles.visible]: optionsVisible }
  )
  return (
    <div className={classes}>
      <OptionToggle />
      <h4>Options</h4>
      <button onClick={() => dispatch(removeUserName())} className={styles.simpleButton}>
        Reset your name
      </button>
    </div>
  )
}

export default OptionsPanel
