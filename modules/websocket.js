const WebSocketServer = require('ws').Server

let sender = null

const sendWebSocketData = data => {
  if (!sender) {
    // console.log('Received message from Rasp, but no client is connected :c')
    return
  }

  sender.send(data)
}

const initWebSocket = server => {
  const wss = new WebSocketServer({
    path: '/public/metrics',
    server
  })

  wss.on('connection', ws => {
    sender = ws
    console.log('Connected to a WebSocket client, hello! :D')
  })
}

module.exports = {
  sendWebSocketData,
  initWebSocket
}
