const THRESHOLDS = require('./thresholds')

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

module.exports = {
  getBadMetrics
}
