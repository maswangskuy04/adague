// Navigasi
import { Route, Routes } from 'react-router-dom'
// Pages
import Home from './pages/user/Home'
import Profile from './pages/user/Profile'
import Dashboard from './pages/admin/Dashboard'
import Unauthorized from './pages/UnauthorizedPage'
import LoginMethod from './pages/auth/LoginMethod'
import LoginEmail from './pages/auth/method/LoginEmail'
import LoginPhone from './pages/auth/method/LoginPhone'
// Routes
import ProtectedRoute from './routes/ProtectedRoute'
import Setting from './pages/user/Setting'

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path='/login' element={<LoginMethod />} />
      <Route path='/signup' element={<LoginMethod />} />
      <Route path='/login/email' element={<LoginEmail />} />
      <Route path='/login/phone' element={<LoginPhone />} />

      {/* User */}
      <Route element={<ProtectedRoute roles={['user']} />}>
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Setting />} />
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
