const initMqtt = require('./modules/mqtt')
const http = require('http')

// Init server for heroku
const server = http.createServer().listen(process.env.PORT || 8000)

initMqtt(server)
