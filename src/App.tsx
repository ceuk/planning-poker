import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Home from '@/pages/Home/Home'
import Room from '@/pages/Room/Room'
import CreateRoom from '@/pages/CreateRoom/CreateRoom'
import { useAppDispatch } from '@/state/hooks'
import { updateUserName } from './state/slices/user'
import 'react-toastify/dist/ReactToastify.css'
import Docs from './pages/Docs/Docs'

const App = () => {
  const dispatch = useAppDispatch()
  const storedUserName = localStorage.getItem('N')
  if (storedUserName) {
    dispatch(updateUserName(storedUserName))
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/" element={<Home />} />
        <Route element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer
        newestOnTop={true}
        hideProgressBar
        position="bottom-right"
        autoClose={3500}
      />
    </BrowserRouter>
  )
}

export default App
