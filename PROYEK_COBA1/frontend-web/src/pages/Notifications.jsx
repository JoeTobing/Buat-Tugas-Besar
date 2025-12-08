import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { notificationService } from '../services/notificationService'
import { Bell } from 'lucide-react'
import { formatDateTime } from '../utils/format'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = async () => {
    setLoading(true)
    try {
      const { data } = await notificationService.getAll()
      if (data.success) {
        setNotifications(data.data.items || [])
      }
    } catch (error) {
      console.error('Error loading notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id)
      loadNotifications()
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead()
      loadNotifications()
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  const getNotificationLink = (notification) => {
    if (notification.related_id && notification.type === 'ORDER_UPDATE') {
      return `/orders/${notification.related_id}`
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notifikasi</h1>
        {notifications.some(n => !n.is_read) && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Tandai Semua Dibaca
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Bell className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Tidak ada notifikasi</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notification) => {
            const link = getNotificationLink(notification)
            const content = (
              <div
                className={`bg-white rounded-lg shadow p-4 ${
                  !notification.is_read ? 'border-l-4 border-primary-600' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{notification.title}</h3>
                    <p className="text-gray-600 mb-2">{notification.body}</p>
                    <p className="text-xs text-gray-500">
                      {formatDateTime(notification.created_at)}
                    </p>
                  </div>
                  {!notification.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="ml-4 text-sm text-primary-600 hover:text-primary-700"
                    >
                      Tandai Dibaca
                    </button>
                  )}
                </div>
              </div>
            )

            return link ? (
              <Link key={notification.id} to={link}>
                {content}
              </Link>
            ) : (
              <div key={notification.id}>{content}</div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Notifications
