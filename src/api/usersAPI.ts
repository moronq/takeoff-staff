import axios, { AxiosResponse } from 'axios'
import { ContactType } from '../types/ContactType'
import { PersonType } from '../types/PersonType'

export type AddContactType = {
  id: string
  data: {
    contactList: Array<ContactType>
  }
}

export type GetContactsResponseType = {
  id: number
  contactList: Array<ContactType>
}

export const usersAPI = {
  getPerson: async () => {
    return axios
      .get<Array<PersonType>>('http://localhost:3001/person')
      .then((response: AxiosResponse<Array<PersonType>>) => response.data)
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
