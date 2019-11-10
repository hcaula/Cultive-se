const attributes = {
  humidity_soil: 'Soil humidity',
  humidity_air: 'Air humidity',
  temperature: 'Temperature'
}

const getLowMessage = metric => {
  const key = Object.keys(metric)[0]
  return `${attributes[key]} is too low!`
}

const getHighMessage = metric => {
  const key = Object.keys(metric)[0]
  return `${attributes[key]} is too high!`
}

module.exports = {
  getLowMessage,
  getHighMessage
}
