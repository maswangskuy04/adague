// Context
import Lottie from "lottie-react"
import { useAuth } from "../context/AuthContext"
// Navigasi
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({ roles }) => {
	const { user, initializing, token } = useAuth()

	// Inisialisasi
	if (initializing) return

	// Jika tidak ada user / token, balikan ke halaman login
	if (!user || !token) {
		return <Navigate to='/login' replace />
	}

	// Cek role
	if (roles && !roles.includes(user.role)) {
		return <Navigate to='/unauthorized' replace />
	}

	return <Outlet />
}

export default ProtectedRoute