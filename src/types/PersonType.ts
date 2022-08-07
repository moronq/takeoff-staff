import { UserType } from './UserType'

export type PersonType = {
  id: number
  username: string
  password?: string
}
export type PersonCotactsType = {
  id: number
  contacts: Array<UserType>
}
