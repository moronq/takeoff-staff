import { nanoid } from '@reduxjs/toolkit'
import { Button, Form, Input, Row } from 'antd'
import { FC } from 'react'
import { AddContactType } from '../api/usersAPI'
import useInput from '../hooks/useInput'
import { ContactType } from '../types/ContactType'
import { rules } from '../utils/rules'

type PropsType = {
  id: string
  contacts: Array<ContactType>
  submit: (data: AddContactType) => void
}

const ContactForm: FC<PropsType> = ({ id, contacts, submit }) => {
  const description = useInput('')
  const firstName = useInput('')
  const lastName = useInput('')
  const number = useInput('')
  const submitForm = () => {
    const data: AddContactType = {
      id: id,
      data: {
        contactList: [
          {
            id: nanoid(),
            description: description.value,
            firstName: firstName.value,
            lastName: lastName.value,
            number: number.value,
          },
          ...contacts,
        ],
      },
    }
    submit(data)
  }

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="First Name"
        name="First Name"
        rules={[rules.required()]}
      >
        <Input autoComplete={'off'} {...firstName} />
      </Form.Item>
      <Form.Item label="Last Name" name="Last Name" rules={[rules.required()]}>
        <Input autoComplete={'off'} {...lastName} />
      </Form.Item>
      <Form.Item label="Number" name="Number" rules={[rules.required()]}>
        <Input autoComplete={'off'} {...number} />
      </Form.Item>
      <Form.Item
        label="Description"
        name="Description"
        rules={[rules.required()]}
      >
        <Input autoComplete={'off'} {...description} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Row justify="end">
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Row>
      </Form.Item>
    </Form>
  )
}

export default ContactForm
