import { store } from '../redux/store'
import { fetchSettings } from '../redux/settingsSlice'

const socket = new WebSocket(process.env.NEXT_PUBLIC_WS_URL)

socket.onopen = () => {
  console.log('WebSocket Connected')
}

socket.onmessage = (event) => {
  const data = JSON.parse(event.data)
  
  switch(data.type) {
    case 'SETTINGS_UPDATED':
      store.dispatch(fetchSettings())
      break
    // Add more cases for other real-time updates
  }
}

socket.onclose = () => {
  console.log('WebSocket Disconnected')
  // Implement reconnection logic
  setTimeout(() => {
    window.location.reload()
  }, 1000)
}

socket.onerror = (error) => {
  console.log('WebSocket Error:', error)
}

export default socket