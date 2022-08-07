import { Modal } from 'antd'
import { FC } from 'react'
import { AddContactType } from '../api/usersAPI'
import { ContactType } from '../types/ContactType'
import ContactForm from './ContactForm'

type PropsType = {
  modalVisible: boolean
  setModalVisible: (arg: boolean) => void
  id: string
  contacts: Array<ContactType>
  addNewContact: (data: AddContactType) => void
}

export const AddContactModal: FC<PropsType> = ({
  modalVisible,
  setModalVisible,
  id,
  contacts,
  addNewContact,
}) => {
  return (
    <Modal
      title="Добавить контакт"
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      footer={null}
    >
      <ContactForm id={id} contacts={contacts} submit={addNewContact} />
    </Modal>
  )
}

export default AddContactModal
