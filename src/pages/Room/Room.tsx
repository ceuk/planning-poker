import { useEffect } from 'react'
import { leaveRoom, loadRoom } from '@/state/slices/room'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector, useLoadCards, useRoom } from '@/state/hooks'
import withNameInput from './withNameInput'
import Loading from '@/components/Loading/Loading'
import ReviewScreen from '@/components/ReviewScreen/ReviewScreen'
import VoteScreen from '@/components/VoteScreen/VoteScreen'
import Nav from '@/components/Nav/Nav'
import styles from './Room.module.scss'
import { RoundStatus } from '@/state/slices/round'

const views = {
  [RoundStatus.VIEWING]: ReviewScreen,
  [RoundStatus.VOTING]: VoteScreen
}

const RoomPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { roomId: urlRoomId } = useParams()
  const { id: roomId, owner, connections, connected } = useRoom()
  const roundStatus = useAppSelector(state => state.round.status)
  useLoadCards(urlRoomId!)

  const roomLoaded = roomId === urlRoomId
  const roomValid = urlRoomId!.match(/^[A-Z][a-z]+-[A-Z][a-z]+-[A-Z][a-z]+$/)
  const noClients = owner && !Object.keys(connections).length
  const loading = !roomLoaded || !connected

  useEffect(() => {
    if (!roomValid) {
      dispatch(leaveRoom())
      navigate('/')
    } else if (!roomLoaded) {
      dispatch(loadRoom(urlRoomId!))
    }
  }, [urlRoomId, roomValid])

  if (loading) {
    return <Loading />
  }

  if (noClients) {
    return (
      <header>
        <Nav />
        <h1 data-testid="page-title">Share your room invite!</h1>
        <p>Share a link to this page with others or give them the room name: <mark className={styles.roomLink}>{roomId}</mark></p>
      </header>
    )
  }

  const View = views[roundStatus]
  return <View />
}

export default withNameInput(RoomPage)
