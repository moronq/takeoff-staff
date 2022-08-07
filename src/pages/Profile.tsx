import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import UserItem from '../components/UserItem'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import {
  deleteContact,
  fetchContacts,
  fetchUsers,
} from '../store/slices/profile/profileAction'
import { UserType } from '../types/UserType'
import { addContact } from '../store/slices/profile/profileAction'
import { compareObjInArray } from '../utils/compareObjInArray'

const Profile = () => {
  const dispatch = useAppDispatch()

  const [value, setValue] = useState('')

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const { id } = useAppSelector((state) => state.auth.user)
  const { users, contacts, isLoading } = useAppSelector(
    (state) => state.profile
  )

  const [usersList, setUsersList] = useState(users)

  useEffect(() => {
    setUsersList(
      users.filter((el) => el.name.toLowerCase().includes(value.toLowerCase()))
    )
  }, [value])

  useEffect(() => {
    dispatch(fetchUsers())
    dispatch(fetchContacts(id.toString()))
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  const onClick = (added: boolean, user: UserType) => {
    if (added) {
      dispatch(
        deleteContact({
          id: id,
          data: {
            contacts: contacts.filter((el) => el.id !== user.id),
          },
        })
      ).then((res) => dispatch(fetchContacts(id.toString())))
    } else {
      dispatch(
        addContact({
          id: id,
          data: {
            contacts: [...contacts, user],
          },
        })
      ).then((res) => dispatch(fetchContacts(id.toString())))
    }
  }

  return (
    <main>
      <Row>
        <Col span={12}>
          <div>
            <p>My Contacts</p>
            <ul>
              {contacts?.map((el: UserType) => (
                <UserItem
                  key={el.id}
                  id={id}
                  user={el}
                  added={true}
                  onClick={onClick}
                />
              ))}
            </ul>
          </div>
        </Col>
        <Col span={12}>
          <div>
            <p>All Users</p>
            <label>
              <input value={value} onChange={(e) => onInputChange(e)} />
            </label>
            <ul>
              {usersList.map((el) => (
                <UserItem
                  key={el.id}
                  id={id}
                  user={el}
                  onClick={onClick}
                  added={compareObjInArray(contacts, el)}
                />
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </main>
  )
}

export default Profile
