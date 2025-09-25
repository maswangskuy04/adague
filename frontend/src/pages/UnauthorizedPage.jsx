import { useContext } from "react"
// Navigasi
import { Link } from "lucide-react"
// Context
import { AuthContext } from "../context/AuthContext"

function Unauthorized() {
  const { logoutFunc } = useContext(AuthContext)
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Akses Ditolak</h1>
      <p className="text-lg text-gray-600 mb-6">Akun kamu tidak punya hak akses ke halaman ini.</p>

      <div className="flex gap-4">
        <Link to='/dashboard' className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Kembali ke Beranda</Link>
        <button onClick={logoutFunc} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Keluar</button>
      </div>
    </div>
  )
}

export default Unauthorized