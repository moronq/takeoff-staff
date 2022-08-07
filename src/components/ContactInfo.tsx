import { Button, Form, Layout, Row } from 'antd'
import { FC, useEffect, useState } from 'react'
import { AddContactType } from '../api/usersAPI'
import { ContactType } from '../types/ContactType'
import { drawFieldsInfo } from '../utils/drawFields'
import { getContactWithFields } from '../utils/getContactWithFields'

type PropsType = {
  user: ContactType | null
  id: string
  onSaveOrDeleteContact: (data: AddContactType) => void
  contacts: Array<ContactType>
}

const ContactInfo: FC<PropsType> = ({
  user,
  id,
  onSaveOrDeleteContact,
  contacts,
}) => {
  const [editMode, setEditMode] = useState(false)

  const [form] = Form.useForm()

  const setInputToDefault = () => {
    form.setFieldValue('firstName', user?.firstName || '')
    form.setFieldValue('lastName', user?.lastName || '')
    form.setFieldValue('number', user?.number || '')
    form.setFieldValue('description', user?.description || '')
  }

  useEffect(() => {
    setInputToDefault()
    setEditMode(false)
  }, [user])

  const deleteContact = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const data: AddContactType = {
      id: id,
      data: {
        contactList: contacts.filter((el) => el.id !== user?.id),
      },
    }
    onSaveOrDeleteContact(data)
  }
  const onEditClick = () => {
    setEditMode(true)
  }
  const submitForm = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const modifiedUser: ContactType = getContactWithFields(
      user?.id as string,
      form
    )
    const data: AddContactType = {
      id: id,
      data: {
        contactList: [
          modifiedUser,
          ...contacts.filter((el) => el.id !== user?.id),
        ],
      },
    }
    onSaveOrDeleteContact(data)
    setEditMode(false)
  }
  const onCancelClick = () => {
    setEditMode(false)
    setInputToDefault()
  }

  if (!user) {
    return null
  } else {
    return (
      <Layout>
        <Form onFinish={submitForm} form={form} className="formInfo">
          {drawFieldsInfo(editMode, user)}
          <Row>
            {editMode && (
              <>
                <Button type="primary" htmlType="submit">
                  Сохранить
                </Button>
                <Button onClick={onCancelClick}>Отменить</Button>
              </>
            )}
            {editMode || <Button onClick={onEditClick}>Редактировать</Button>}
            <Button onClick={deleteContact}>Удалить</Button>
          </Row>
        </Form>
      </Layout>
    )
  }
}

export default ContactInfo
