import { useContext } from "react"
// Navigasi
import { Link } from "react-router-dom"
// Context
import { AuthContext } from "../context/AuthContext"
// Image
import ImageUnauthorized from "../assets/unauthorized.json"
// Lottie
import Lottie from 'lottie-react'

function Unauthorized() {
  const { logoutFunc } = useContext(AuthContext)
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-5 bg-gray-800">
      <Lottie
        animationData={ImageUnauthorized}
        loop={true}
        style={{ width: 250, height: 250 }}
      />
      <h1 className="text-4xl font-bold text-red-500 mb-4">Oopps!</h1>
      <p className="text-lg text-gray-400 mb-6">Kamu tidak punya hak akses untuk ke halaman ini.</p>

      <div className="flex gap-4">
        <Link to='/dashboard' className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Kembali ke Beranda</Link>
        <button onClick={logoutFunc} className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 text-white">Keluar</button>
      </div>
    </div>
  )
}

export default Unauthorized