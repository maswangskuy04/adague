// React
import { useState } from "react"

export function useFormValidation(initialValues, type = 'login') {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const validators = {
    login: (val) => {
      const errors = {}
      if(!val.email) errors.email = 'Email wajib diisi'
      if(!val.password) errors.password = 'Password wajib diisi'
      return errors
    },
    register: (val) => {
      const errors = {}
      if(!val.username) errors.username = 'Username wajib diisi'
      if(!val.fullname) errors.fullname = 'Nama lengkap wajib diisi'
      if(!val.email) errors.email = 'Email wajib diisi'
      if(!val.password) errors.password = 'Password wajib diisi'
      return errors
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((props) => ({ ...props, [name]: value }))
  }

  const handleSubmit = (callback) => (e) => {
    e.preventDefault()
    const validationErrors = validators[type](values)
    setErrors(validationErrors)

    if(Object.keys(validationErrors).length === 0) {
      callback()
    }
  }

  return { values, errors, type, handleChange, handleSubmit }
}