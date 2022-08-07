import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ContactType } from '../../../types/ContactType'
import { addContact, deleteContact, fetchContacts } from './contactAction'

type InitialStateType = {
  contacts: Array<ContactType>
  isLoading: boolean
  error: string | null
}

const initialState: InitialStateType = {
  contacts: [] as Array<ContactType>,
  isLoading: false,
  error: null,
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchContacts.pending.type]: (state) => {
      state.error = null
      state.isLoading = true
    },
    [fetchContacts.fulfilled.type]: (
      state,
      action: PayloadAction<Array<ContactType>>
    ) => {
      state.isLoading = false
      state.contacts = action.payload
    },
    [fetchContacts.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [addContact.pending.type]: (state) => {
      state.error = null
      state.isLoading = true
    },
    [addContact.pending.type]: (state) => {
      state.isLoading = false
    },
    [addContact.pending.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    [deleteContact.pending.type]: (state) => {
      state.error = null
      state.isLoading = true
    },
    [deleteContact.fulfilled.type]: (state) => {
      state.isLoading = false
    },
    [deleteContact.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default contactSlice.reducer
