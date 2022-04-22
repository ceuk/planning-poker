import { FC, PropsWithChildren } from 'react'
import styles from './List.module.scss'

interface ListProps {
  title?: string;
}

const List: FC<PropsWithChildren<ListProps>> = ({ children, title }) => (
  <div className={styles.root}>
    {title && <h2>{title}</h2>}
    {children}
  </div>
)

export default List
