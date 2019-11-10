const https = require('https')
const { stringify } = require('querystring')

const LIMIT_BETWEEN_NOTIFICATIONS = 60000
const HOSTNAME = 'api.pushover.net'
const RESOURCE = '/1/messages.json'

const params = {
  token: 'as54gyap1wpj6f1p5tsp5h1xpazxay',
  user: 'ut2o97cbhfokgi6st4ah8obfwqhw3e',
  title: 'Your plant needs attention'
}

const options = {
  hostname: HOSTNAME,
  method: 'POST'
}

let lastNotification = null

const notificationIsEnabled = () => {
  if (!process.env.NOTIFICATION_ENABLED) return false
  if (process.env.NOTIFICATION_ENABLED === 'false') return false
  return true
}

//

const sendNotification = message => {
  if (!notificationIsEnabled()) return

  const today = new Date()
  const diffMs = lastNotification
    ? today - lastNotification
    : LIMIT_BETWEEN_NOTIFICATIONS + 1

  if (diffMs < LIMIT_BETWEEN_NOTIFICATIONS) {
    console.log(`Wait ${LIMIT_BETWEEN_NOTIFICATIONS} ms between notifications!`)
    return
  }

  lastNotification = new Date()

  params.message = message

  const queryString = stringify(params)
  const fullPath = `${RESOURCE}?${queryString}`

  options.path = fullPath

  const req = https.request(options, res => {
    if (res.statusCode !== 200) {
      console.log('It was not possible to send notification :c')
      return
    }

    res.on('data', d => {
      process.stdout.write(d)
    })

    console.log('Notification sent!')
  })

  req.on('error', error => {
    throw error
  })

  req.end()
}

module.exports = sendNotification
