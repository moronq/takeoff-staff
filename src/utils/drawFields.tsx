import { Form, Input, Row } from 'antd'
import { ContactType } from '../types/ContactType'
import { rules } from './rules'

const arr = [
  ['firstName', 'Имя:'],
  ['lastName', 'Фамилия:'],
  ['number', 'Телефон:'],
  ['description', 'Описание:'],
]

export const drawFieldsInfo: (
  editMode: boolean,
  user: ContactType
) => Array<JSX.Element> = (editMode, user) => {
  return arr.map((el) => {
    return (
      <Row align={'middle'} className="rowInfo" key={el[0]}>
        <p className="infoText">{el[1]}</p>
        {editMode ? (
          <Form.Item
            name={el[0]}
            rules={
              el[0] === 'firstName' || el[0] === 'number'
                ? [rules.required()]
                : [{ required: false }]
            }
            className="infoInput"
          >
            <Input autoComplete={'off'} />
          </Form.Item>
        ) : (
          <p className="infoText">
            {user[el[0] as 'firstName' | 'lastName' | 'number' | 'description']}
          </p>
        )}
      </Row>
    )
  })
}

export const drawFieldsForm: () => Array<JSX.Element> = () => {
  return arr.map((el) => {
    return (
      <Form.Item
        key={el[0]}
        label={el[1]}
        name={el[0]}
        rules={
          el[0] === 'firstName' || el[0] === 'number'
            ? [rules.required()]
            : [{ required: false }]
        }
      >
        <Input autoComplete={'off'} />
      </Form.Item>
    )
  })
}
