import { nanoid } from '@reduxjs/toolkit'
import { Button, Form, Input, Row } from 'antd'

import { FC, useState } from 'react'
import { AddContactType } from '../api/usersAPI'
import { ContactType } from '../types/ContactType'
import { rules } from '../utils/rules'

type PropsType = {
  id: string
  contacts: Array<ContactType>
  submit: (data: AddContactType) => void
}

const ContactForm: FC<PropsType> = ({ id, contacts, submit }) => {
  const [form] = Form.useForm()

  const submitForm = () => {
    const data: AddContactType = {
      id: id,
      data: {
        contactList: [
          {
            id: nanoid(),
            description: form.getFieldValue('Description'),
            firstName: form.getFieldValue('First Name'),
            lastName: form.getFieldValue('Last Name'),
            number: form.getFieldValue('Number'),
          },
          ...contacts,
        ],
      },
    }
    submit(data)
    form.resetFields()
  }

  return (
    <Form onFinish={submitForm} form={form}>
      <Form.Item
        label="First Name"
        name="First Name"
        rules={[rules.required()]}
      >
        <Input autoComplete={'off'} />
      </Form.Item>
      <Form.Item label="Last Name" name="Last Name">
        <Input autoComplete={'off'} />
      </Form.Item>
      <Form.Item label="Number" name="Number" rules={[rules.required()]}>
        <Input autoComplete={'off'} />
      </Form.Item>
      <Form.Item label="Description" name="Description">
        <Input autoComplete={'off'} />
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
