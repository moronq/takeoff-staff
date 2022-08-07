import { Button, Col, Form, Input, Layout, Row } from 'antd'
import { FC, useEffect, useState } from 'react'
import { AddContactType } from '../api/usersAPI'
import { ContactType } from '../types/ContactType'
import { rules } from '../utils/rules'

type PropsType = {
  user: ContactType | null
  id: string
  onDelete: (data: AddContactType) => void
  onSave: (data: AddContactType) => void
  contacts: Array<ContactType>
}

const ContactInfo: FC<PropsType> = ({
  user,
  id,
  onDelete,
  contacts,
  onSave,
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
  const submitForm = () => {
    const modifiedUser: ContactType = {
      id: user?.id as string,
      description: form.getFieldValue('description'),
      firstName: form.getFieldValue('firstName'),
      lastName: form.getFieldValue('lastName'),
      number: form.getFieldValue('number'),
    }
    const data: AddContactType = {
      id: id,
      data: {
        contactList: [
          modifiedUser,
          ...contacts.filter((el) => el.id !== user?.id),
        ],
      },
    }
    onSave(data)
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
          <Row align={'middle'} className="rowInfo">
            <p className="infoText">Имя:</p>
            {editMode ? (
              <Form.Item
                name="firstName"
                rules={[rules.required()]}
                className="infoInput"
              >
                <Input autoComplete={'off'} />
              </Form.Item>
            ) : (
              <p className="infoText">{user.firstName}</p>
            )}
          </Row>
          <Row align={'middle'} className="rowInfo">
            <p className="infoText">Фамилия:</p>
            {editMode ? (
              <Form.Item name="lastName" className="infoInput">
                <Input autoComplete={'off'} />
              </Form.Item>
            ) : (
              <p className="infoText">{user.lastName}</p>
            )}
          </Row>
          <Row align={'middle'} className="rowInfo">
            <p className="infoText">Телефон:</p>
            {editMode ? (
              <Form.Item
                name="number"
                rules={[rules.required()]}
                className="infoInput"
              >
                <Input autoComplete={'off'} />
              </Form.Item>
            ) : (
              <p className="infoText">{user.number}</p>
            )}
          </Row>
          <Row align={'middle'} className="rowInfo">
            <p className="infoText">Описание:</p>
            {editMode ? (
              <Form.Item name="description" className="infoInput">
                <Input autoComplete={'off'} />
              </Form.Item>
            ) : (
              <p className="infoText">{user.description}</p>
            )}
          </Row>
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
