import { Avatar, List } from 'antd'
import { FC } from 'react'
import { ContactType } from '../types/ContactType'

type PropsType = {
  contacts: Array<ContactType>
  setActiveUser: (contact: ContactType) => void
}

const ContactList: FC<PropsType> = ({ contacts, setActiveUser }) => {
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

  return (
    <List
      itemLayout="horizontal"
      className="userList"
      dataSource={contacts}
      renderItem={(item) => (
        <List.Item className="userItem" onClick={(e) => onUserClick(item, e)}>
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
  )
}

export default ContactList
