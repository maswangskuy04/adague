// React
import { createContext, useContext, useState } from "react"
// Component
import Alert from "../components/ui/Alert"

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ open: false, message: '', type: 'default' })

  const showAlert = (message, type = 'default') => {
    setAlert({ open: true, message, type })
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Alert open={alert.open} message={alert.message} type={alert.type} />
    </AlertContext.Provider>
  )
}

export const useAlert = () => useContext(AlertContext)