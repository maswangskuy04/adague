// Navigasi
import { Route, Routes } from 'react-router-dom'
// Pages
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import Home from './pages/user/Home'
import Dashboard from './pages/admin/Dashboard'
import Unauthorized from './pages/UnauthorizedPage'
// Routes
import ProtectedRoute from './routes/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />}></Route>
      <Route path='/register' element={<RegisterPage />}></Route>

      {/* User */}
      <Route element={<ProtectedRoute roles={['user']} />}>
        <Route path='/home' element={<Home />} />
      </Route>

      {/* Admin */}
      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route path='/admin/dashboard' element={<Dashboard />} />
      </Route>

      <Route path='/unauthorized' element={<Unauthorized />}></Route>
    </Routes>
  )
}

export default App
