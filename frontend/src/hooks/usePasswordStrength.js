// React
import { useState } from "react"

export function usePasswordStrength() {
  const [strength, setStrength] = useState(0)

  const valueStrength = (password) => {
    let value = 0
    if (password.length >= 8) value++
    if (/[A-Z]/.test(password)) value++
    if (/[a-z]/.test(password)) value++
    if (/[0-9]/.test(password)) value++
    if (/[^A-Za-z0-9]/.test(password)) value++
    setStrength(value)
  }

  return { strength, valueStrength }
}