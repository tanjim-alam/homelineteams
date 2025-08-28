import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/authSlice'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  const { user } = useSelector(s => s.auth)
  
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/categories', label: 'Categories', icon: '📁' },
    { path: '/products', label: 'Products', icon: '📦' },
    { path: '/orders', label: 'Orders', icon: '🛒' },
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-6">
            <p className="text-sm text-gray-400">Welcome back,</p>
            <p className="font-medium">{user?.name || 'Admin'}</p>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={onClose}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

const Header = ({ onMenuClick }) => {
  const dispatch = useDispatch()
  const { user } = useSelector(s => s.auth)

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-600 hover:text-gray-900"
        >
          ☰
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Homeline Admin</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">{user?.email}</span>
        <button
          onClick={() => dispatch(logout())}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
