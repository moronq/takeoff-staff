import { FormInstance } from 'antd'

export const getContactWithFields = (id: string, form: FormInstance) => {
  return {
    id: id,
    description: form.getFieldValue('description'),
    firstName: form.getFieldValue('firstName'),
    lastName: form.getFieldValue('lastName'),
    number: form.getFieldValue('number'),
  }
}
