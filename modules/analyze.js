const THRESHOLDS = require('./thresholds')
const { getHighMessage, getLowMessage } = require('./messages')
const sendNotification = require('./pushover')

const getBadMetrics = data => {
  const lowMetrics = []
  const highMetrics = []

  Object.keys(data).forEach(key => {
    const metric = data[key]
    const obj = {}
    obj[key] = metric

    if (THRESHOLDS[key].min > metric) {
      lowMetrics.push(obj)
    } else if (THRESHOLDS[key].max < metric) {
      highMetrics.push(obj)
    }
  })

  return {
    lowMetrics,
    highMetrics
  }
}

const analyze = data => {
  const { lowMetrics, highMetrics } = getBadMetrics(data)
  let message = null

  const lowIndex = Math.floor(Math.random() * lowMetrics.length)
  const highIndex = Math.floor(Math.random() * highMetrics.length)

  if (lowMetrics.length > 0) {
    message = getLowMessage(lowMetrics[lowIndex])
  } else if (highMetrics.length > 0) {
    message = getHighMessage(highMetrics[highIndex])
  }

  if (message) sendNotification(message)
}

module.exports = analyze
