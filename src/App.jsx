import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Homepage from './components/home/Homepage'
import ProtectedRoutes from './utils/ProtectedRoutes'
import LandingPage from './components/landingPage/LandingPage'


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      <Route element={<ProtectedRoutes />}>
       <Route path='/home' element={<Homepage />} />
      </Route>

    </Routes>
    </>
  )
}

export default App
