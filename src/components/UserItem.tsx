import React, { FC } from 'react'
import { useAppDispatch } from '../hooks/hook'
import { UserType } from '../types/UserType'

type PropsType = {
  id: number
  user: UserType
  added: boolean
  onClick: (added: boolean, user: UserType) => void
}

const UserItem: FC<PropsType> = ({ user, added, onClick }) => {
  return (
    <li>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.website}</p>

      <button onClick={() => onClick(added, user)}>
        {added ? 'Удалить' : 'Добавить'}
      </button>
    </li>
  )
}

export default UserItem
