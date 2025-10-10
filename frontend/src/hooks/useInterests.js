import { useEffect, useState } from "react"
import API from "../services/api"

export function useInterests() {
  const [interests, setInterests] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchInterests = async () => {
      setLoading(true)
      try {
        const res = await API.get('/user/interests')

        if (res.data.success) setInterests(res.data.interests);
      } catch (err) {
        console.error('Error fetch interests: ', err)
      } finally {
        setLoading(false)
      }
    }

    fetchInterests()
  }, [])

  return { interests, loading }
}