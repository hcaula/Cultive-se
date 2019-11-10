const WebSocketServer = require('ws').Server

const wss = new WebSocketServer({ port: 8081, path: '/public/metrics' })
let sender = null

wss.on('connection', ws => {
  sender = ws
  console.log('Connected to a WebSocket client, hello! :D')
})

const sendWebSocketData = data => {
  if (!sender) {
    // console.log('Received message from Rasp, but no client is connected :c')
    return
  }

  sender.send(data)
}

module.exports = {
  sendWebSocketData
}
