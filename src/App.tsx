import { FC, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LayoutRouter from './components/LayoutRouter'
import { useAppDispatch, useAppSelector } from './hooks/hook'
import Contacts from './pages/Contacts'
import Login from './pages/Login'
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
          element={isAuth ? <Navigate to={'/contacts'} replace /> : <Login />}
        />
        <Route
          path="contacts"
          element={!isAuth ? <Navigate to={'/login'} replace /> : <Contacts />}
        />
        <Route path="*" element={<Navigate to={'/contacts'} replace />} />
        <Route path="/" element={<Navigate to={'/contacts'} replace />} />
      </Route>
    </Routes>
  )
}

export default App
