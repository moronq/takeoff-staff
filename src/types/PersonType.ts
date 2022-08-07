import { ContactType } from './ContactType'

export type PersonType = {
  id: number
  username: string
  password?: string
}
export type PersonCotactsType = {
  id: number
  contacts: Array<ContactType>
}
