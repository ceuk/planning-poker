import { Link } from 'react-router-dom'
import styles from './Nav.module.scss'

const Nav = () => (
  <nav className={styles.nav}>
    <Link to="/" className={styles.logo}>
      <h2 className={styles.title}>
        Planning Poker
      </h2>
    </Link>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/docs">Docs</Link></li>
      <li><a title="View source code on GitHub" href="https://github.com/ceuk/planning-poker/" target="_blank" rel="noreferrer">GitHub ↗</a></li>
    </ul>
  </nav>
)

export default Nav
