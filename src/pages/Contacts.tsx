import { Button, Col, Layout, Row, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { AddContactType } from '../api/usersAPI'
import AddContactModal from '../components/AddContactModal'
import ContactInfo from '../components/ContactInfo'
import ContactList from '../components/ContactList'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import {
  fetchContacts,
  modifyContact,
} from '../store/slices/contact/contactAction'
import { ContactType } from '../types/ContactType'
import { clearSelection } from '../utils/clearSelection'

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
    dispatch(modifyContact(data)).then((res) =>
      dispatch(fetchContacts(id as string))
    )
    setModalVisible(false)
    setActiveUser(null)
    clearSelection()
  }
  const onSaveOrDeleteContact = (data: AddContactType) => {
    dispatch(modifyContact(data)).then((res) =>
      dispatch(fetchContacts(id as string))
    )
    setActiveUser(null)
    clearSelection()
  }

  return (
    <Layout className="h100min">
      <Row justify="center">
        <Title level={4}>Список контактов</Title>
      </Row>
      <Row style={{ marginBottom: '15px' }}>
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
            onSaveOrDeleteContact={onSaveOrDeleteContact}
            contacts={contacts}
          />
        </Col>
      </Row>
      <AddContactModal
        addNewContact={addNewContact}
        contacts={contacts}
        id={id as string}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Layout>
  )
}

export default Contacts
