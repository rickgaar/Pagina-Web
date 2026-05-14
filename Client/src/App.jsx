import MainPage from './components/MainPage/MainPage'
import Board from './components/Board/Board'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import { Route, Routes } from 'react-router-dom'
import LessonDisplay from './components/LessonDisplay/LessonDisplay'
import Profile from './components/Profile/Profile'
import Exam from './components/Exam/Exam'
import RankingBoard from './components/RankingBoard/RankingBoard'
import Shop from './components/Shop/Shop'

function App() {

  return (
    <Routes>
      <Route path='/' element={<MainPage/>} />
      <Route path='/board' element={<Board />} />
      <Route path='/lesson/:lessonID' element={<LessonDisplay />} />
      <Route path='/exam/:examID' element={<Exam />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/ranking' element={<RankingBoard />} />
      <Route path='/shop' element={<Shop />} />
    </Routes>
  )
}

export default App
