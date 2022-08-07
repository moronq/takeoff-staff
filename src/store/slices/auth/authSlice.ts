import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PersonType } from '../../../types/PersonType'
import { login } from './authAction'

export type authState = {
  isAuth: boolean
  user: PersonType
  isLoading: boolean
  error: string | null
}

const initialState: authState = {
  isAuth: false,
  user: {} as PersonType,
  isLoading: false,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
      state.isLoading = false
    },
    setUser: (state, action: PayloadAction<PersonType>) => {
      state.user = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    logout: (state) => {
      localStorage.removeItem('auth')
      localStorage.removeItem('user')
      localStorage.removeItem('id')
      state.user = {} as PersonType
      state.isAuth = false
    },
  },
  extraReducers: {
    [login.pending.type]: (state) => {
      state.isLoading = true
      state.error = null
    },
    [login.fulfilled.type]: (state, action: PayloadAction<PersonType>) => {
      state.isLoading = false
      localStorage.setItem('auth', 'true')
      localStorage.setItem('id', action.payload.id.toString())
      localStorage.setItem('user', action.payload.username)
      state.isAuth = true
      state.user = action.payload
    },
    [login.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { setAuth, setUser, setError, setIsLoading, logout } =
  authSlice.actions
export default authSlice.reducer
