import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../store/slices/productSlice'
import { listCategories } from '../store/slices/categorySlice'
import { listOrders } from '../store/slices/orderSlice'

export default function DashboardPage() {
  const dispatch = useDispatch()
  const { items: products, loading: productsLoading } = useSelector(s => s.products)
  const { items: categories, loading: categoriesLoading } = useSelector(s => s.categories)
  const { items: orders, loading: ordersLoading } = useSelector(s => s.orders)

  useEffect(() => {
    dispatch(listProducts())
    dispatch(listCategories())
    dispatch(listOrders())
  }, [dispatch])

  const getTotalRevenue = () => {
    return orders.reduce((total, order) => total + (order.totalAmount || 0), 0)
  }

  const getPendingOrders = () => {
    return orders.filter(order => order.status === 'pending').length
  }

  const getCompletedOrders = () => {
    return orders.filter(order => order.status === 'completed').length
  }

  const getLowStockProducts = () => {
    return products.filter(product => (product.stock || 0) < 10).length
  }

  const getRecentOrders = () => {
    return orders.slice(0, 5).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  const getTopCategories = () => {
    const categoryCounts = {}
    products.forEach(product => {
      const categoryName = categories.find(cat => cat._id === product.categoryId)?.name || 'Uncategorized'
      categoryCounts[categoryName] = (categoryCounts[categoryName] || 0) + 1
    })
    return Object.entries(categoryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
  }

  const StatCard = ({ title, value, icon, color, loading }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          {loading ? (
            <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mt-2"></div>
          ) : (
            <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  )

  const OrderStatusBadge = ({ status }) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
      processing: { color: 'bg-blue-100 text-blue-800', text: 'Processing' },
      completed: { color: 'bg-green-100 text-green-800', text: 'Completed' },
      cancelled: { color: 'bg-red-100 text-red-800', text: 'Cancelled' }
    }
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={products.length}
          icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
          color="bg-blue-50"
          loading={productsLoading}
        />
        <StatCard
          title="Total Categories"
          value={categories.length}
          icon={<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
          color="bg-green-50"
          loading={categoriesLoading}
        />
        <StatCard
          title="Total Orders"
          value={orders.length}
          icon={<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
          color="bg-purple-50"
          loading={ordersLoading}
        />
        <StatCard
          title="Total Revenue"
          value={`₹${getTotalRevenue().toLocaleString()}`}
          icon={<svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>}
          color="bg-yellow-50"
          loading={ordersLoading}
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Pending Orders"
          value={getPendingOrders()}
          icon={<svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="bg-orange-50"
          loading={ordersLoading}
        />
        <StatCard
          title="Completed Orders"
          value={getCompletedOrders()}
          icon={<svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          color="bg-emerald-50"
          loading={ordersLoading}
        />
        <StatCard
          title="Low Stock Products"
          value={getLowStockProducts()}
          icon={<svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>}
          color="bg-red-50"
          loading={productsLoading}
        />
      </div>

      {/* Recent Orders & Top Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          </div>
          <div className="p-6">
            {ordersLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : getRecentOrders().length > 0 ? (
              <div className="space-y-4">
                {getRecentOrders().map((order) => (
                  <div key={order._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Order #{order._id.slice(-6)}</p>
                      <p className="text-sm text-gray-600">₹{order.totalAmount || 0}</p>
                    </div>
                    <OrderStatusBadge status={order.status} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No orders found</p>
            )}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Categories</h3>
          </div>
          <div className="p-6">
            {categoriesLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-12 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : getTopCategories().length > 0 ? (
              <div className="space-y-4">
                {getTopCategories().map(([category, count], index) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                      </div>
                      <span className="font-medium text-gray-900">{category}</span>
                    </div>
                    <span className="text-sm text-gray-600">{count} products</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No categories found</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
            <div className="text-center">
              <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <p className="font-medium text-gray-900">Add Product</p>
              <p className="text-sm text-gray-600">Create new product</p>
            </div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors">
            <div className="text-center">
              <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="font-medium text-gray-900">Add Category</p>
              <p className="text-sm text-gray-600">Create new category</p>
            </div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors">
            <div className="text-center">
              <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="font-medium text-gray-900">View Analytics</p>
              <p className="text-sm text-gray-600">Detailed reports</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
