import { createAsyncThunk } from '@reduxjs/toolkit'
import { AddContactType, usersAPI } from '../../../api/usersAPI'

export const fetchUsers = createAsyncThunk(
  'profile/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const response = await usersAPI.getUsers()
      if (response) {
        return response
      } else {
        thunkAPI.rejectWithValue('Ошибка при загрузке пользователей')
      }
    } catch (e) {
      thunkAPI.rejectWithValue('Ошибка при загрузке пользователей')
    }
  }
)

export const fetchContacts = createAsyncThunk(
  'profile/fetchContacts',
  async (id: string, thunkAPI) => {
    try {
      const response = await usersAPI.getContacts(id)
      if (response) {
        return response.contacts
      } else {
        thunkAPI.rejectWithValue('Ошибка при загрузке пользователей')
      }
    } catch (e) {
      thunkAPI.rejectWithValue('Ошибка при загрузке пользователей')
    }
  }
)

export const addContact = createAsyncThunk(
  'profile/addContact',
  async (data: AddContactType, thunkAPI) => {
    try {
      const response = await usersAPI.addContact(data)
      if (response.status === 200) {
        return response.data.contacts
      } else {
        thunkAPI.rejectWithValue(`${response.status}`)
      }
    } catch (e) {
      thunkAPI.rejectWithValue('Ошибка при добавлении контакта')
    }
  }
)

export const deleteContact = createAsyncThunk(
  'profile/addContact',
  async (data: AddContactType, thunkAPI) => {
    try {
      const response = await usersAPI.deleteContact(data)
      if (response.status === 200) {
        return response.data.contacts
      } else {
        thunkAPI.rejectWithValue(`${response.status}`)
      }
    } catch (e) {
      thunkAPI.rejectWithValue('Ошибка при добавлении контакта')
    }
  }
)
