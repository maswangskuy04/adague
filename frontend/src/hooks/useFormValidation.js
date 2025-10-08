// React
import { useState } from "react"

export function useFormValidation(initialValues) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  function validateField(name, value) {
    let message = ''

    if(name === 'email') {
      if(!value) {
        message = 'Email tidak boleh kosong'
      } else if(!value.includes('@')) {
        message = 'Format email tidak valid'
      }
    }

    if(name === 'phone') {
      if(!value) {
        message = 'Nomor telepon tidak boleh kosong'
      } else if(value.length < 13) {
        message = 'Nomor telepon tidak valid'
      }
    }

    setErrors((prev) => ({ ...prev, [name]: message }))
  }

  function handleChange(e) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  function validateAll() {
    Object.entries(values).forEach(([name, value]) => {
      validateField(name, value)
    })
  }

  return {
    values,
    errors,
    handleChange,
    validateAll
  }
}