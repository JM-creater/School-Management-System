import { Route, Routes } from 'react-router-dom'
import { LoginScreen } from './screens/login/login-screen'
import { RegisterScreen } from './screens/register/register-screen'
import { LoginAuthProvider } from './screens/login/context/login-auth-provider'
import './App.css'

export default function App() {
  return (
    <LoginAuthProvider>
      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />

        {/* To be implemented Screens for the users */}

        <Route path='/' element={<LoginScreen />} />
        <Route path='*' element={<LoginScreen />} />
      </Routes>
    </LoginAuthProvider>
  )
}
