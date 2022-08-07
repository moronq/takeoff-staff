import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../../../types/UserType'
import { addContact, fetchContacts, fetchUsers } from './profileAction'

type InitialStateType = {
  users: Array<UserType>
  error: string | null
  isLoading: boolean
  contacts: Array<UserType>
}

const initialState: InitialStateType = {
  users: [] as Array<UserType>,
  error: null,
  isLoading: false,
  contacts: [] as Array<UserType>,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true
      state.error = null
      state.users = []
    },
    [fetchUsers.fulfilled.type]: (
      state,
      action: PayloadAction<Array<UserType>>
    ) => {
      state.users = action.payload
      state.isLoading = false
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    [fetchContacts.pending.type]: (state) => {
      state.isLoading = true
      state.error = null
    },
    [fetchContacts.fulfilled.type]: (
      state,
      action: PayloadAction<Array<UserType>>
    ) => {
      state.contacts = action.payload
      state.isLoading = false
    },
    [fetchContacts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    [addContact.pending.type]: (state) => {
      state.isLoading = true
    },
    [addContact.fulfilled.type]: (state) => {
      state.isLoading = false
    },
    [addContact.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})

export default profileSlice.reducer
