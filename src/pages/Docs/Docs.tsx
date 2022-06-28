import { Link } from 'react-router-dom'
import Nav from '@/components/Nav/Nav'
import styles from './Docs.module.scss'

const Docs = () => {
  return (
    <article>
      <header>
        <Nav />
        <span className={styles.helpIcon}>?</span>
        <h1 className={styles.heading}>Help &amp; FAQs</h1>
      </header>
      <main className={styles.container}>
        <details>
          <summary>How do I create a game?</summary>
          <ul>
            <li>From the <Link to="/">Home Page</Link> click the <Link to="/create-room">Start a planning session</Link> button</li>
            <li>Select a deck from the list (or choose the <b>Create your own</b> option)</li>
          </ul>
          <h5>Using a pre-built deck</h5>
          <ul>
            <li>Decide whether you want to use the whole deck or just the smaller/larger value cards</li>
            <li>Click the <b>Create Room</b> button to create your game</li>
          </ul>
          <h5>Creating your own deck</h5>
          <ul>
            <li>Type in a value for a card, and press <code>enter</code> to add (You can click a card to delete it.)</li>
            <li>When you are done, click the <b>Create Room</b> button to create your game</li>
          </ul>
        </details>
        <details>
          <summary>How do I invite people to my game?</summary>
          <p>Once you have created a game you will be given a three-word code (e.g. <i>Birds-Fly-Gracefully</i>)</p>
          <p>Either share this code with people you want to invite or just copy the URL of the page and send them the link</p>
        </details>
        <details>
          <summary>How do I join someone else&apos;s game?</summary>
          <p>Either click the link they have shared with you, or type in the code they give you into the box on the <Link to="/">Home Page</Link></p>
        </details>
        <details>
          <summary>How do I know when everyone has voted?</summary>
          <p>When a player has voted the circle next to their name will turn from black, to green:</p>
          <img src="/help_voting_status.png" />
        </details>
        <details>
          <summary>What do I do if something doesn&apos;t work?</summary>
          <ul>
            <li>Check you are using the latest version of a modern browser such as Chrome or Firefox</li>
            <li>Make sure you haven&apos;t disabled WebRTC in your browser settings or via an extension</li>
            <li>Try restart/remake the game</li>
            <li>Raise a issue on <a title="View source code on GitHub" href="https://github.com/ceuk/planning-poker/" target="_blank" rel="noreferrer">GitHub ↗</a>
            </li>
          </ul>
        </details>
      </main>
    </article>
  )
}

export default Docs
