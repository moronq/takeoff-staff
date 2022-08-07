import axios, { AxiosResponse } from 'axios'
import { PersonType } from '../types/PersonType'
import { UserType } from '../types/UserType'

export type AddContactType = {
  id: number
  data: {
    contacts: Array<UserType>
  }
}

export type GetContactsResponseType = {
  id: number
  contacts: Array<UserType>
}

export const usersAPI = {
  getPerson: async () => {
    return axios
      .get<Array<PersonType>>('http://localhost:3001/person')
      .then((response: AxiosResponse<Array<PersonType>>) => response.data)
  },
  getUsers: async () => {
    return axios
      .get<Array<UserType>>('http://localhost:3001/users')
      .then((response: AxiosResponse<Array<UserType>>) => response.data)
  },
  getContacts: async (id: string) => {
    return axios
      .get<GetContactsResponseType>(`http://localhost:3001/contacts/${id}`)
      .then((response: AxiosResponse<GetContactsResponseType>) => response.data)
  },
  addContact: async (data: AddContactType) => {
    return axios.patch(`http://localhost:3001/contacts/${data.id}`, data.data)
  },
  deleteContact: async (data: AddContactType) => {
    return axios.patch(`http://localhost:3001/contacts/${data.id}`, data.data)
  },
}
