import { Button, Col, Layout, Modal, Row, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { AddContactType } from '../api/usersAPI'
import ContactForm from '../components/ContactForm'
import ContactInfo from '../components/ContactInfo'
import ContactList from '../components/ContactList'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import {
  addContact,
  deleteContact,
  fetchContacts,
} from '../store/slices/contact/contactAction'
import { ContactType } from '../types/ContactType'

const { Title } = Typography

const Contacts = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const dispatch = useAppDispatch()
  const { contacts } = useAppSelector((state) => state.contact)
  const id = localStorage.getItem('id')
  const [activeUser, setActiveUser] = useState<null | ContactType>(null)

  useEffect(() => {
    dispatch(fetchContacts(id as string))
  }, [])

  const addNewContact = (data: AddContactType) => {
    dispatch(addContact(data)).then((res) =>
      dispatch(fetchContacts(id as string))
    )
    setModalVisible(false)
  }
  const onDeleteContact = (data: AddContactType) => {
    dispatch(deleteContact(data)).then((res) =>
      dispatch(fetchContacts(id as string))
    )
    setActiveUser(null)
  }

  return (
    <Layout className="h100min">
      <Row justify="center">
        <Title level={4}>Список контактов</Title>
      </Row>
      <Row>
        <Col offset={1} span={5}>
          <Button type="primary" onClick={() => setModalVisible(true)}>
            Добавить контакт
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={7} offset={1}>
          <ContactList contacts={contacts} setActiveUser={setActiveUser} />
        </Col>
        <Col span={14} offset={1}>
          <ContactInfo
            user={activeUser}
            id={id as string}
            onDelete={onDeleteContact}
            contacts={contacts}
          />
        </Col>
      </Row>
      <Modal
        title="Добавить контакт"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <ContactForm
          id={id as string}
          contacts={contacts}
          submit={addNewContact}
        />
      </Modal>
    </Layout>
  )
}

export default Contacts
