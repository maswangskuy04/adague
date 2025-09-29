// Library Alert
import { useSnackbar } from "notistack"
// React
import { useEffect } from "react"

function Alert({ message, type = 'default', open, options }) {
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if(open && message) {
      enqueueSnackbar(message, {
        variant: type,
        autoHideDuration: 3000,
        ...options
      })
    }
  }, [open, message, type, options, enqueueSnackbar])

  return null
}

export default Alert