import { useState, useEffect, useRef } from 'react'
import { chatService } from '../services/chatService'
import { useAuth } from '../contexts/AuthContext'
import { Send } from 'lucide-react'
import { formatDateTime } from '../utils/format'

const ChatSection = ({ orderId }) => {
  const { user } = useAuth()
  const [chats, setChats] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    loadChats()
    const interval = setInterval(loadChats, 3000) // Poll every 3 seconds
    return () => clearInterval(interval)
  }, [orderId])

  useEffect(() => {
    scrollToBottom()
  }, [chats])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadChats = async () => {
    try {
      const { data } = await chatService.getChats(orderId)
      if (data.success) {
        setChats(data.data.items || [])
      }
    } catch (error) {
      console.error('Error loading chats:', error)
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setLoading(true)
    try {
      await chatService.sendMessage(orderId, { message })
      setMessage('')
      loadChats()
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal mengirim pesan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Chat</h2>
      <div className="border rounded-lg p-4 h-96 overflow-y-auto mb-4">
        {chats.length === 0 ? (
          <p className="text-gray-500 text-center">Belum ada pesan</p>
        ) : (
          <div className="space-y-4">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`flex ${chat.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    chat.sender_id === user?.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <p>{chat.message}</p>
                  <p className={`text-xs mt-1 ${
                    chat.sender_id === user?.id ? 'text-primary-100' : 'text-gray-500'
                  }`}>
                    {formatDateTime(chat.created_at)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <form onSubmit={handleSend} className="flex space-x-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Tulis pesan..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  )
}

export default ChatSection
