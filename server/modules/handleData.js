const { sendWebSocketData } = require('./websocket')
const analyze = require('./analyze')
const attributes = require('./attributes')

const currentData = attributes.reduce((acc, attr) => {
  acc[attr] = null
  return acc
}, {})

const nullifyCurrentData = () => {
  Object.keys(currentData).forEach(key => (currentData[key] = null))
}

const isReadyToSend = () => {
  let readyToSend = true
  Object.keys(currentData).forEach(key => {
    if (!currentData[key]) readyToSend = false
  })

  return readyToSend
}

const handleData = (topic, message) => {
  console.log(`Received message from topic ${topic} :D`)

  const toString = message.toString()
  const data = JSON.parse(toString)

  analyze(data)

  Object.keys(data).forEach(key => (currentData[key] = data[key]))

  if (isReadyToSend()) {
    const sendableData = JSON.stringify(currentData)
    sendWebSocketData(sendableData.toString())
    nullifyCurrentData()
  }
}

module.exports = handleData
