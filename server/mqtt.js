const mqtt = require('mqtt')
const { getBadMetrics } = require('./analyze')
const { sendWebSocketData } = require('./websocket')

const IS_LOCAL = true
const PROTOCOL = 'mqtt://'
const HIVE = 'broker.hivemq.com'
const LOCAL_TOPICS = ['hackadeira/local']
const RASP_TOPICS = ['hackadeira/estufa']

const uri = `${PROTOCOL}${HIVE}`

const init = () => {
  const client = mqtt.connect(uri)

  client.on('connect', () => {
    console.log(`Connected to ${HIVE} :D`)

    const topics = IS_LOCAL ? LOCAL_TOPICS : RASP_TOPICS
    client.subscribe(topics, err => {
      if (err) throw err
      else {
        topics.forEach(topic =>
          console.log(`Successfully subscribed to ${topic} :D`)
        )
      }
    })
  })

  client.on('message', (topic, message) => {
    console.log(`Received message from topic ${topic} :D`)

    sendWebSocketData(message.toString())
    const data = JSON.parse(message)
  })
}

module.exports = init
