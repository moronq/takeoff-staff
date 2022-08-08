import { Avatar, Input, List } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { ContactType } from '../types/ContactType'

type PropsType = {
  contacts: Array<ContactType>
  setActiveUser: (contact: ContactType) => void
}

const ContactList: FC<PropsType> = ({ contacts, setActiveUser }) => {
  const [value, setValue] = useState('')
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const [contactsFiltered, setContactsFiltered] =
    useState<Array<ContactType>>(contacts)

  useEffect(() => {
    setContactsFiltered(contacts)
  }, [contacts])

  useEffect(() => {
    if (value.length !== 0) {
      setContactsFiltered(
        contacts.filter(
          (el) =>
            el.firstName.toLowerCase().includes(value.toLowerCase()) ||
            el.lastName.toLowerCase().includes(value.toLowerCase())
        )
      )
    } else {
      setContactsFiltered(contacts)
    }
  }, [value])

  const onUserClick = (
    item: ContactType,
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    let parent = document.querySelector('.userList')
    let userItem = parent!.querySelectorAll('.userItem')
    let target = e.currentTarget
    if (target.classList.contains('userItem')) {
      for (let i = 0; i < userItem.length; i++) {
        userItem[i].classList.remove('activeUser')
      }
      target.classList.add('activeUser')
    }
    setActiveUser(item)
  }

  if (contacts.length === 0) {
    return <p>Список контактов пуст =(</p>
  }

  return (
    <>
      <Input type={'text'} value={value} onChange={(e) => onChange(e)} />
      {contactsFiltered.length ? (
        <List
          itemLayout="horizontal"
          dataSource={contactsFiltered}
          renderItem={(item) => (
            <List.Item
              className="userItem"
              onClick={(e) => onUserClick(item, e)}
            >
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={
                  <p className="textDotted">
                    {item.firstName + ' ' + item.lastName}
                  </p>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      ) : (
        <p>Никого не нашлось =(</p>
      )}
    </>
  )
}

export default ContactList
