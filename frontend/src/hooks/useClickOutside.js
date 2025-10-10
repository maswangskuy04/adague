import { useEffect } from "react"

export default function useClickOutside(ref, prev) {
  useEffect(() => {
    function handleClickOutside(e) {
      if(ref.current && !ref.current.contains(e.target)) {
        prev()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, prev])
}