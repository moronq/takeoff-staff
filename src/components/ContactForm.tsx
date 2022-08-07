import { nanoid } from '@reduxjs/toolkit'
import { Button, Form, Row } from 'antd'

import { FC } from 'react'
import { AddContactType } from '../api/usersAPI'
import { ContactType } from '../types/ContactType'
import { drawFieldsForm } from '../utils/drawFields'
import { getContactWithFields } from '../utils/getContactWithFields'

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
        contactList: [getContactWithFields(nanoid(), form), ...contacts],
      },
    }
    submit(data)
    form.resetFields()
  }

  return (
    <Form onFinish={submitForm} form={form}>
      {drawFieldsForm()}
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
