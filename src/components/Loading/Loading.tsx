import styles from './Loading.module.scss'

const Loading = () => (
  <div className={styles.root}>
    <div className={styles.card}>
      <div className={styles.cardFront}>5</div>
      <div className={styles.cardBack} />
    </div>
    <h1 className={styles.heading}>Connecting&hellip;</h1>
  </div>
)

export default Loading
