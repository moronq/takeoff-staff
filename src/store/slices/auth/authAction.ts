import { createAsyncThunk } from '@reduxjs/toolkit'
import { usersAPI } from '../../../api/usersAPI'

export const login = createAsyncThunk(
  'auth/login',
  async (user: { username: string; password: string }, thunkAPI) => {
    await new Promise((r) => setTimeout(r, 1000))
    try {
      const response = await usersAPI.getPerson()
      const mockUser = response.find(
        (u) => u.username == user.username && u.password == user.password
      )
      if (mockUser) {
        return mockUser
      } else {
        return thunkAPI.rejectWithValue('Неверный логин или пароль')
      }
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка при входе')
    }
  }
)
