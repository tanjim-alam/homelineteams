import { useEffect, useState } from 'react'
import api from '../api/client'
import { ChevronDown, ChevronRight, Phone, MapPin, Home, Calendar, MessageSquare, Settings } from 'lucide-react'

export default function LeadsPage() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expandedLead, setExpandedLead] = useState(null)

  const fetchLeads = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await api.get('/api/leads')
      setLeads(res.data || [])
    } catch (e) {
      setError(e.message || 'Failed to load leads')
    } finally {
      setLoading(false)
    }
  }

  const formatConfiguration = (meta) => {
    if (!meta) return null
    
    const configs = []
    
    if (meta.kitchenConfig) {
      configs.push({
        title: 'Kitchen Configuration',
        icon: '🍳',
        data: meta.kitchenConfig
      })
    }
    
    if (meta.packageConfig) {
      configs.push({
        title: 'Package Configuration',
        icon: '📦',
        data: meta.packageConfig
      })
    }
    
    if (meta.wardrobeConfig) {
      configs.push({
        title: 'Wardrobe Configuration',
        icon: '👔',
        data: meta.wardrobeConfig
      })
    }
    
    if (meta.calculatorData) {
      configs.push({
        title: 'Calculator Data',
        icon: '🧮',
        data: {
          homeType: meta.calculatorData.homeType,
          rooms: meta.calculatorData.rooms?.join(', ') || 'Not specified',
          area: meta.calculatorData.area || 'Not specified',
          budget: meta.calculatorData.budget || 'Not specified',
          style: meta.calculatorData.style || 'Not specified',
          timeline: meta.calculatorData.timeline || 'Not specified',
          estimatedCost: meta.calculatorData.estimatedCost ? `₹${meta.calculatorData.estimatedCost.totalCost?.toLocaleString()}` : 'Not calculated'
        }
      })
    }
    
    return configs
  }

  const toggleExpanded = (leadId) => {
    setExpandedLead(expandedLead === leadId ? null : leadId)
  }

  useEffect(() => { fetchLeads() }, [])

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Interior Design Leads</h2>
          <p className="text-gray-600 mt-1">Manage and track all design inquiries</p>
        </div>
        <button 
          onClick={fetchLeads} 
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading leads...</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="text-red-800 font-medium">Error loading leads</div>
          <div className="text-red-600 text-sm mt-1">{error}</div>
        </div>
      )}

      {!loading && !error && leads.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No leads found</h3>
          <p className="text-gray-600">Interior design leads will appear here when customers submit forms.</p>
        </div>
      )}

      {!loading && !error && leads.length > 0 && (
        <div className="space-y-4">
          {leads.map((lead, index) => {
            const configs = formatConfiguration(lead.meta)
            const isExpanded = expandedLead === lead._id
            
            return (
              <div key={lead._id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                {/* Lead Header */}
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleExpanded(lead._id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {lead.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{lead.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            <a href={`tel:${lead.phone}`} className="hover:text-blue-600">{lead.phone}</a>
                          </div>
                          {lead.city && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {lead.city}
                            </div>
                          )}
                          {lead.homeType && (
                            <div className="flex items-center gap-1">
                              <Home className="w-4 h-4" />
                              {lead.homeType}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{lead.sourcePage || 'Unknown'}</div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-gray-400">
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Contact Information */}
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Contact Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-medium">Name:</span> {lead.name}</div>
                          <div><span className="font-medium">Phone:</span> <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline">{lead.phone}</a></div>
                          <div><span className="font-medium">City:</span> {lead.city || 'Not specified'}</div>
                          <div><span className="font-medium">Home Type:</span> {lead.homeType || 'Not specified'}</div>
                          <div><span className="font-medium">Source:</span> {lead.sourcePage || 'Unknown'}</div>
                          <div><span className="font-medium">Message:</span> {lead.message || 'No message'}</div>
                          <div><span className="font-medium">Submitted:</span> {new Date(lead.createdAt).toLocaleString()}</div>
                        </div>
                      </div>

                      {/* Configuration Details */}
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Design Configuration
                        </h4>
                        {configs && configs.length > 0 ? (
                          <div className="space-y-4">
                            {configs.map((config, idx) => (
                              <div key={idx} className="border border-gray-200 rounded-lg p-3">
                                <div className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                                  <span>{config.icon}</span>
                                  {config.title}
                                </div>
                                <div className="space-y-1 text-sm text-gray-600">
                                  {Object.entries(config.data).map(([key, value]) => (
                                    <div key={key}>
                                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> {value || 'Not specified'}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-gray-500 text-sm">No configuration data available</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}


