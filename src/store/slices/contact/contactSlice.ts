import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ContactType } from '../../../types/ContactType'
import { commonPending, commonReject } from '../../../utils/commonReducers'
import { fetchContacts, modifyContact } from './contactAction'

export type InitialStateType = {
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
      commonPending(state)
    },
    [fetchContacts.fulfilled.type]: (
      state,
      action: PayloadAction<Array<ContactType>>
    ) => {
      state.isLoading = false
      state.contacts = action.payload
    },
    [fetchContacts.rejected.type]: (state, action: PayloadAction<string>) => {
      commonReject(state, action)
    },
    [modifyContact.pending.type]: (state) => {
      commonPending(state)
    },
    [modifyContact.fulfilled.type]: (state) => {
      state.isLoading = false
    },
    [modifyContact.rejected.type]: (state, action: PayloadAction<string>) => {
      commonReject(state, action)
    },
  },
})

export default contactSlice.reducer
