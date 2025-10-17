// Navigasi
import { Route, Routes } from 'react-router-dom'
// Pages
// ==== Pages User =====
import Home from './pages/user/Home'
import Profile from './pages/user/Profile'
import Setting from './pages/user/Setting'
import ConnectedAccount from './pages/user/SettingPage/SubSettingPage/ConnectedAccount'
import SecurityPrivacy from './pages/user/SettingPage/SubSettingPage/SecurityPrivacy'
// ==== Pages Admin =====
import Dashboard from './pages/admin/Dashboard'
// Pages Login
import LoginMethod from './pages/auth/LoginMethod'
import LoginEmail from './pages/auth/method/LoginEmail'
import LoginPhone from './pages/auth/method/LoginPhone'
import Unauthorized from './pages/UnauthorizedPage'
// Routes
import ProtectedRoute from './routes/ProtectedRoute'

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
        <Route path='/settings/security&privacy' element={<SecurityPrivacy />} />
        <Route path='/settings/connected_account_social' element={<ConnectedAccount />} />
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
