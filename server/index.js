const { getBadMetrics } = require('./analyze')

/* Connect to Cutive-se Raspberry Pi Websocket server */
const WebSocket = require('ws')
const ws = new WebSocket('ws://10.0.202.253:1880/ws/simple')

ws.onopen = () => {
  console.log('Connection openned :D')
}

ws.onclose = () => {
  console.error('Connection closed :c')
}

ws.onmessage = ({ data }) => {
  data = JSON.parse(data)
  const badMetrics = getBadMetrics(data)

  console.log(badMetrics)
}
