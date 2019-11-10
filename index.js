const initMqtt = require('./modules/mqtt')
const http = require('http')

initMqtt()

// Init server for heroku
http.createServer().listen(process.env.PORT || 8000)
