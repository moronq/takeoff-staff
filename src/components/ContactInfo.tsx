import { Button, Input, Layout, Row } from 'antd'
import { FC, useState } from 'react'
import { AddContactType } from '../api/usersAPI'
import { ContactType } from '../types/ContactType'

type PropsType = {
  user: ContactType | null
  id: string
  onDelete: (data: AddContactType) => void
  contacts: Array<ContactType>
}

const ContactInfo: FC<PropsType> = ({ user, id, onDelete, contacts }) => {
  const [editMode, setEditMode] = useState(false)

  const deleteContact = () => {
    const data: AddContactType = {
      id: id,
      data: {
        contactList: contacts.filter((el) => el.id !== user?.id),
      },
    }
    onDelete(data)
  }
  const onEditClick = () => {
    setEditMode(true)
  }
  const onSaveClick = () => {
    setEditMode(false)
  }

  if (!user) {
    return null
  } else {
    return (
      <Layout>
        <Row>Имя: {editMode ? <Input /> : <p>{user.firstName}</p>}</Row>
        <Row>Фамилия: {editMode ? <Input /> : <p>{user.lastName}</p>}</Row>
        <Row>Телефон: {editMode ? <Input /> : <p>{user.number}</p>}</Row>
        <Row>Описание: {editMode ? <Input /> : <p>{user.description}</p>}</Row>
        <Row>
          {editMode && <Button onClick={onSaveClick}>Сохранить</Button>}
          <Button onClick={onEditClick}>Редактировать</Button>
          <Button onClick={deleteContact}>Удалить</Button>
        </Row>
      </Layout>
    )
  }
}

export default ContactInfo
