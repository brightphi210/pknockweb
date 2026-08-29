import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthProvider from '../providers/AuthProvider'
import ProtectedRoute from '../providers/ProtectedRoute'
import DashNavbar from './components/DashNavbar'
import Content from './content/Content'
import Home from './pages/Home'
import Login from './pages/Login'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <ProtectedRoute
                element={
                  <div>
                    <DashNavbar />
                    <Content />
                  </div>
                }
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App