const mqtt = require('mqtt')
const handleData = require('./handleData')

const IS_LOCAL = false
const PROTOCOL = 'mqtt://'
const HIVE = 'broker.hivemq.com'
const LOCAL_TOPICS = [
  'hackadeira/local_luminosity',
  'hackadeira/local_humidity_soil',
  'hackadeira/local_dht'
]
const RASP_TOPICS = [
  'hackadeira/luminosity',
  'hackadeira/humidity_soil',
  'hackadeira/dht'
]

const uri = `${PROTOCOL}${HIVE}`

const init = server => {
  const client = mqtt.connect(uri)

  client.on('connect', () => {
    // console.log(`Connected ${IS_LOCAL ? 'locally' : ''} to ${HIVE} :D`)

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

  client.on('message', handleData)
}

module.exports = init
