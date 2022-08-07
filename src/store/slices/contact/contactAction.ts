import { createAsyncThunk } from '@reduxjs/toolkit'
import { AddContactType, usersAPI } from '../../../api/usersAPI'

export const fetchContacts = createAsyncThunk(
  'contact/fetchContacts',
  async (id: string, thunkAPI) => {
    try {
      const response = await usersAPI.getContacts(id)
      if (response) {
        return response.contactList
      } else {
        thunkAPI.rejectWithValue('Ошибка при загрузке контактов')
      }
    } catch (e) {
      thunkAPI.rejectWithValue('Ошибка при загрузке контактов')
    }
  }
)

export const addContact = createAsyncThunk(
  'contact/addContact',
  async (data: AddContactType, thunkAPI) => {
    try {
      const response = await usersAPI.modifyContact(data)
      if (response.status === 200) {
        return response.data
      } else {
        thunkAPI.rejectWithValue('Ошибка при загрузке контактов')
      }
    } catch (e) {
      thunkAPI.rejectWithValue('Ошибка при загрузке контактов')
    }
  }
)
export const deleteContact = createAsyncThunk(
  'contact/addContact',
  async (data: AddContactType, thunkAPI) => {
    try {
      const response = await usersAPI.modifyContact(data)
      if (response.status === 200) {
        return response.data
      } else {
        thunkAPI.rejectWithValue('Ошибка при загрузке контактов')
      }
    } catch (e) {
      thunkAPI.rejectWithValue('Ошибка при загрузке контактов')
    }
  }
)
export const changeContact = createAsyncThunk(
  'contact/changeContact',
  async (data: AddContactType, thunkAPI) => {
    try {
      const response = await usersAPI.modifyContact(data)
      if (response.status === 200) {
        return response.data
      } else {
        thunkAPI.rejectWithValue('Ошибка при загрузке контактов')
      }
    } catch (e) {
      thunkAPI.rejectWithValue('Ошибка при загрузке контактов')
    }
  }
)
