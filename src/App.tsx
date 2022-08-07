import { FC, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutRouter from './components/LayoutRouter'
import { useAppDispatch, useAppSelector } from './hooks/hook'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { setAuth, setUser } from './store/slices/auth/authSlice'
import { PersonType } from './types/PersonType'

const App: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      dispatch(
        setUser({
          username: localStorage.getItem('user' || ''),
          id: parseInt(localStorage.getItem('id' || '') as string),
        } as PersonType)
      )
      dispatch(setAuth(true))
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<LayoutRouter />}>
        <Route
          path="login"
          element={isAuth ? <Navigate to={'/profile'} replace /> : <Login />}
        />
        <Route
          path="profile"
          element={!isAuth ? <Navigate to={'/login'} replace /> : <Profile />}
        />
        <Route path="*" element={<Navigate to={'/profile'} replace />} />
        <Route path="/" element={<Navigate to={'/profile'} replace />} />
      </Route>
    </Routes>
  )
}

export default App
