const { sendNotification } = require('./pushover')

/* Connect to Cutive-se Raspberry Pi Websocket server */
const WebSocket = require('ws')
const ws = new WebSocket('ws://localhost:1880/ws/simple')

ws.onopen = () => {
  console.log('Connection openned :D')
}

ws.onclose = () => {
  console.error('Connection closed :c')
}

ws.onmessage = ({ data }) => {
  console.log(data)
}
