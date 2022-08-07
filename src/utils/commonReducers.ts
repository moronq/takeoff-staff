import { PayloadAction } from '@reduxjs/toolkit'
import { InitialStateType } from '../store/slices/contact/contactSlice'

export const commonPending = (state: InitialStateType) => {
  state.error = null
  state.isLoading = true
}
export const commonReject = (
  state: InitialStateType,
  action: PayloadAction<string>
) => {
  state.isLoading = false
  state.error = action.payload
}
