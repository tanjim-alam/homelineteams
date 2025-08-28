import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { fetchMe, login, logout } from './store/slices/authSlice'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import CategoriesPage from './pages/CategoriesPage'
import ProductsPage from './pages/ProductsPage'
import OrdersPage from './pages/OrdersPage'

function ProtectedRoute({ children }) {
  const user = useSelector((s) => s.auth.user)
  if (!user) return <Navigate to="/login" replace />
  return children
}

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((s) => s.auth)
  const location = useLocation()

  useEffect(() => {
    dispatch(fetchMe())
  }, [dispatch])

  const isActiveRoute = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const NavLink = ({ to, children, icon, exact = false }) => (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${isActiveRoute(to)
        ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  )

  if (!user) {
    return <LoginPage />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          <NavLink to="/" exact>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
            </svg>
            Dashboard
          </NavLink>

          <NavLink to="/categories">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Categories
          </NavLink>

          <NavLink to="/products">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            Products
          </NavLink>

          <NavLink to="/orders">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Orders
          </NavLink>
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.name || user.email}
              </p>
              <p className="text-xs text-gray-500 truncate">Administrator</p>
            </div>
          </div>

          <button
            onClick={() => dispatch(logout())}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {location.pathname === '/' && 'Dashboard'}
                {location.pathname === '/categories' && 'Categories'}
                {location.pathname === '/products' && 'Products'}
                {location.pathname === '/orders' && 'Orders'}
              </h2>
              <p className="text-gray-600 mt-1">
                {location.pathname === '/' && 'Overview of your business'}
                {location.pathname === '/categories' && 'Manage product categories'}
                {location.pathname === '/products' && 'Manage your products'}
                {location.pathname === '/orders' && 'Manage customer orders'}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
