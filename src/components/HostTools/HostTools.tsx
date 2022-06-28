import { PropsWithChildren } from 'react'
import { useAppSelector } from '@/state/hooks'
import styles from './HostTools.module.scss'

const HostTools = ({ children }: PropsWithChildren<{}>) => {
  const isOwner = useAppSelector(state => state.room.owner)
  return isOwner
    ? (
      <div className={styles.root}>
        <h3>Host Tools</h3>
        {children}
      </div>
    )
    : null
}

export default HostTools
