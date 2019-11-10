const https = require('https')

const HOSTNAME = 'api.pushover.net'
const RESOURCE = '/1/messages.json'
const TOKEN = 'as54gyap1wpj6f1p5tsp5h1xpazxay'
const USER = 'ut2o97cbhfokgi6st4ah8obfwqhw3e'

const query_string = `?token=${TOKEN}&user=${USER}&`
const path = `${RESOURCE}${query_string}`
const options = {
  hostname: HOSTNAME,
  method: 'POST'
}

const sendNotification = message => {
  const messageQueryString = `message=${message}`
  const full_path = `${path}${messageQueryString}`
  options.path = full_path

  const req = https.request(options, res => {
    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.write(message)
  req.end()
}

module.exports = {
  sendNotification
}
